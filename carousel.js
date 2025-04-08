document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel'); // Define the carousel element
    const slides = document.querySelectorAll('.carouselcontent'); // All slide elements
    const leftArrow = document.querySelector('.carouselleft-arrow'); // Left arrow
    const rightArrow = document.querySelector('.carouselright-arrow'); // Right arrow
    const indicatorsContainer = document.querySelector('.carousel-indicators'); // Dots container
    const indicatorsWrapperContainer = document.querySelector('.carousel-indicators'); // Dots wrapper container

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

    // Expose a function to get the current slide index
    const getCurrentSlideIndex = () => currentIndex;

    // Helper Function to Transition Between Slides
    const goToSlide = (newIndex) => {
        if (newIndex === currentIndex) return; // Do nothing if already on the desired slide

        const currentSlide = slides[currentIndex];
        const nextSlide = slides[newIndex];

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

        setTimeout(() => {
            updatePreviewImages();
        }, 600)
        // Update the carousel preview images

        // Log current slide (or do something else)
        console.log("Current slide index is:", getCurrentSlideIndex());
    };

    const updatePreviewImages = () => {
        const currentIndex = getCurrentSlideIndex(); // Get the current slide index
        const totalSlides = slides.length; // Total number of images in the carousel
        const leftImg = document.querySelector("#carousel_previewimagesource_left"); // Left preview image
        const rightImg = document.querySelector("#carousel_previewimagesource_right"); // Right preview image

        // Calculate the previous and next indices
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        const nextIndex = (currentIndex + 1) % totalSlides;

        // Update the `src` attributes of the preview images
        leftImg.src = `/images/hero_carousel/carousel${prevIndex}.png`;
        console.log("Left Preview Image Index: " + prevIndex);
        rightImg.src = `/images/hero_carousel/carousel${nextIndex}.png`;;
        console.log("Right Preview Image Index: " + nextIndex);
    };

    // Go to the next or previous slide
    const nextSlide = () => {
        goToSlide((currentIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        goToSlide((currentIndex - 1 + slides.length) % slides.length);
    };

    const disableArrow = (arrow) => {
        arrow.disabled = true;
        setTimeout(() => {
            arrow.disabled = false;
        }, 1000); // 1000ms = 1 second
    }

    // Attach click event listeners to arrows
    rightArrow.addEventListener('click', nextSlide);
    rightArrow.addEventListener('click', disableArrow(rightArrow));
    leftArrow.addEventListener('click', prevSlide);
    leftArrow.addEventListener('click', disableArrow(leftArrow));

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

    // Create the container with dark background
    const dotsWrapper = document.createElement('div');
    dotsWrapper.classList.add('dots-wrapper');
    indicatorsWrapperContainer.appendChild(dotsWrapper); // Append it to wherever your carousel controls are

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

    updatePreviewImages();
});