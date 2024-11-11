'use client';

import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton,
  Container,
  Card
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Favorite, Menu } from '@mui/icons-material';
import PetCard from './PetCard';
import { petsData, petsData2} from './petsData';
import { fetchPetData } from '../fetchPetData/fetchPetData';
import Navbar from '../navbar/navbar';
import { useEffect, useState } from 'react';
import Notification from './Notification';


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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [petData, setPetData] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [savedPet, setSavedPet] = useState(false)
  const [savedPetName, setSavedPetName] = useState('')
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    updatePetData();
  }, [])
  
  async function updatePetData(){
    try {
      const data = await fetchPetData()
      if (data){
        console.log("Data retrived:", data)
        setPetData(data)
        setPageLoaded(true)
        
      }
  
    } catch (error) {
      console.error("Error fetching pet data", error.message);
      setErrorMessage('Failed to Connect to Supabase.');
    }
  }

  const pass = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % petData.length); 
    
  }

  const adopt = () => {
    setSavedPet(true)
    setSavedPetName(petData[currentIndex].name)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % petData.length); 
    addNotification(petData[currentIndex].name)
  }

  const addNotification = (name) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, {id, name}])
    console.log(notifications)
  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Navbar />
        {pageLoaded && 
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '90%', maxWidth: '400px' }}>
                  <PetCard pet={petData[currentIndex]} pass={pass} adopt={adopt} />
                  <Box sx={{ bottom: 20, right: 20, zIndex: 1000 }}>
                    {
                      notifications.map((n) => (
                        <Notification key = {n.id} name = {n.name} onClose = {() => removeNotification(n.id)}/>
                      )
                      )
                    } 
                  </Box>         
            </Box>
          </Box>
        </Container>
        }
        
      </Box>
    </ThemeProvider>
  );
}