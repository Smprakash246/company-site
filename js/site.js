/* Header, footer and site.json bindings. Every name lives in data/site.json. */
window.N = window.N || {};
(function (N) {
  var root = document.body.dataset.root || '';
  N.root = root;
  N.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  N.load = (function () {
    var p;
    return function () {
      return p || (p = fetch(root + 'data/site.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (s) { N.site = s; return s; }));
    };
  })();
  N.wa = function (text) { return 'https://wa.me/' + String(N.site.whatsapp).replace(/\D/g, '') + '?text=' + encodeURIComponent(text); };

  var NAV = [['services.html', 'Services'], ['companies.html', 'Companies'], ['industries/healthcare.html', 'For clinics'], ['work.html', 'Work'], ['about.html', 'About'], ['contact.html', 'Contact']];

  function header(s) {
    var here = location.pathname.replace(/^.*?\/(industries\/)?([^/]*)$/, '$1$2') || 'index.html';
    return '<div class="wrap">' +
      '<a class="logo" href="' + root + 'index.html"><img src="' + root + 'assets/icons/favicon.svg" alt="" width="30" height="30">' + N.esc(s.company) + '</a>' +
      '<button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>' +
      '<nav class="nav" id="nav" aria-label="Main">' + NAV.map(function (n) {
        return '<a href="' + root + n[0] + '"' + (here === n[0] ? ' aria-current="page"' : '') + '>' + N.esc(n[1]) + '</a>';
      }).join('') + '<a class="btn signal small nav-audit" href="' + N.wa('Hi, I would like a free audit of my business.') + '">Get a free audit</a></nav>' +
      '<a class="btn signal small header-cta" href="' + N.wa('Hi, I would like a free audit of my business.') + '">Get a free audit</a></div>';
  }

  function footer(s) {
    return '<div class="wrap"><div class="cols">' +
      '<div><div class="big">' + N.esc(s.company) + '</div><p>IT and digital marketing for local businesses. Websites, ads and AI, built in Coimbatore.</p></div>' +
      '<div><ul><li><a href="' + root + 'services.html">Services</a></li><li><a href="' + root + 'companies.html">Companies</a></li><li><a href="' + root + 'industries/healthcare.html">For clinics</a></li><li><a href="' + root + 'work.html">Work</a></li><li><a href="' + root + 'about.html">About</a></li></ul></div>' +
      '<div><ul><li><a href="' + N.wa('Hi ' + s.company + '!') + '">WhatsApp ' + N.esc(s.phone) + '</a></li><li><a href="tel:' + N.esc(s.phone.replace(/\s/g, '')) + '">Call us</a></li><li><a href="mailto:' + N.esc(s.email) + '">' + N.esc(s.email) + '</a></li><li>' + N.esc(s.address) + '</li></ul></div>' +
      '</div><p class="fine"><span>© ' + new Date().getFullYear() + ' ' + N.esc(s.company) + '</span><span class="mono">Ganapathy, Coimbatore</span></p></div>';
  }

  N.load().then(function (s) {
    var h = document.getElementById('site-header'), f = document.getElementById('site-footer');
    if (h) h.innerHTML = header(s);
    if (f) f.innerHTML = footer(s);
    document.querySelectorAll('[data-site]').forEach(function (el) { el.textContent = s[el.dataset.site] || ''; });
    document.querySelectorAll('[data-wa]').forEach(function (el) { el.href = N.wa(el.dataset.wa || ('Hi ' + s.company + '!')); });
    document.querySelectorAll('[data-tel]').forEach(function (el) { el.href = 'tel:' + s.phone.replace(/\s/g, ''); });
    document.querySelectorAll('[data-href]').forEach(function (el) { el.href = s[el.dataset.href] || '#'; });
    if (document.title.indexOf('{company}') > -1) document.title = document.title.replace('{company}', s.company);
    document.querySelectorAll('[data-company]').forEach(function (el) {
      var company = s.companies.find(function (c) { return c.id === el.dataset.company; });
      if (company) el.textContent = company.name;
    });
    document.querySelectorAll('[data-company-link]').forEach(function (el) {
      var company = s.companies.find(function (c) { return c.id === el.dataset.companyLink; });
      if (company) el.href = s[company.url] || company.url;
    });
    document.querySelectorAll('[data-companies]').forEach(function (el) {
      el.innerHTML = s.companies.map(function (c, i) {
        return '<article class="company-card"><span class="mono">0' + (i + 1) + ' / COMPANY</span><h3>' + N.esc(c.name) + '</h3><p>' + N.esc(c.description) + '</p><a class="btn line small" href="' + N.esc(s[c.url] || c.url) + '" target="_blank" rel="noopener noreferrer">Visit site<span class="visually-hidden">: ' + N.esc(c.name) + ' (opens in a new tab)</span></a></article>';
      }).join('');
    });
    var btn = document.querySelector('.menu-btn');
    if (btn) btn.addEventListener('click', function () {
      var open = document.getElementById('nav').classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    document.dispatchEvent(new CustomEvent('site:ready'));
  });
})(window.N);
