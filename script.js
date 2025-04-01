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

    // Toggle dropdown on burger icon click (Mobile behavior)
    burgerIcon?.addEventListener('click', () => {
        if (window.innerWidth <= 768) { // Apply behavior only on mobile
            dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
        }
    });

    // Close dropdown if clicking outside of it (Mobile behavior)
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768) { // Apply behavior only on mobile
            if (!burgerIcon.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.style.display = 'none';
            }
        }
    });

    // Resize event listener to reset dropdown display based on viewport width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // On desktop, ensure dropdown is visible
            dropdown.style.display = 'flex';
        } else {
            // On mobile, hide dropdown by default
            dropdown.style.display = 'none';
        }
    });
});