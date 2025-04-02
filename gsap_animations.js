document.addEventListener("DOMContentLoaded", () => {

    // Animate hero h1 text
    gsap.to(".starup_slideout", {
        y: -750, // Move upwards completely out of view
        opacity: 0, // Fade away simultaneously
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => {
            document.querySelector(".starup_slideout").remove(); // Remove the div after animation
        }
    });

    // Animate hero h1 text
    gsap.from(".hero", {
        opacity: 0,
        y: -120,
        duration: 2,
        ease: "power2.inOut",
        delay: 2
    });

    // Animate hero h1 text
    gsap.from(".hero h1", {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power2.inOut",
        delay: 3
    });

    // Animate the paragraph text after a 0.2-second delay
    gsap.from(".hero p", {
        opacity: 0,
        y: 70,
        duration: 0.7,
        ease: "power1.out",
        delay: 3.2 // Delay in seconds
    });

    // Animate the span text
    gsap.from(".hero_jobs span", {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        delay: 3.2 // Delay in seconds
    });

    // startup anims for carousel indicators and arrows
    gsap.from(".carousel-indicators", {
        opacity: 0,
        y: 70,
        duration: 1,
        ease: "power1.inOut",
        delay: 4.2 // Delay in seconds
    });
    gsap.fromTo(
        ".carouselleft-arrow",
        { opacity: 0, x: -70 }, // Start: completely transparent and 70px left
        { opacity: 1, x: 0, duration: 1, ease: "power1.inOut", delay: 4 } // End: fully visible and at final position
    );
    gsap.fromTo(
        ".carouselright-arrow",
        { opacity: 0, x: 70 }, // Start: completely transparent and 70px left
        { opacity: 1, x: 0, duration: 1, ease: "power1.inOut", delay: 4 } // End: fully visible and at final position
    );



    // ------ GSAP ANIMATIONS FOR CAROUSEL-ARROW-PREVIEW IMAGES ----------
    const leftImg = document.querySelector("#carousel_previewimg_left");    // Left preview image
    const rightImg = document.querySelector("#carousel_previewimg_right");  // Right preview image

    const leftMask = document.querySelector("#carousel_previewimg_left_mask");      // Left preview image Mask
    const rightMask = document.querySelector("#carousel_previewimg_right_mask");    // Right preview image Mask

// Get arrow elements
    const leftArrow = document.querySelector(".carouselleft-arrow");
    const rightArrow = document.querySelector(".carouselright-arrow");

// Track hover states
    let isHoveringLeft = false;
    let isHoveringRight = false;

// Startup animation: Slide both images into position
    gsap.timeline({ delay: 4.5})
        .fromTo(
            leftImg, // The target element
            { x: `-120%`, opacity: 0 },                                                 // Start fully off-screen --- Left Image
            { x: `-70%`, opacity: 0.3, duration: 1, ease: "power2.inOut"} // Slide into position
        )
        .fromTo(
            leftMask,
            {x: `-100%`, opacity: 0 },                                                  // Start fully off-screen --- Left Mask
            { x: 0, opacity: 0.3, duration: 1, ease: "power2.inOut"}, // Slide into position
            '<' // Parallel animation
        )
        .fromTo(
            rightImg,
            { x: `120%`, opacity: 0 }, // Start fully off-screen
            { x: `70%`, opacity: 0.3, duration: 1, ease: "power2.inOut"},
            '<' // Parallel animation
        )
        .fromTo(
            rightMask,
            { x: `100%`, opacity: 0 }, // Start fully off-screen
            { x: 0, opacity: 0.3, duration: 1, ease: "power2.inOut"},
            '<' // Parallel animation
        );

// Reusable GSAP hover functions
    const hoverAnimationIn = (element, mask, direction) => {
        gsap.killTweensOf(element, mask);
        gsap.to(element, {
            x: direction === "left" ? '-65%' : '65%', // Slightly move IMAGE on hover
            opacity: 1,
            duration: 0.3,
            ease: "power1.out"
        });
        gsap.to(mask, {
            x: direction === "left" ? '25%' : '-25%', // Slightly move MASK on hover
            opacity: 1,
            duration: 0.3,
            ease: "power1.out"
        });
    };

    const hoverAnimationOut = (element, mask, direction) => {
        gsap.killTweensOf(element, mask);
        gsap.to(element, {
            x: direction === "left" ? '-70%' : '70%',   // Return to original position
            opacity: 0.3,
            duration: 0.3,
            ease: "power1.out"
        });
        gsap.to(mask, {
            x: direction === "left" ? 0 : 0,            // Return MASK to original position
            opacity: 1,
            duration: 0.3,
            ease: "power1.out"
        });
    };

// Slide aside on Arrow Click
    const clickAnimation = (element, nonElement, mask, direction, leftArrow, rightArrow, isHoveringCallback) => {

        // Disable the arrow buttons
        leftArrow.disabled = true;
        rightArrow.disabled = true;

        // Kill any active tweens on the element
        gsap.killTweensOf(element, mask);

        // CLICK ANIMATION OF CLICKED SIDE
        gsap.to(element, {                              // Slide to center
            x: direction === "left" ? '0%' : '0%',
            opacity: 1,
            duration: 0.5,
            ease: "power1.out"
        });
        gsap.to(mask, {
            x: direction === "left" ? '90%' : '-90%',
            opacity: 1,
            duration: 0.5,
            ease: "power1.out"
        });
        gsap.to(element, {                              //Fade out for smoother Transition
            opacity: 0,
            duration: 0.3,
            ease: "power1.out",
            delay: 0.3
        });
        gsap.to(mask, {
            opacity: 0,
            duration: 0.3,
            ease: "power1.out",
            delay: 0.3
        });
        gsap.to(element, {                              // Instantly snap back - fully out-of screen
            x: direction === "left" ? '-120%' : '120%',
            opacity: 0,
            duration: 0,
            ease: "power1.out",
            delay: 0.6
        });
        gsap.to(mask, {                              // Instantly snap back - fully out-of screen
            x: direction === "left" ? '-100%' : '100%',
            opacity: 0,
            duration: 0,
            ease: "power1.out",
            delay: 0.6
        });
        gsap.to(element, {                              // Slide back into default position
            x: direction === "left" ? '-70%' : '70%',
            opacity: 0.3,
            duration: 1,
            ease: "power1.out",
            delay: 0.6
        });
        gsap.to(mask, {                              // Slide back into default position
            x: direction === "left" ? 0 : 0,
            opacity: 0.3,
            duration: 1,
            ease: "power1.out",
            delay: 0.6
        });
// CLICK ANIMATION OF NON-CLICKED-SIDE
        gsap.to(nonElement, {                           //Fade Opposite lying Preview Image out, so that Image switch is not as visible
            opacity: 0,
            duration: 0.6,
            ease: "power1.inOut"
        });
        gsap.to(nonElement, {                            //Fade it back in once image has been switched (switch happens in carousel.js)
            opacity: 0.3,
            duration: 0.6,
            ease: "power1.inOut",
            delay: 0.6
        });

        // Re-enable the buttons after animation completes
        setTimeout(() => {
            leftArrow.disabled = false;
            rightArrow.disabled = false;

            // Check if the mouse is still hovering and trigger hoverAnimationIn
            if (isHoveringCallback()) {
                hoverAnimationIn(element, mask, direction);
            }
        }, 1000); // Match the total animation duration (1 second)
    };

// Assign hover events to arrows instead of the images
    leftArrow.addEventListener("mouseenter", () => {
        isHoveringLeft = true; // User started hovering
        hoverAnimationIn(leftImg, leftMask, "left");
    });
    leftArrow.addEventListener("mouseleave", () => {
        isHoveringLeft = false; // User stopped hovering
        hoverAnimationOut(leftImg, leftMask, "left");
    });

    rightArrow.addEventListener("mouseenter", () => {
        isHoveringRight = true; // User started hovering
        hoverAnimationIn(rightImg, rightMask, "right");
    });
    rightArrow.addEventListener("mouseleave", () => {
        isHoveringRight = false; // User stopped hovering
        hoverAnimationOut(rightImg, rightMask, "right");
    });

// Event listener for arrow buttons
    leftArrow.addEventListener("click", () => clickAnimation(leftImg, rightImg, leftMask, "left", leftArrow, rightArrow, () => isHoveringLeft));
    rightArrow.addEventListener("click", () => clickAnimation(rightImg, leftImg, rightMask, "right", leftArrow, rightArrow, () => isHoveringRight));

});