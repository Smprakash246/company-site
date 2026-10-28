/* Two-mode assistant: company questions, and a live clinic AI demo. */
(function (N) {
  var MODES = {
    company: {
      title: 'Ask us anything',
      hello: 'Hi! Ask me about websites, Google Ads, our clinic AI, or how we work.',
      chips: ['What do you do for clinics?', 'How long does a website take?', 'Where is your office?']
    },
    clinic_demo: {
      title: '{clinic}',
      hello: 'Vanakkam! This is {clinic}. How can I help you today? 🦷',
      chips: ['I have pain after my extraction', 'Book a cleaning appointment', 'What are your timings?', 'How much for braces?']
    }
  };
  var spark = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>';
  var state = { mode: 'company', history: { company: [], clinic_demo: [] }, logs: {}, busy: false };

  function build(s) {
    var fab = document.createElement('button');
    fab.className = 'chat-fab'; fab.innerHTML = spark + '<span>Ask us</span>';
    fab.setAttribute('aria-label', 'Open the assistant');
    var panel = document.createElement('div');
    panel.className = 'chat-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Assistant');
    panel.innerHTML =
      '<div class="chat-head"><span class="live">Assistant online</span><button class="close" aria-label="Close">×</button></div>' +
      '<div class="modes" role="group" aria-label="Assistant mode"><button type="button" data-mode="company">' + N.esc(s.company) + '</button><button type="button" data-mode="clinic_demo">Clinic AI demo</button></div>' +
      '<div class="demo-note">Demo mode: this is how your patients would chat with your clinic on WhatsApp.</div>' +
      '<div class="chat-log" aria-live="polite"></div><div class="chips"></div>' +
      '<form class="chat-form"><label class="visually-hidden" for="chat-in">Message</label><input id="chat-in" maxlength="500" autocomplete="off" placeholder="Type a message…"><button>Send</button></form>';
    document.body.append(fab, panel);

    var log = panel.querySelector('.chat-log'), chips = panel.querySelector('.chips'), input = panel.querySelector('input');

    function fill(t) { return t.replace('{clinic}', s.demo_clinic); }
    function setMode(m) {
      state.mode = m;
      panel.dataset.mode = m;
      panel.querySelectorAll('.modes button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.mode === m); });
      log.innerHTML = '';
      if (!state.logs[m]) state.logs[m] = [['bot', fill(MODES[m].hello)]];
      state.logs[m].forEach(function (x) { render(x[0], x[1]); });
      chips.innerHTML = MODES[m].chips.map(function (c) { return '<button type="button" class="chip">' + N.esc(c) + '</button>'; }).join('');
    }
    function open(mode) {
      panel.classList.add('open'); fab.setAttribute('aria-expanded', 'true');
      setMode(mode || state.mode);
      setTimeout(function () { input.focus(); }, 50);
    }
    function close() { panel.classList.remove('open'); fab.setAttribute('aria-expanded', 'false'); }

    function render(who, text) {
      var m = document.createElement('div');
      m.className = 'msg ' + who; m.textContent = text;
      if (who === 'bot' && state.mode === 'company' && /whatsapp|call|contact|audit/i.test(text)) {
        var a = document.createElement('div'); a.className = 'acts';
        a.innerHTML = '<a class="btn wa small" href="' + N.wa('Hi ' + s.company + ', I\'d like to talk about my business.') + '">Continue on WhatsApp</a>';
        m.appendChild(a);
      }
      log.appendChild(m); log.scrollTop = log.scrollHeight;
      return m;
    }
    function add(who, text) { state.logs[state.mode].push([who, text]); return render(who, text); }

    function send(text) {
      text = (text || '').trim().slice(0, 500);
      if (!text || state.busy) return;
      var mode = state.mode, hist = state.history[mode];
      input.value = '';
      add('user', text); hist.push({ role: 'user', text: text });
      state.busy = true;
      var t = render('bot', ''); t.classList.add('typing'); t.innerHTML = '<i></i><i></i><i></i>';
      fetch(N.root + 'api/chat.php', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: mode, messages: hist.slice(-12) })
      }).then(function (r) { return r.json(); }).then(function (d) {
        t.remove();
        var reply = d.reply || d.error || offline();
        if (state.mode === mode) add('bot', reply); else state.logs[mode].push(['bot', reply]);
        if (d.reply) hist.push({ role: 'model', text: d.reply });
      }).catch(function () { t.remove(); add('bot', offline()); })
        .then(function () { state.busy = false; });
    }
    function offline() { return 'The assistant is offline right now. Message us on WhatsApp at ' + s.phone + ' and we\'ll reply quickly.'; }

    fab.addEventListener('click', function () { panel.classList.contains('open') ? close() : open(); });
    panel.querySelector('.close').addEventListener('click', close);
    panel.querySelector('.modes').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) setMode(b.dataset.mode); });
    chips.addEventListener('click', function (e) { var c = e.target.closest('.chip'); if (c) send(c.textContent); });
    panel.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); send(input.value); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-demo]')) { e.preventDefault(); open('clinic_demo'); }
    });
    if (location.hash === '#demo') open('clinic_demo');
  }

  N.load().then(build);
})(window.N);
