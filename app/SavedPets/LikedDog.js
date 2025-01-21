'use client';
import React from 'react';
import { Grid, Stack, Box, Typography, IconButton } from '@mui/material';
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

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PetsOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.tags.breed}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {dog.sex === "Male" ? (
                <Male sx={{ color: 'secondary.main' }} />
              ) : (
                <Female sx={{ color: 'secondary.main' }} />
              )}
              <Typography variant="body2">{dog.tags.Gender}</Typography>
            </Box>
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
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2} alignItems="flex-end">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChildFriendlyOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.tags.kids}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PetsOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.tags.dogs}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PetsOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.tags["Good With Cats?"]}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChargingStationOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.tags.temperament}</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </LikedPetCard>
  );
};

export default LikedDog;