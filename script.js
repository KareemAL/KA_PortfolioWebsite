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



// LOGIC FOR NAVBAR DROPDOWN MENUS
document.addEventListener("DOMContentLoaded", () => {
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

    // Common Utility Functions
    const populateColumn = (columnElement, items, clickHandler = null) => {
        columnElement.innerHTML = items
            .map(item => `<div class="dropdown-item">${typeof item === 'string' ? item : item.name}</div>`)
            .join("");
        if (clickHandler) {
            const columns = columnElement.querySelectorAll(".dropdown-item");
            columns.forEach(item => item.addEventListener("click", () => clickHandler(item.textContent)));
        }
    };

    const populateLinks = (columnElement, subcategories) => {
        columnElement.innerHTML = subcategories
            .map(link => `<a href="${link.href}" class="dropdown-item">${link.name}</a>`)
            .join("");
    };

    // Desktop Dropdown Logic
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        const dropdown = item.querySelector(".dropdown");
        const categories = item.querySelectorAll(".categories .dropdown-item");
        const contentColumn = item.querySelector(":scope .dropdown-column:nth-child(2)");
        const navText = item.querySelector(".nav-link").textContent.trim();

        // Handle Desktop Dropdown Show/Hide
        item.addEventListener("mouseenter", () => {
            dropdown.style.display = "flex";
            if (categories.length > 0) {
                const firstCategory = categories[0];
                setActiveCategory(categories, firstCategory);
                populateLinks(contentColumn, contentMapping[navText][firstCategory.textContent]);
            }
        });


        item.addEventListener("mouseleave", () => {
            dropdown.style.display = "none";
            setActiveCategory(categories, null);
        });

        // Handle Category Click
        categories.forEach(category => {
            category.addEventListener("click", e => {
                e.preventDefault();
                setActiveCategory(categories, category);
                const categoryText = category.textContent;
                populateLinks(contentColumn, contentMapping[navText][categoryText]);
            });
        });
    });


    const setActiveCategory = (categories, activeCategory) => {
        categories.forEach(category => category.classList.remove("active-category"));
        if (activeCategory) activeCategory.classList.add("active-category");
    };

    // Mobile Dropdown Logic
    const burgerIcon = document.querySelector(".burger-icon");
    const dropdownMobile = document.querySelector(".dropdown-mobile");
    const navColumn = dropdownMobile.querySelector(".nav-items");
    const categoryColumn = dropdownMobile.querySelector(".categories");
    const subcategoryColumn = dropdownMobile.querySelector(".subcategories");

    burgerIcon.addEventListener("click", () => {
        dropdownMobile.classList.toggle("active");

        populateColumn(navColumn, Object.keys(contentMapping), navItemText => {
            populateColumn(categoryColumn, Object.keys(contentMapping[navItemText]), categoryText => {
                populateLinks(subcategoryColumn, contentMapping[navItemText][categoryText]);
            });
            subcategoryColumn.innerHTML = ""; // Clear subcategories when a new nav item is clicked
        });

        categoryColumn.innerHTML = ""; // Clear categories when the menu is toggled
        subcategoryColumn.innerHTML = ""; // Clear subcategories when the menu is toggled
    });
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