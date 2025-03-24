function toggleAccordion(header) {
  const content = header.nextElementSibling;
  const arrow = header.querySelector(".arrow");

  if (content.style.maxHeight) {
    content.style.maxHeight = null; // Close the clicked item
    content.classList.remove("open");
    header.classList.remove("open");
    arrow.innerHTML = "▶"; // Arrow points right when collapsed
  } else {
    content.style.maxHeight = content.scrollHeight + "px"; // Expand to show content
    content.classList.add("open");
    header.classList.add("open");
    arrow.innerHTML = "▼"; // Arrow points down when expanded
  }
}

function selectOption(checkbox) {
  const accordionItem = checkbox.closest(".accordion-item");
  const headerSelection = accordionItem.querySelector(
    ".accordion-header .selection",
  );
  const checkboxes = accordionItem.querySelectorAll('input[type="checkbox"]');

  let selectedOptions = [];

  // Collect selected options
  checkboxes.forEach((cb) => {
    if (cb.checked) {
      selectedOptions.push(cb.nextSibling.textContent.trim());
    }
  });

  // Display the selected options or 'Select' if none are chosen
  headerSelection.innerText =
    selectedOptions.length > 0 ? selectedOptions.join(", ") : "Select";
}
