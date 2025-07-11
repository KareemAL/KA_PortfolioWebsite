document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;
    const pagesWithNavbar = [
        "/Portfolio_Website/index.html",
        "/Portfolio_Website/projects.html",
        "/Portfolio_Website/resume.html",
        "/Portfolio_Website/contact.html",
        "/Portfolio_Website/projects/3DWebViewer/3dwebviewer.html",
    ];

    console.log(window.location.pathname);

    if (pagesWithNavbar.includes(currentPage)) {
        fetch("/Portfolio_Website/JS_loading/navbar.html")
            .then((response) => response.text())
            .then((data) => {
                const LocalNavbarContainer = document.getElementById("localNavbar-container");
                if (LocalNavbarContainer) {
                    LocalNavbarContainer.innerHTML = data;

                    // Initialize dropdown functionality
                    initNavbarDropdownLogic();
                }
            })

            .catch((error) => console.error("Failed to load navbar:", error));
    }
});


// Function to reinitialize the dropdown functionality
function initNavbarDropdownLogic() {
    const contentMapping = {
        // (keep the original contentMapping from script.js)
        Projects: {
            "3D Projects": [
                { name: "Project 1A", href: "project1a.html" },
                { name: "Project 1B", href: "project1b.html" },
            ],
            "3D Webviewer": [
                {
                    name: "Try out Webviewer",
                    href: "/Portfolio_Website/projects/3DWebViewer/3dwebviewer.html",
                },
            ],
            Web: [
                { name: "Portfolio Website", href: "project2a.html" },
                { name: "Project 2B", href: "project2b.html" },
            ],
            Gamedev: [
                { name: "Let it Cook", href: "project3a.html" },
                { name: "Wizarchitect", href: "project3b.html" },
                { name: "Interstellum", href: "project3c.html" },
                { name: "Duskeep", href: "project3c.html" },
            ],
        },
        Résumé: {
            Résumé: [{ name: "Education and Employment", href: "resume1.html" }],
            Portfolio: [
                { name: "PDF", href: "resumeA1.html" },
                { name: "Other Work", href: "resumeB1.html" },
            ],
        },
        Contact: {
            "Contact Info": [{ name: "Contact Info", href: "contact1.html" }],
            Socials: [
                { name: "YouTube", href: "contactA1.html" },
                { name: "Instagram", href: "contactB1.html" },
                { name: "ArtStation", href: "contactB1.html" },
                { name: "Twitter", href: "contactB1.html" },
                { name: "BlueSky", href: "contactB1.html" },
            ],
        },
    };


    // Common Utility Functions
    const populateLinks = (columnElement, subcategories) => {
        columnElement.innerHTML = subcategories
            .map(
                (link) =>
                    `<a href="${link.href}" class="dropdown-item">${link.name}</a>`
            )
            .join("");
    };
    const populateColumn = (columnElement, items, clickHandler = null) => {
        columnElement.innerHTML = items
            .map(item => `<div class="dropdown-item">${typeof item === 'string' ? item : item.name}</div>`)
            .join("");
        if (clickHandler) {
            const columns = columnElement.querySelectorAll(".dropdown-item");
            columns.forEach(item => item.addEventListener("click", () => clickHandler(item.textContent)));
        }
    };


    // Desktop Dropdown Logic
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
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
        categories.forEach((category) => {
            category.addEventListener("click", (e) => {
                e.preventDefault();
                setActiveCategory(categories, category);
                const categoryText = category.textContent;
                populateLinks(contentColumn, contentMapping[navText][categoryText]);
            });
        });
    });

    const setActiveCategory = (categories, activeCategory) => {
        categories.forEach((category) => category.classList.remove("active-category"));
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
}