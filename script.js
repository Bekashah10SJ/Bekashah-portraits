
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const target = document.querySelector(
        link.getAttribute("href")
      );

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Automatic copyright year
  const footer = document.querySelector("footer p");

  if (footer) {
    footer.textContent =
      "© " + new Date().getFullYear() +
      " Bekashah Portraits. Created with passion.";
  }

  // Reveal gallery cards as you scroll
  const cards = document.querySelectorAll(".art-card");

  cards.forEach(function (card, index) {
    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    card.style.transition =
      "opacity 0.6s ease, transform 0.6s ease";
    card.style.transitionDelay = (index * 120) + "ms";
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(function (card) {
      observer.observe(card);
    });
  } else {
    cards.forEach(function (card) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
  }
});
