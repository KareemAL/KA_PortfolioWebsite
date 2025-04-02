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


});