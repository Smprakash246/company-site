/* Animated WhatsApp conversation in the hero phone. */
(function (N) {
  var SCRIPT = [
    ['bot', 'Hi Priya, this is {clinic} 🦷 How are you feeling after yesterday\'s root canal?', '9:02'],
    ['pt', 'Little pain while chewing', '9:15'],
    ['bot', 'That\'s normal for 2–3 days. Avoid chewing on that side and take your prescribed medicine. If swelling increases, reply URGENT and the doctor will call you.', '9:15'],
    ['bot', 'Your follow-up is on Saturday 10:30 AM. Reply 1 to confirm.', '9:15'],
    ['pt', '1', '9:16'],
    ['bot', 'Confirmed ✅ See you Saturday!', '9:16']
  ];
  var thread = document.querySelector('.phone .thread');
  if (!thread) return;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function bubble(who, text, time) {
    var b = document.createElement('div');
    b.className = 'bubble ' + who;
    b.textContent = text;
    var t = document.createElement('time'); t.textContent = time; b.appendChild(t);
    thread.appendChild(b);
    return b;
  }

  N.load().then(function (s) {
    var lines = SCRIPT.map(function (l) { return [l[0], l[1].replace('{clinic}', s.demo_clinic), l[2]]; });
    document.querySelectorAll('[data-clinic]').forEach(function (el) { el.textContent = s.demo_clinic; });
    if (still) { lines.forEach(function (l) { bubble(l[0], l[1], l[2]).classList.add('in'); }); return; }
    var i = 0;
    function next() {
      if (i === lines.length) { setTimeout(function () { thread.innerHTML = ''; i = 0; next(); }, 4200); return; }
      var l = lines[i++];
      var delay = l[0] === 'bot' ? 1100 : 900;
      var typing;
      if (l[0] === 'bot') {
        typing = document.createElement('div');
        typing.className = 'bubble bot typing in';
        typing.innerHTML = '<i></i><i></i><i></i>';
        thread.appendChild(typing);
      }
      setTimeout(function () {
        if (typing) typing.remove();
        var b = bubble(l[0], l[1], l[2]);
        requestAnimationFrame(function () { b.classList.add('in'); });
        setTimeout(next, l[0] === 'bot' ? 1600 : 900);
      }, delay);
    }
    setTimeout(next, 500);
  });
})(window.N);
