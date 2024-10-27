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

const PreferenceSection = ({ title, options, icon }) => {
  const [selected, setSelected] = useState([]);

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
                    onChange={() => handleChange(option)}
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Preferences saved!');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar position="static">
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
        </AppBar>
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
                  />
                ))}

                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    size="large"
                    sx={{ 
                      width: '200px',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontSize: '1.1rem'
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