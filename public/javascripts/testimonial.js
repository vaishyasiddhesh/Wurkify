const slider = document.querySelector('.testimonial-slider');
const cards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let slideIndex = 0;
const totalSlides = cards.length;

function updateActiveCard() {
    cards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === slideIndex) {
            card.classList.add('active');
        }
    });
}

function showSlide(index) {
    slideIndex = (index + totalSlides) % totalSlides; // Looping index
    const cardWidth = cards[0].getBoundingClientRect().width;
    const containerWidth = document.querySelector('.testimonial-container').getBoundingClientRect().width;
    const slideOffset = ((containerWidth - cardWidth) / 2) - (slideIndex * cardWidth);
    
    slider.style.transform = `translateX(${slideOffset}px)`;
    updateActiveCard();
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

// Auto-slide interval
let autoSlideInterval = setInterval(nextSlide, 3000);

nextBtn.addEventListener('click', () => {
    nextSlide();
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 3000);
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 3000);
});

// Initial setup
showSlide(slideIndex);
