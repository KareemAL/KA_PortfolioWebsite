gsap.to(element, {                              // Slide to center
    x: direction === "left" ? '0%' : '0%',
    opacity: 1,
    duration: 0.5,
    ease: "power1.out"
});
gsap.to(mask, {
    x: direction === "left" ? '100%' : '-100%',
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
gsap.to(element, {                              // Slide back into default position
    x: direction === "left" ? '-70%' : '70%',
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