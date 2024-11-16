'use client';
import React from 'react';
import { Grid, Stack, Box, Typography } from '@mui/material';
import { 
  PetsOutlined, 
  Male, 
  Female, 
  CakeOutlined, 
  ScaleOutlined, 
  ColorLensOutlined,
  ChildFriendlyOutlined,
  ChargingStationOutlined
} from '@mui/icons-material';
import { LikedPetCard } from './LikedPetCard';

const LikedDog = ({ dog }) => {
  return (
    <LikedPetCard pet={dog}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PetsOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.breed}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {dog.sex === "Male" ? (
                <Male sx={{ color: 'secondary.main' }} />
              ) : (
                <Female sx={{ color: 'secondary.main' }} />
              )}
              <Typography variant="body2">{dog.sex}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CakeOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.age}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ScaleOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.weight}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ColorLensOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.color}</Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2} alignItems="flex-end">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChildFriendlyOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.kids}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PetsOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.dogs}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PetsOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.cats}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChargingStationOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{dog.temperament}</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </LikedPetCard>
  );
};

export default LikedDog;