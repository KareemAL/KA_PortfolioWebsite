console.log('Connected to index.html');


// LOGIC FOR MAKING SECTIONS APPEAR WITH FADE IN
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the 'show' class to make the section appear
            entry.target.classList.add('show');

            // Stop observing the element so it no longer "disappears"
            observer.unobserve(entry.target);
        }
    });
});

const hiddenElements = document.querySelectorAll('.lower_item_section');
hiddenElements.forEach(element => {
    observer.observe(element);
});


// LOGIC FOR SNAPPING
// Select all the snapping sections
const sections = document.querySelectorAll(".snap-section");

// Track the last scroll position
let lastScrollY = window.scrollY;
const scrollThreshold = 10; // Threshold to minimize sensitivity

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Calculate the scroll delta
    const scrollDelta = currentScrollY - lastScrollY;

    // Ignore minor scroll movements less than the threshold
    if (Math.abs(scrollDelta) < scrollThreshold) {
        return; // Exit early for minor movements
    }

    // Detect the scroll direction
    const scrollingDown = scrollDelta > 0;
    const scrollingUp = scrollDelta < 0;

    sections.forEach((section, index) => {
        // Get section's top position relative to the viewport
        const sectionTop = section.getBoundingClientRect().top;

        // Check if the section is within snapping range (30% of viewport height)
        if (Math.abs(sectionTop) < viewportHeight * 0.3) {
            if (scrollingDown && index < sections.length - 1) {
                // Snap DOWN to the next section
                section.nextElementSibling.scrollIntoView({ behavior: "smooth" });
            } else if (scrollingUp && index > 0) {
                // Snap UP to the previous section
                section.previousElementSibling.scrollIntoView({ behavior: "smooth" });
            }
        }
    });

    // Update the last scroll position (only after a valid scroll)
    lastScrollY = currentScrollY;
});



// LOGIC FOR HEADER/NAVIGATION BAR TOGGLE (SLIDE UP OR DOWN)
function initHeaderToggle() {
    // Select the header
    const header = document.getElementById("header");

    // Track the last scroll position
    let lastScrollY = window.scrollY;

    // Add event listener to handle scrolling
    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        // Determine scroll direction
        const scrollingDown = currentScrollY > lastScrollY;
        const scrollingUp = currentScrollY < lastScrollY;

        // Header behavior
        if (scrollingDown) {
            header.style.transform = "translateY(-100%)"; // Slide header out of view
        } else if (scrollingUp) {
            header.style.transform = "translateY(0)"; // Slide header back into view
        }

        // Update the last scroll position
        lastScrollY = currentScrollY;
    });
}

// Initialize the header toggle behavior
initHeaderToggle();