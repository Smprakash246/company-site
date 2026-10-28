/* One company assistant, with its identity and contact details from site.json. */
(function (N) {
  var spark = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>';
  var history = [], busy = false;

  function build(s) {
    var title = s.company + ' assistant';
    var fab = document.createElement('button');
    fab.className = 'chat-fab'; fab.innerHTML = spark + '<span>Ask us</span>';
    fab.setAttribute('aria-label', 'Open ' + title);
    fab.setAttribute('aria-expanded', 'false');
    fab.setAttribute('aria-controls', 'assistant-panel');
    var panel = document.createElement('div');
    panel.id = 'assistant-panel'; panel.className = 'chat-panel';
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', title);
    panel.innerHTML =
      '<div class="chat-head"><span class="live">' + N.esc(title) + '</span><button class="close" aria-label="Close assistant">×</button></div>' +
      '<div class="chat-log" aria-live="polite"></div><div class="chips"></div>' +
      '<form class="chat-form"><label class="visually-hidden" for="chat-in">Message</label><input id="chat-in" maxlength="500" autocomplete="off" placeholder="Type a message…"><button>Send</button></form>';
    document.body.append(fab, panel);

    var log = panel.querySelector('.chat-log'), chips = panel.querySelector('.chips'), input = panel.querySelector('input');
    chips.innerHTML = ['What services do you offer?', 'Who are your clients?', 'Where is your office?'].map(function (c) {
      return '<button type="button" class="chip">' + N.esc(c) + '</button>';
    }).join('');

    function open() {
      panel.classList.add('open'); fab.setAttribute('aria-expanded', 'true');
      input.focus();
    }
    function close() {
      panel.classList.remove('open'); fab.setAttribute('aria-expanded', 'false'); fab.focus();
    }
    function render(who, text) {
      var m = document.createElement('div');
      m.className = 'msg ' + who; m.textContent = text;
      if (who === 'bot' && /whatsapp|call|contact|audit|quote/i.test(text)) {
        var a = document.createElement('div'); a.className = 'acts';
        a.innerHTML = '<a class="btn wa small" href="' + N.wa('Hi ' + s.company + ', I\'d like to talk about my business.') + '">Continue on WhatsApp</a>';
        m.appendChild(a);
      }
      log.appendChild(m); log.scrollTop = log.scrollHeight;
      return m;
    }
    function offline() { return 'The assistant is offline right now. Message us on WhatsApp at ' + s.phone + ' to discuss your business.'; }
    function send(text) {
      text = (text || '').trim().slice(0, 500);
      if (!text || busy) return;
      input.value = '';
      render('user', text); history.push({ role: 'user', text: text });
      busy = true;
      var sendButton = panel.querySelector('.chat-form button'); sendButton.disabled = true;
      var t = render('bot', ''); t.classList.add('typing');
      t.setAttribute('aria-label', 'Assistant is replying'); t.innerHTML = '<i></i><i></i><i></i>';
      fetch(N.root + 'api/chat.php', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-12) })
      }).then(function (r) { return r.json(); }).then(function (d) {
        t.remove();
        var reply = d.reply || d.error || offline();
        render('bot', reply);
        if (d.reply) history.push({ role: 'model', text: d.reply });
      }).catch(function () { t.remove(); render('bot', offline()); })
        .then(function () { busy = false; sendButton.disabled = false; });
    }

    render('bot', 'Hi! I’m the ' + title + '. Ask about our services, companies, how we work or our Coimbatore office. For a quote, continue on WhatsApp after a free audit.');
    fab.addEventListener('click', function () { panel.classList.contains('open') ? close() : open(); });
    panel.querySelector('.close').addEventListener('click', close);
    chips.addEventListener('click', function (e) { var c = e.target.closest('.chip'); if (c) send(c.textContent); });
    panel.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); send(input.value); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('open')) close(); });
  }

  N.load().then(build);
})(window.N);
