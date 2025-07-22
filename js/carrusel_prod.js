const carousel = document.getElementById('carousel1');
  const slides = carousel.children;
  let index = 0;

  function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    carousel.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  // Cambio automático
  setInterval(nextSlide, 5000);