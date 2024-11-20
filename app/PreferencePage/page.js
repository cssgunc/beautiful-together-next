"use client"
import React, { useState } from 'react';
import './styles.css';
import Navbar from '../navbar/navbar';

const AccordionItem = ({ title, options, selectedOptions, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item">
            <h3>{title}</h3>
            <div className="accordion-header" id={isOpen ? "open" : ""} onClick={toggleAccordion}>
                <span className="selection">{selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select'}</span>
                <span className="arrow">{isOpen ? '▼' : '▶'}</span>
            </div>
            <div className="accordion-content" id={isOpen ? "open" : ""} style={{ maxHeight: isOpen ? '1000px' : '0', overflow: 'hidden' }}>
                {options.map(option => (
                    <label key={option}>
                        <input
                            type="checkbox"
                            onChange={() => onSelect(option)}
                            checked={selectedOptions.includes(option)}
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
};

const Preferences = () => {
    const preferenceOptions = [
        {
            title: 'Pet Preference',
            options: ['Cats', 'Dogs']
        },
        {
            title: 'Gender',
            options: ['Male', 'Female']
        },
        {
            title: 'Age',
            options: ['Baby (0-5 Months)', 'Puppy (5-24 Months)', 'Youth (2-5 Years)', 'Adult (5-9 Years)', 'Senior (9+ Years)']
        },
        {
            title: 'Good With Pets?',
            options: ['Big Dogs', 'Small Dogs', 'Cats']
        },
        {
            title: 'Good With Kids?',
            options: ['Kids Over 6', 'Kids Over 10']
        },
        {
            title: 'Special Needs',
            options: ['Yes', 'No']
        }
    ];

    const [selectedOptions, setSelectedOptions] = useState({});

    const handleSelectOption = (title, option) => {
        setSelectedOptions(prevSelected => {
            const currentSelection = prevSelected[title] || [];
            if (currentSelection.includes(option)) {
                return { ...prevSelected, [title]: currentSelection.filter(item => item !== option) };
            }
            return { ...prevSelected, [title]: [...currentSelection, option] };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");
    
        // Save preferences to localStorage
        localStorage.setItem('preferences', JSON.stringify(selectedOptions));
    
        // Get the preferences from localStorage
        const data = localStorage.getItem('preferences');
        const parseData = JSON.parse(data);
        console.log('User Preferences: ', parseData);
        alert(data);
        const preferences = parseData;
    };

    return (
        <div>
            <Navbar title='Preferences'/>
            <div className="container">
                <div className="left-section"></div>
                <div className="center-section">
                    <div className="buttonSection">
                        <form id="preferencesForm" onSubmit={handleSubmit}>
                            <div className="accordion">
                                {preferenceOptions.map(preference => (
                                    <AccordionItem 
                                        key={preference.title} 
                                        title={preference.title} 
                                        options={preference.options} 
                                        selectedOptions={selectedOptions[preference.title] || []} 
                                        onSelect={(option) => handleSelectOption(preference.title, option)} 
                                    />
                                ))}
                            </div>
                            <button type="submit">Save</button>
                        </form>
                    </div>
                </div>
                <div className="right-section"></div>
            </div>
        </div>
    );
};

export default Preferences;