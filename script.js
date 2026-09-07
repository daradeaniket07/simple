document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
  }

  const heroVisual = document.querySelector('.hero-visual');
  const showreelBadge = document.querySelector('.showreel-badge');
  const cta = document.querySelector('.badge-cta');

  if (heroVisual && showreelBadge && cta) {
    heroVisual.addEventListener('pointermove', (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      const img = heroVisual.querySelector('img');
      if (img) {
        img.style.transform = `scale(1.12) translate(${(x - 50) * 0.04}px, ${(y - 50) * 0.03}px)`;
      }
      showreelBadge.style.transform = `translate(${(x - 50) * 0.08}px, ${(y - 50) * 0.04}px)`;
      cta.style.transform = `translate(${(x - 50) * 0.12}px, ${(y - 50) * 0.10}px)`;
    });

    heroVisual.addEventListener('pointerleave', () => {
      const img = heroVisual.querySelector('img');
      if (img) img.style.transform = 'scale(1.08) translate(0, 0)';
      showreelBadge.style.transform = 'translate(0, 0)';
      cta.style.transform = 'translate(0, 0)';
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('video').forEach((video) => {
          video.play().catch(() => {});
        });
      } else {
        entry.target.querySelectorAll('video').forEach((video) => video.pause());
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));

  const filterButtons = document.querySelectorAll('.filter-chip');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
    });
  });

  const testimonialCards = document.querySelectorAll('.testimonial-card');
  let activeIndex = 0;
  if (testimonialCards.length > 1) {
    setInterval(() => {
      testimonialCards[activeIndex].classList.remove('is-active');
      activeIndex = (activeIndex + 1) % testimonialCards.length;
      testimonialCards[activeIndex].classList.add('is-active');
    }, 2600);
  }
});
