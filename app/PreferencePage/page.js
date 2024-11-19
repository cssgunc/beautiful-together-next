'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  ExpandMore,
  Favorite,
  Menu,
  Pets,
  WcOutlined,
  Cake,
  ChildCare,
  MedicalInformation,
  Checklist,
} from '@mui/icons-material';
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

const PreferenceSection = ({ title, options, icon, onSelect }) => {
  const [selected, setSelected] = useState([]);

  const handleChangeBoth = (option) => {
    onSelect(option);
    handleChange(option);
  };

  const handleChange = (option) => {
    setSelected(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  return (
    <Box>
      <Accordion 
        elevation={0}
        sx={{
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            '&.Mui-expanded': {
              minHeight: '48px',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {icon}
            <Typography>{title}</Typography>
            {selected.length > 0 && (
              <Typography color="text.secondary" sx={{ ml: 1 }}>
                ({selected.length} selected)
              </Typography>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={selected.includes(option)}
                    onChange={() => handleChangeBoth(option)}
                    sx={{
                      color: theme.palette.primary.main,
                      '&.Mui-checked': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Divider />
    </Box>
  );
};

const Preferences = () => {
  const preferenceOptions = [
    {
      title: 'Pet Preference',
      options: ['Cats', 'Dogs'],
      icon: <Pets color="primary" />
    },
    {
      title: 'Gender',
      options: ['Male', 'Female'],
      icon: <WcOutlined color="primary" />
    },
    {
      title: 'Age',
      options: ['Baby (0-5 Months)', 'Puppy (5-24 Months)', 'Youth (2-5 Years)', 'Adult (5-9 Years)', 'Senior (9+ Years)'],
      icon: <Cake color="primary" />
    },
    {
      title: 'Good With Pets?',
      options: ['Big Dogs', 'Small Dogs', 'Cats'],
      icon: <Checklist color="primary" />
    },
    {
      title: 'Good With Kids?',
      options: ['Kids Over 6', 'Kids Over 10'],
      icon: <ChildCare color="primary" />
    },
    {
      title: 'Special Needs',
      options: ['Yes', 'No'],
      icon: <MedicalInformation color="primary" />
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    //alert('Preferences saved! ' + JSON.stringify(selectedOptions));
    localStorage.setItem('preferences', JSON.stringify(selectedOptions));
    //To Get Data in JSON form Use: 
    const data = localStorage.getItem('preferences');
    alert(data);
    
    const parseData = JSON.parse(data);
    // Access the "Age" preferences (which is an array)
    const agePreferences = parseData["Age"];
    alert(agePreferences);
    const goodWithPetsPreferences = parseData["Good With Pets?"];
    alert(goodWithPetsPreferences);

    // If 'Age' has any selected options, join them into a comma-separated string

    //const ageText = parseData.Age ? parseData.Age.join(', ') : 'No Age selected';
    //alert(ageText);

    //const goodWithText = parseData["Good With Pets?"] ? parseData["Good With Pets?"].join(', ') : 'No pets selected';
    //alert(goodWithText);

    //May have to initialize or deal with null preferences in the future
  };

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
                
                {preferenceOptions.map((preference, index) => (
                  <PreferenceSection
                    key={preference.title}
                    title={preference.title}
                    options={preference.options}
                    icon={preference.icon}
                    onSelect={(option) => handleSelectOption(preference.title, option)}
                  />
                ))}

                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        sx={{ 
                            width: '200px',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            color: 'white',
                            bgcolor: '#f4900c', // Set orange background
                            '&:hover': {
                            bgcolor: '#d67d0a'  // Slightly darker orange for hover
                            }
                        }}
                    >
                    Save Preferences
                    </Button>
                </Box>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Preferences;