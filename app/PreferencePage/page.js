"use client"
import React, { useState } from 'react';
import './styles.css';

const AccordionItem = ({ title, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (option) => {
        setSelectedOptions(prevSelected => {
            if (prevSelected.includes(option)) {
                return prevSelected.filter(item => item !== option);
            }
            return [...prevSelected, option];
        });
    };

    return (
        <div className="accordion-item">
            <h3>{title}</h3>
            <div className="accordion-header" onClick={toggleAccordion}>
                <span className="selection">{selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select'}</span>
                <span className="arrow">{isOpen ? '▼' : '▶'}</span>
            </div>
            <div className="accordion-content" style={{ maxHeight: isOpen ? '1000px' : '0', overflow: 'hidden' }}>
                {options.map(option => (
                    <label key={option}>
                        <input
                            type="checkbox"
                            onChange={() => selectOption(option)}
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert('Preferences saved!');
    };

    return (
        <div className="container">
            <div className="left-section"></div>
            <div className="center-section">
                <div className="header">
                    <h1>Preferences</h1>
                    <button className="done-button">Done</button>
                </div>
                <div className="buttonSection">
                    <form id="preferencesForm" onSubmit={handleSubmit}>
                        <div className="accordion">
                            {preferenceOptions.map(preference => (
                                <AccordionItem key={preference.title} title={preference.title} options={preference.options} />
                            ))}
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
            <div className="right-section"></div>
        </div>
    );
};

export default Preferences;
