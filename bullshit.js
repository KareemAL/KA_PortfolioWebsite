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

const contentMapping = {
    "Projects": {
        "3D Projects": [
            { name: "Project 1A", href: "project1a.html" },
            { name: "Project 1B", href: "project1b.html" }
        ],
        "3D Webviewer": [
            { name: "Try out Webviewer", href: "project1a.html" }
        ],
        "Web": [
            { name: "Portfolio Website", href: "project2a.html" },
            { name: "Project 2B", href: "project2b.html" }
        ],
        "Gamedev": [
            { name: "Let it Cook", href: "project3a.html" },
            { name: "Wizarchitect", href: "project3b.html" },
            { name: "Interstellum", href: "project3c.html" },
            { name: "Duskeep", href: "project3c.html" }
        ],
    },
    "Résumé": {
        "Résumé": [
            { name: "Education and Employment", href: "resume1.html" }
        ],
        "Portfolio": [
            { name: "PDF", href: "resumeA1.html" },
            { name: "Other Work", href: "resumeB1.html" }
        ]
    },
    "Contact": {
        "Contact Info": [
            { name: "Contact Info", href: "contact1.html" },
        ],
        "Socials": [
            { name: "YouTube", href: "contactA1.html" },
            { name: "Instagram", href: "contactB1.html" },
            { name: "ArtStation", href: "contactB1.html" },
            { name: "Twitter", href: "contactB1.html" },
            { name: "BlueSky", href: "contactB1.html" }
        ]
    },
};