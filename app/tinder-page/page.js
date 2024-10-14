'use client';

import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton,
  Container,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Favorite, Menu } from '@mui/icons-material';
import PetCard from './PetCard';
import { petsData } from './petsData';

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

export default function Home() {
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
              <PetCard pet={petsData[0]} />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}