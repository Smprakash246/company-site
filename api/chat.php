<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$root = dirname(__DIR__);
$site = json_decode((string) @file_get_contents($root . '/data/site.json'), true) ?: [];
$phone = $site['phone'] ?? '';

function reply_json(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$fallback = "The assistant is offline right now. Message us on WhatsApp at {$phone} to discuss your business.";

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply_json(405, ['error' => 'This address only accepts chat messages.']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
    $selfHost = strtolower(explode(':', (string) ($_SERVER['HTTP_HOST'] ?? ''))[0]);
    if ($originHost !== $selfHost) {
        reply_json(403, ['error' => 'Chat is only available on our website.']);
    }
}

// Per-IP rate limit: 20 messages per 10 minutes.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile = sys_get_temp_dir() . '/site_chat_' . md5($ip);
$now = time();
$fh = @fopen($rlFile, 'c+');
if ($fh) {
    flock($fh, LOCK_EX);
    $hits = json_decode((string) stream_get_contents($fh), true) ?: [];
    $hits = array_values(array_filter($hits, fn($t) => is_int($t) && $t > $now - 600));
    if (count($hits) >= 20) {
        flock($fh, LOCK_UN);
        fclose($fh);
        reply_json(429, ['error' => "That's a lot of messages! Please continue on WhatsApp at {$phone}."]);
    }
    $hits[] = $now;
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($hits));
    flock($fh, LOCK_UN);
    fclose($fh);
}

$configFile = __DIR__ . '/config.php';
$config = is_file($configFile) ? require $configFile : [];
$key = trim((string) ($config['GEMINI_API_KEY'] ?? ''));
$model = preg_replace('/[^a-zA-Z0-9.\-]/', '', (string) ($config['GEMINI_MODEL'] ?? ''));
if ($key === '' || $model === '') {
    reply_json(503, ['error' => $fallback]);
}

$input = json_decode((string) file_get_contents('php://input'), true);
$messages = is_array($input['messages'] ?? null) ? array_slice($input['messages'], -12) : [];
$contents = [];
foreach ($messages as $m) {
    $text = trim(mb_substr((string) ($m['text'] ?? ''), 0, 500));
    if ($text === '') {
        continue;
    }
    $role = (($m['role'] ?? '') === 'user') ? 'user' : 'model';
    $contents[] = ['role' => $role, 'parts' => [['text' => $text]]];
}
while ($contents && $contents[0]['role'] !== 'user') {
    array_shift($contents);
}
if (!$contents || end($contents)['role'] !== 'user') {
    reply_json(400, ['error' => 'Please type a message.']);
}

// The sole system prompt and company context are built on the server only.
$companies = [];
foreach ($site['companies'] ?? [] as $company) {
    $url = $site[$company['url']] ?? $company['url'];
    $companies[] = ($company['name'] ?? '') . ': ' . ($company['description'] ?? '') . ' Website: ' . $url;
}
$system = strtr((string) @file_get_contents(__DIR__ . '/prompts/company.txt'), [
    '{{COMPANY}}' => $site['company'] ?? '',
    '{{COMPANIES}}' => implode("\n", $companies),
    '{{GAME}}' => $site['game'] ?? '',
    '{{WHATSAPP}}' => 'https://wa.me/' . preg_replace('/\D/', '', (string) ($site['whatsapp'] ?? '')),
    '{{ADDRESS}}' => $site['address'] ?? '',
    '{{PHONE}}' => $phone,
    '{{HOURS}}' => $site['hours'] ?? '',
]);

$payload = [
    'system_instruction' => ['parts' => [['text' => $system]]],
    'contents' => $contents,
    'generationConfig' => ['temperature' => 0.6, 'maxOutputTokens' => 1024],
];

$ch = curl_init('https://generativelanguage.googleapis.com/v1beta/models/' . $model . ':generateContent');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 25,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'x-goog-api-key: ' . $key],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
]);
$raw = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$data = is_string($raw) ? json_decode($raw, true) : null;
$text = '';
foreach ($data['candidates'][0]['content']['parts'] ?? [] as $part) {
    if (empty($part['thought'])) {
        $text .= $part['text'] ?? '';
    }
}
$text = trim($text);
if ($status !== 200 || $text === '') {
    error_log('Site chat: Gemini status ' . $status);
    reply_json(502, ['error' => $fallback]);
}

reply_json(200, ['reply' => $text]);
