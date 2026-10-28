/* Illustrative sample metrics: count up once, with static accessible values. */
(function () {
  var dashboard = document.querySelector('.growth-dashboard');
  if (!dashboard) return;
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches) return;

  var metrics = Array.from(dashboard.querySelectorAll('[data-count-to]')).map(function (el) {
    var decimals = Number(el.dataset.countDecimals || 0);
    return {
      el: el,
      target: Number(el.dataset.countTo),
      format: new Intl.NumberFormat('en', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    };
  });
  var frame, start = performance.now();
  function render(progress) {
    metrics.forEach(function (metric) {
      metric.el.textContent = metric.format.format(metric.target * progress);
    });
  }
  function finish() {
    cancelAnimationFrame(frame);
    render(1);
    dashboard.classList.remove('dashboard-animating');
    motion.removeEventListener('change', onMotionChange);
  }
  function onMotionChange(event) { if (event.matches) finish(); }
  function tick(now) {
    var progress = Math.min((now - start) / 1200, 1);
    if (progress === 1) { finish(); return; }
    render(1 - Math.pow(1 - progress, 3));
    frame = requestAnimationFrame(tick);
  }

  render(0);
  dashboard.classList.add('dashboard-animating');
  motion.addEventListener('change', onMotionChange);
  frame = requestAnimationFrame(tick);
})();
