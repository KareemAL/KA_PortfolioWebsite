document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel'); // Define the carousel element
    const slides = document.querySelectorAll('.carouselcontent'); // All slide elements
    const leftArrow = document.querySelector('.carouselleft-arrow'); // Left arrow
    const rightArrow = document.querySelector('.carouselright-arrow'); // Right arrow
    const indicatorsContainer = document.querySelector('.carousel-indicators'); // Dots container

    let currentIndex = 0; // Track the index of the currently active slide
    let startX = 0; // Starting position for touch
    let endX = 0; // Ending position for touch

    // Helper function to update dots (indicators)
    const updateDots = (newIndex) => {
        const dots = indicatorsContainer.querySelectorAll('.dot'); // Select all dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === newIndex);
        });
    };

    // Helper Function to Transition Between Slides
    const goToSlide = (newIndex) => {
        if (newIndex === currentIndex) return; // Do nothing if already on the desired slide

        const currentSlide = slides[currentIndex];
        const nextSlide = slides[newIndex];

        // Determine direction
        let direction = newIndex > currentIndex ? 1 : -1;

        // Handle Wrapping (if user moves between last and first slide)
        if (currentIndex === slides.length - 1 && newIndex === 0) {
            direction = 1; // Move forward (from last to first)
        } else if (currentIndex === 0 && newIndex === slides.length - 1) {
            direction = -1; // Move backward (from first to last)
        }

        // Place next slide off-screen in the correct direction
        gsap.set(nextSlide, {
            x: direction * 100 + '%', // Move to 100% or -100% offscreen
            opacity: 1,
        });

        // Animate current slide out
        gsap.to(currentSlide, {
            x: -direction * 100 + '%', // Slide off screen
            opacity: 0,
            duration: 0.5,
        });

        // Animate next slide into place
        gsap.to(nextSlide, {
            x: '0%',
            opacity: 1,
            duration: 0.5,
        });

        // Update active class
        slides.forEach((slide, i) => {
            slide.classList.toggle("carouselactive", i === newIndex);
        });

        // Update dots
        updateDots(newIndex);

        // Update the current index
        currentIndex = newIndex;
    };

    // Go to the next or previous slide
    const nextSlide = () => {
        goToSlide((currentIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        goToSlide((currentIndex - 1 + slides.length) % slides.length);
    };

    // Attach click event listeners to arrows
    rightArrow.addEventListener('click', nextSlide);
    leftArrow.addEventListener('click', prevSlide);

    // Add swipe functionality for mobile
    const handleSwipe = () => {
        const deltaX = endX - startX;
        if (Math.abs(deltaX) > 50) { // Only register swipes over 50px
            if (deltaX < 0) nextSlide(); // Swipe left
            else prevSlide(); // Swipe right
        }
    };

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX; // Record starting X position
    });

    carousel.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX; // Update the current X position
    });

    carousel.addEventListener('touchend', (e) => {
        handleSwipe(); // Check swipe direction on touch end
    });

    // Dynamically create dots for indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active'); // Mark first dot as active
        dot.addEventListener('click', () => goToSlide(index)); // Go to respective slide on click
        indicatorsContainer.appendChild(dot);
    });

    // Initialize the first slide on page load
    gsap.set(slides[0], {
        x: '0%',
        opacity: 1,
    });

    slides.forEach((slide, i) => {
        if (i !== 0) {
            gsap.set(slide, { x: '100%', opacity: 0 }); // Hide all except the first slide
        }
    });
});