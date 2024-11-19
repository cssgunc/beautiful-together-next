'use client';
import React from 'react';
import { Grid, Stack, Box, Typography } from '@mui/material';
import { 
  PetsOutlined, 
  Male, 
  Female, 
  CakeOutlined, 
  ColorLensOutlined,
  ChargingStationOutlined
} from '@mui/icons-material';
import { LikedPetCard } from './LikedPetCard';

const LikedCat = ({ cat }) => {
  return (
    <LikedPetCard pet={cat}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PetsOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{cat.tags.Breed}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {cat.sex === "Male" ? (
                <Male sx={{ color: 'secondary.main' }} />
              ) : (
                <Female sx={{ color: 'secondary.main' }} />
              )}
              <Typography variant="body2">{cat.tags.Gender}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CakeOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{cat.tags.Age}</Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2} alignItems="flex-end">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ColorLensOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{cat.tags.Color}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChargingStationOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{cat.tags["Energy Level"]}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PetsOutlined sx={{ color: 'secondary.main' }} />
              <Typography variant="body2">{cat.tags.litter}</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </LikedPetCard>
  );
};

export default LikedCat;