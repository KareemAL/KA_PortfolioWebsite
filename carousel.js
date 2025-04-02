document.addEventListener("DOMContentLoaded", () => {
    const contents = document.querySelectorAll(".carouselcontent");
    const leftArrow = document.querySelector(".carouselleft-arrow");
    const rightArrow = document.querySelector(".carouselright-arrow");
    let currentIndex = 0; // Tracks which content is active

    function showContent(index) {
        // Remove active class from all contents
        contents.forEach((content, i) => {
            content.classList.remove("carouselactive");
            content.style.transform = i < index ? "translateX(-100%)" : "translateX(100%)";
        });
        // Add active class to current content
        contents[index].classList.add("carouselactive");
    }

    leftArrow.addEventListener("click", () => {
        currentIndex = (currentIndex === 0 ? contents.length - 1 : currentIndex - 1);
        showContent(currentIndex);
    });

    rightArrow.addEventListener("click", () => {
        currentIndex = (currentIndex === contents.length - 1 ? 0 : currentIndex + 1);
        showContent(currentIndex);
    });

    // Initialize first content as active
    showContent(currentIndex);
});