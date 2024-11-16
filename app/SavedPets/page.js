'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  Grid
} from '@mui/material';
import Navbar from '../navbar/navbar';
import LikedDog from './LikedDog';  // Add this import
import LikedCat from './LikedCat';  // Add this import
import { fetchPetData } from '../fetchPetData/fetchPetData';
import { getSavedAnimals } from '../savedPetsCookie/savedPetsCookie';


// Theme creation
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // green
    },
    secondary: {
      main: '#f4900c', // btorange
    },
    background: {
      default: '#F8F6F3',
    },
  },
});

export default function SavedPetsPage() {
  const [pets, setPets] = useState([])
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    updatePetData();
  }, [])

  async function updatePetData(){
    try {
      const data = await fetchPetData() //replace with whatever middleware they're developing
      const cookieData = await getSavedAnimals()
      if (data){
        let saved = cookieData.map((id) => data.find((pet) => pet.id == id))
        saved.reverse() // most recent saved at the top
        setPets(saved)
        console.log(saved)
        setPageLoaded(true)
        
      }
  
    } catch (error) {
      console.error("Error fetching pet data", error.message);
      setErrorMessage('Failed to Connect to Supabase.');
    }
  }

  /*
  const [pets] = useState({
    bear: {
      name: "Bear",
      species: "dog",
      link: "https://beautifultogethersanctuary.com/dog/bear/",
      years: "7",
      breed: "Hound & Mix",
      sex: "Male",
      age: "Adult (5-9 Years) (04/01/2018) - Estimated",
      weight: "71-80 Pounds",
      color: "Brown & Tan",
      temperament: "Affectionate",
      kids: "I Like Kids Over 10",
      dogs: "I Like Select Dogs",
      cats: "I Don't Like Cats",
      images: [
        "https://beautifultogethersanctuary.com/wp-content/uploads/2024/08/IMG_7774.jpeg",
        "https://beautifultogethersanctuary.com/wp-content/uploads/2024/08/IMG_7771.jpeg",
        "https://beautifultogethersanctuary.com/wp-content/uploads/2024/08/IMG_7773.jpeg",
        "https://beautifultogethersanctuary.com/wp-content/uploads/2024/08/IMG_7772.jpeg",
        "https://beautifultogethersanctuary.com/wp-content/uploads/2024/08/IMG_7770.jpeg",
      ],
    },
    acorn: {
      name: "Acorn",
      species: "cat",
      link: "https://beautifultogethersanctuary.com/kitty/acorn/",
      years: "< 1",
      breed: "Domestic Short Hair",
      sex: "Male",
      age: "Baby (08/13/2024) - Estimated",
      color: "Gray / Blue / Silver",
      temperament: "Social & Friendly",
      litter: "I'm Litterbox Trained",
      images: [
        "https://beautifultogethersanctuary.com/wp-content/uploads/2024/09/IMG_3647-scaled.jpeg",
        "https://beautifultogethersanctuary.com/wp-content/uploads/2024/09/IMG_3695-scaled.jpeg",
      ],
    }
  });
  */

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        flexGrow: 1, 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        pb: 4,// Add padding at bottom,
      }}>
        <Navbar title="Saved Pets" />
        <Container maxWidth="lg" sx={{ mt: 4, display: "flex", alignContent: "center"}}>
          {/* <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              mb: 4, 
              textAlign: 'center',
              color: 'primary.main',
              fontWeight: 'bold'
            }}
          >
            Your Saved Pets
          </Typography> */}
          
            {
              pageLoaded && pets.length == 0 && 
                <Typography 
                variant="h6" 
                sx={{ 
                  textAlign: 'center',
                  color: 'text.secondary',
                  py: 8
                }}
                >
                No saved pets yet. When you save a pet, they will appear here.
              </Typography>
            }
            { pageLoaded && pets.length > 0 && 

              <Grid
              container 
              spacing={5} // Spacing between grid items
              sx={{
                paddingLeft: "20px",
                paddingRight: "20px",
              }}

              >

                {pets.map((pet) => (
                  <Grid 
                    item 
                    xs={12} // Full width on extra-small screens
                    sm={6}  // 2 cards per row on small screens
                    md={6}  // 3 cards per row on medium screens
                    lg={6}  // 4 cards per row on large screens
                    key={pet.id}
                    sx={{
                      display: 'flex',        // Flex display to center the card within each grid item
                      justifyContent: 'center',
                    }}
                  >
                    {pet["dog/cat"] === 'dog' ? (
                      <LikedDog dog={pet} />
                    ) : (
                      <LikedCat cat={pet} />
                    )}
                  </Grid>
                ))}
              </Grid>
            }
              
             
            

        </Container>
      </Box>
    </ThemeProvider>
  );
}


/*

 <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
 {pets.bear && (
              <Box sx={{ width: '100%', maxWidth: '400px' }}>
                <LikedDog dog={pets.bear} />
              </Box>
            )}
            {pets.acorn && (
              <Box sx={{ width: '100%', maxWidth: '400px' }}>
                <LikedCat cat={pets.acorn} />
              </Box>
            )}
            {!pets.bear && !pets.acorn && (
              <Typography 
                variant="h6" 
                sx={{ 
                  textAlign: 'center',
                  color: 'text.secondary',
                  py: 8
                }}
              >
                No saved pets yet. When you save a pet, they will appear here.
              </Typography>
            )}
*/