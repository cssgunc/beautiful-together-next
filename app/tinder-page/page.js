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
import { petsData, petsData2} from './petsData';
import { fetchPetData } from '../fetchPetData/fetchPetData';
import Navbar from '../navbar/navbar';
import { useEffect, useState } from 'react';

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
  const [petCount, setPetCount] = useState(-1);
  const [petData, setPetData] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    updatePetData();
  }, [])
  
  async function updatePetData(){
    try {
      const data = await fetchPetData()
      if (data){
        console.log("Data retrived:", data)
        setPetData(data);
        setPetCount(data.length);
        setPageLoaded(true)
        
      }
  
    } catch (error) {
      console.error("Error fetching pet data", error.message);
      setErrorMessage('Failed to Connect to Supabase.');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Navbar />
        {pageLoaded && 
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '90%', maxWidth: '400px' }}>
              <PetCard pet={petData[0]} />
            </Box>
          </Box>
        </Container>
        }
      </Box>
    </ThemeProvider>
  );
}