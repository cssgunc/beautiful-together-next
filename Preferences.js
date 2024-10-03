function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');

    if (content.style.maxHeight) {
        content.style.maxHeight = null; // Close the clicked item
        content.classList.remove('open');
        header.classList.remove('open');
        arrow.innerHTML = '▶'; // Arrow points right when collapsed
    } else {
        content.style.maxHeight = content.scrollHeight + "px"; // Expand to show content
        content.classList.add('open');
        header.classList.add('open');
        arrow.innerHTML = '▼'; // Arrow points down when expanded
    }
}

function selectOption(checkbox, choice) {
    const accordionItem = checkbox.closest('.accordion-item');
    const headerSelection = accordionItem.querySelector('.accordion-header .selection');
    const checkboxes = accordionItem.querySelectorAll('input[type="checkbox"]');

    let selectedOptions = [];

    // Get the selected options
    checkboxes.forEach(cb => {
        if (cb.checked) {
            selectedOptions.push(cb.nextSibling.textContent.trim());
        }
    });

    // Handle "All" or "No Preference" selections
    if (choice === 'All' || choice === 'No Preference') {
        checkboxes.forEach(cb => {
            if (cb !== checkbox) {
                cb.checked = false; // Deselect others if "All" or "No Preference" is checked
            }
        });
        selectedOptions = [choice]; // Only show "All" or "No Preference"
    } else {
        // Deselect "All" or "No Preference" if another option is selected
        checkboxes.forEach(cb => {
            if (cb.nextSibling.textContent.trim() === 'All' || cb.nextSibling.textContent.trim() === 'No Preference') {
                cb.checked = false;
            }
        });


        // General logic to select "All" when all specific options are selected
        const specificOptions = Array.from(checkboxes).filter(cb => cb !== checkbox && cb.nextSibling.textContent.trim() !== 'All');
        const allSelected = specificOptions.every(cb => cb.checked);
        const allOption = accordionItem.querySelector('input[type="checkbox"][onclick*="All"]');

        if (allSelected && allOption) {
            specificOptions.forEach(cb => cb.checked = false);
            allOption.checked = true;
            specificOptions.forEach(cb => cb.checked = false);
            selectedOptions = ['All']; // Display only "All" when all are selected
        } else {
            // Filter out "All" if it's mistakenly kept in the selection box
            selectedOptions = selectedOptions.filter(option => option !== 'All');
        }
    }

    // Ensure the display is updated correctly
    if (selectedOptions.includes('All')) {
        headerSelection.innerText = 'All'; // Only show "All" if selected
    } else {
        // Display the selected options
        headerSelection.innerText = selectedOptions.join(', ') || 'Select'; // Update the selection display
    }
}
