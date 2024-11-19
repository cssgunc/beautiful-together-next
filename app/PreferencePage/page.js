"use client"
import React, { useState } from 'react';
import './styles.css';
import Navbar from '../navbar/navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // green
    },
    secondary: {
      main: '#f44336', // red
    },
    background: {
      default: '#F8F6F3',
    },
  },
});

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item">
            <h3>{title}</h3>
            <div className="accordion-header" id = {isOpen ? "open" : ""} onClick={toggleAccordion}>
                <span className="selection">{selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select'}</span>
                <span className="arrow">{isOpen ? '▼' : '▶'}</span>
            </div>
   
                <div className="accordion-content" id = {isOpen ? "open" : ""} style={{ maxHeight: isOpen ? '1000px' : '0', overflow: 'hidden' }}>
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Beautiful Together Animal Sanctuary
            </Typography>
            <IconButton color="inherit">
              <Favorite />
            </IconButton>
            <IconButton color="inherit">
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar> */}
        <Navbar />
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '90%', maxWidth: '400px' }}>
              <Card 
                component="form" 
                onSubmit={handleSubmit}
                sx={{ 
                  width: '100%',
                  bgcolor: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'rgba(76, 175, 80, 0.9)',
                    color: 'white',
                    padding: '16px',
                  }}
                >
                  <Typography variant="h6">
                    Your Preferences
                  </Typography>
                </Box>
                
                <div className="left-section"></div>
                <div className="center-section">
                    <div className="buttonSection">
                        <form id="preferencesForm" onSubmit={handleSubmit}>
                            <div className="accordion">
                                {preferenceOptions.map(preference => (
                                    <AccordionItem key={preference.title} title={preference.title} options={preference.options} selectedOptions={selectedOptions[preference.title] || []} onSelect={(option) => handleSelectOption(preference.title, option)}/>
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