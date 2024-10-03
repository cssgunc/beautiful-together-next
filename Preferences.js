function toggleAccordion(header) {
    const allHeaders = document.querySelectorAll('.accordion-header');
    const allContents = document.querySelectorAll('.accordion-content');

    // Close all other accordion items
    allContents.forEach((content, index) => {
        if (content !== header.nextElementSibling) {
            content.style.maxHeight = null; // Close other accordion items
            content.classList.remove('open'); // Remove open class from content
            allHeaders[index].classList.remove('open'); // Remove open class from header
            const arrow = allHeaders[index].querySelector('.arrow');
            arrow.innerHTML = '▶'; // Reset arrow for closed items
        }
    });

    // Toggle the clicked accordion item
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');

    if (content.style.maxHeight) {
        content.style.maxHeight = null; // Close the clicked item
        content.classList.remove('open'); // Remove open class from content
        header.classList.remove('open'); // Remove open class from header
        arrow.innerHTML = '▶'; // Change arrow to point right
    } else {
        content.style.maxHeight = content.scrollHeight + "px"; // Expand to show content
        content.classList.add('open'); // Add open class to content
        header.classList.add('open'); // Add open class to header
        arrow.innerHTML = '▼'; // Change arrow to point down
    }
}

function selectOption(button, choice) {
    const header = button.closest('.accordion-item').querySelector('.accordion-header .selection');
    header.innerText = choice; // Update selection display
    toggleAccordion(button.closest('.accordion-item').querySelector('.accordion-header')); // Close accordion after selection
}
