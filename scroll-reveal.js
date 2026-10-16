if (
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  var revealItems = document.querySelectorAll(
    'main > section:not(.hero):not(.hero1):not(.hero2), .day, .song, .values > div, .beliefs li'
  );

  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  revealItems.forEach(function (item) {
    item.classList.add('scroll-reveal');
    revealObserver.observe(item);
  });
}
