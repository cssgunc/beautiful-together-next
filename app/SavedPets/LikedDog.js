'use client';
import React from 'react';
import { Grid, Grid2, Stack, Box, Typography, IconButton } from '@mui/material';
import { 
  PetsOutlined, 
  Male, 
  Female, 
  CakeOutlined, 
  ScaleOutlined, 
  ColorLensOutlined,
  ChildFriendlyOutlined,
  ChargingStationOutlined,
  Close
} from '@mui/icons-material';
import { LikedPetCard } from './LikedPetCard';
import { removeAnimal } from '../savedPetsCookie/savedPetsCookie';

const LikedDog = ({ dog, onRemove}) => {
  // Handle removing the pet
  const handleRemovePet = () => {
    removeAnimal(dog.id);  // Remove the pet from the saved list (cookies)
    if (onRemove) {
      onRemove(dog.id); // Notify the parent component
    }
    };
  return (
    <LikedPetCard pet={dog} sx={{ position: 'relative' }}>
      {/* The remove button */}
      <IconButton
        onClick={handleRemovePet} // Call the remove function on click
        sx={{
          position: 'absolute',  // Position it absolutely inside the card
          top: '10px',  // 10px from the top
          right: '10px',  // 10px from the right
          backgroundColor: 'white',
          borderRadius: '50%',  // Circular button
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional shadow
        }}
      >
        <Close sx={{ color: 'secondary.main' }} /> {/* Close icon */}
      </IconButton>


       <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 2,
              gridAutoFlow: "dense", // Moves elements up to fill gaps
            }}
            >

<Grid2 item>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PetsOutlined sx={{ color: 'secondary.main' }} />
                <Typography variant="body2">{dog.tags.Breed}</Typography>
          </Box>
          
        </Grid2>
        <Grid2 item>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {dog.tags.Gender === "Male" ? (
                  <Male sx={{ color: 'secondary.main' }} />
                ) : (
                  <Female sx={{ color: 'secondary.main' }} />
                )}
                <Typography variant="body2">{dog.tags.Gender}</Typography>
          </Box>
        </Grid2>


          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CakeOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.tags.Age}</Typography>
          </Box>
   


          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScaleOutlined sx={{ color: 'secondary.main' }} />
                <Typography variant="body2">{dog.tags.Weight}</Typography>
          </Box>


       
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ColorLensOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.tags.Color}</Typography>
          </Box>
       

        {
            dog.tags.kids && 

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ChildFriendlyOutlined sx={{ color: 'secondary.main' }} />
                <Typography variant="body2">{dog.tags.kids}</Typography>
              </Box>
         
        }
      
        {
          dog.tags.dogs && 
   
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PetsOutlined sx={{ color: 'secondary.main' }} />
                  <Typography variant="body2">{dog.tags.dogs}</Typography>
            </Box>

        }
       
       { dog.tags["Good With Cats?"] && 
  
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PetsOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.tags["Good With Cats?"]}</Typography>
          </Box>
  
        }
        
      { dog.tags.temperament && 

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ChargingStationOutlined sx={{ color: 'secondary.main' }} />
                <Typography variant="body2">{dog.tags.temperament}</Typography>
            </Box>
 
      }
            </Box>
    
        
    </LikedPetCard>
  );
};

export default LikedDog;