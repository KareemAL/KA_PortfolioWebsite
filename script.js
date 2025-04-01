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



// LOGIC FOR MOBILE BURGER MENU
document.addEventListener('DOMContentLoaded', () => {
    const burgerIcon = document.querySelector('.burger-icon');
    const dropdown = document.querySelector('.dropdown');
    const overlay = document.querySelector('.overlay');
    const mainContent = document.querySelector('.main-content');


    // Toggle dropdown on burger icon click (Mobile behavior)
    burgerIcon?.addEventListener('click', () => {
        if (window.innerWidth <= 768) { // Apply behavior only on mobile
            dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
            overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
        }
    });

    // Close dropdown if clicking outside of it (Mobile behavior)
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768) { // Apply behavior only on mobile
            if (!burgerIcon.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.style.display = 'none';
                overlay.style.display = 'none';
            }
        }
    });


// Resize event listener to reset dropdown display and blur overlay based on viewport width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // On desktop, ensure dropdown is visible
            dropdown.style.display = 'flex';
            overlay.style.display = 'none';
        } else {
            // On mobile, hide dropdown by default
            dropdown.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
});

//LOGIC FOR SNAPPING
// Select all the snapping sections
const sections = document.querySelectorAll(".snap-section");

// Track the last scroll position to calculate scroll direction
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Determine scroll direction
    const scrollingDown = currentScrollY > lastScrollY;
    const scrollingUp = currentScrollY < lastScrollY;

    sections.forEach((section, index) => {
        // Get section's top position relative to the viewport
        const sectionTop = section.getBoundingClientRect().top;

        // Check if within the snapping range (30% of viewport height)
        if (Math.abs(sectionTop) < viewportHeight * 0.3) {
            if (scrollingDown && index < sections.length - 1) {
                // Snap DOWN to next section
                section.nextElementSibling.scrollIntoView({ behavior: "smooth" });
            } else if (scrollingUp && index > 0) {
                // Snap UP to previous section
                section.previousElementSibling.scrollIntoView({ behavior: "smooth" });
            }
        }
    });

    // Update the last scroll position
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