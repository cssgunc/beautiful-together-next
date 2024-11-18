// app/tinder-page/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container,
  Card
  Typography
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PetCard from './PetCard';
import { petsData, petsData2} from './petsData';
import { fetchPetData } from '../fetchPetData/fetchPetData';
import Navbar from '../navbar/navbar';
import { useEffect, useState } from 'react';
import Notification from './Notification';
import { saveAnimal, getSavedAnimals } from '../savedPetsCookie/savedPetsCookie';


import Navbar from '../navbar/navbar';
import { getPetData } from '../../utils/indexedDB';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#F8F6F3',
    },
  },
});
const defaultImage = 'https://beautifultogethersanctuary.com/wp-content/uploads/2023/09/btogether-new-sanctuary-286x116-1.png';

export default function Home() {
  const [currentPet, setCurrentPet] = useState(null);
  const [petsQueue, setPetsQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  // Transform pet data to match PetCard format
  const transformPetData = (pet) => {
    if (!pet) return null;

    const traits = [];
    if (pet.tags) {
      if (pet.tags.Breed) traits.push({ icon: 'Pets', text: pet.tags.Breed });
      if (pet.tags.Gender) traits.push({ icon: 'Male', text: pet.tags.Gender });
      if (pet.tags.Age) traits.push({ icon: 'Cake', text: pet.tags.Age.split('-')[0].trim() });
      if (pet.tags.Weight) traits.push({ icon: 'Scale', text: pet.tags.Weight });
      if (pet.tags.Color) traits.push({ icon: 'Palette', text: pet.tags.Color });
      if (pet.tags['Good with Kids']) {
        traits.push({ icon: 'ChildCare', text: pet.tags['Good with Kids'] });
      }
    }

    // Better image URL handling
    let imageUrl = defaultImage;
    if (pet.images && pet.images.length > 0 && pet.images[0]) {
      // If the image URL starts with http, use it directly
      if (pet.images[0].startsWith('http')) {
        imageUrl = pet.images[0];
      } else {
        // If it's a relative path or needs processing, handle accordingly
        // You might need to adjust this based on your image storage setup
        imageUrl = `${pet.images[0]}`;
      }
    }

    console.log('Processing pet:', pet.name, 'Image URL:', imageUrl); // Debug log

    return {
      id: pet.id,
      name: pet.name || 'Unknown',
      age: pet.tags?.Age ? pet.tags.Age.split('(')[0].trim() : 'Unknown',
      image: imageUrl,
      traits,
      summary: pet.tags?.['Energy Level'] 
        ? `${pet.name} is ${pet.tags['Energy Level'].toLowerCase()}. ${
            pet.tags.Breed ? `This lovely ${pet.tags.Breed}` : 'This pet'
          } is looking for a forever home!`
        : `Meet ${pet.name}! A lovely ${pet.tags?.Breed || 'pet'} looking for a forever home.`
    };
  };

  // Load initial data
  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true);
        const data = await getPetData();
        console.log('Loaded pets:', data);
        
        if (data && Array.isArray(data)) {
          // Shuffle the array to randomize the order
          const shuffledPets = [...data].sort(() => Math.random() - 0.5);
          setPetsQueue(shuffledPets);
          
          // Set the first pet as current
          if (shuffledPets.length > 0) {
            const transformedPet = transformPetData(shuffledPets[0]);
            console.log('Setting initial pet:', transformedPet); // Debug log
            setCurrentPet(transformedPet);
          }
        }
      } catch (error) {
        console.error('Error loading pets:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

  const getNextPet = () => {
    // Remove the first pet from the queue
    const updatedQueue = [...petsQueue];
    updatedQueue.shift();
    setPetsQueue(updatedQueue);

    // Set the next pet as current
    if (updatedQueue.length > 0) {
      const nextPet = transformPetData(updatedQueue[0]);
      console.log('Next pet:', nextPet); // Debug log
      setCurrentPet(nextPet);
    } else {
      setCurrentPet(null);
    }
  };

  const handlePass = () => {
    console.log('Passed on:', currentPet?.name);
    getNextPet();
  };

  const handleAdopt = () => {
    console.log('Liked:', currentPet?.name);
    // Add any additional adoption logic here
    getNextPet();
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ 
          flexGrow: 1, 
          bgcolor: 'background.default', 
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          Loading pets...
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Navbar />
        {pageLoaded && 
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '90%', maxWidth: '400px' }}>
              {currentPet ? (
                <PetCard 
                  key={currentPet.id} // Add key prop for better React rendering
                  pet={currentPet}
                  onPass={handlePass}
                  onAdopt={handleAdopt}
                />
              ) : (
                <Box sx={{ 
                  textAlign: 'center', 
                  mt: 4, 
                  p: 4, 
                  bgcolor: 'white',
                  borderRadius: '16px',
                  boxShadow: 1
                }}>
                  <Typography variant="h6">
                    No more pets to show!
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Check back later for more furry friends.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
        }
        
      </Box>
    </ThemeProvider>
  );
}