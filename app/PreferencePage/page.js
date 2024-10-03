import styles from "./styles.css";

export default function Home() {

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
    
  return (
    <>
<body>
<div className="container">
    <div className="left-section"></div>
    <div className="center-section">
        <div className="header">
            <h1>Preferences</h1>
            <button className="done-button">Done</button>
        </div>
        <div className="buttonSection">
            <form id="preferencesForm">
                <div className="accordion">
                    <div className="accordion-item">
                        <h3>Pet Preference:</h3>
                        <div className="accordion-header" onclick="toggleAccordion(this)">
                            <span className="selection">Select</span>
                            <span className="arrow">▶</span>
                        </div>
                        <div className="accordion-content">
                            <label><input type="checkbox" onclick="selectOption(this, 'Cats')"/> Cats</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'Dogs')"/> Dogs</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'All')"/> All</label>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h3>Gender:</h3>
                        <div className="accordion-header" onclick="toggleAccordion(this)">
                            <span className="selection">Select</span>
                            <span className="arrow">▶</span>
                        </div>
                        <div className="accordion-content">
                            <label><input type="checkbox" onclick="selectOption(this, 'Male')"/> Male</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'Female')"/> Female</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'Both')"/> Both</label>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h3>Age:</h3>
                        <div className="accordion-header" onclick="toggleAccordion(this)">
                            <span className="selection">Select</span>
                            <span className="arrow">▶</span>
                        </div>
                        <div className="accordion-content">
                            <label><input type="checkbox" onclick="selectOption(this, 'Baby (0-5 Months)')"/> Baby (0-5 Months)</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'Puppy (5-24 Months)')"/> Puppy (5-24 Months)</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'Youth (2-5 Years)')"/> Youth (2-5 Years)</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'Adult (5-9 Years)')"/> Adult (5-9 Years)</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'Senior (9+ Years)')"/> Senior (9+ Years)</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'All')"/> All</label>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h3>Good With Pets?:</h3>
                        <div className="accordion-header" onclick="toggleAccordion(this)">
                            <span className="selection">Select</span>
                            <span className="arrow">▶</span>
                        </div>
                        <div className="accordion-content">
                            <label><input type="checkbox" onclick="selectOption(this, 'Big Dogs')"/> Big Dogs</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'Small Dogs')"/> Small Dogs</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'All Dogs')"/> All Dogs</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'Cats')"/> Cats</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'All Pets')"/> All Pets</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'No Preference')"/> No Preference</label>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h3>Good With Kids?:</h3>
                        <div className="accordion-header" onclick="toggleAccordion(this)">
                            <span className="selection">Select</span>
                            <span className="arrow">▶</span>
                        </div>
                        <div className="accordion-content">
                            <label><input type="checkbox" onclick="selectOption(this, 'Kids Over 6')"/> Kids Over 6</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'Kids Over 10')"/> Kids Over 10</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'All Kids')"/> All Kids</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'No Preference')"/> No Preference</label>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h3>Special Needs:</h3>
                        <div className="accordion-header" onclick="toggleAccordion(this)">
                            <span className="selection">Select</span>
                            <span className="arrow">▶</span>
                        </div>
                        <div className="accordion-content">
                            <label><input type="checkbox" onclick="selectOption(this, 'Yes')"/> Yes</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'No')"/> No</label>
                            <label><input type="checkbox" onclick="selectOption(this, 'No Preference')"/> No Preference</label>
                        </div>
                    </div>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    </div>
    <div className="right-section"></div>
</div>

<script src="Preferences.js"></script>

</body>
    </>
  );
}
