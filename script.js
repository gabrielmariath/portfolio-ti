document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll("[data-counter]");

  function animateCounter(counter) {
    const target = Number(counter.getAttribute("data-target"));
    const suffix = counter.getAttribute("data-suffix") || "";
    const duration = 1500;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const value = Math.floor(progress * target);

      counter.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observerInstance.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.4
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});
