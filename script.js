console.log('Connected to index.html');

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