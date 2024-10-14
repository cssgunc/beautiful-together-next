'use client';

import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Grid, 
  Box, 
  Chip,
  Typography
} from '@mui/material';
import { Favorite, Close, Male, Cake, Scale, Palette, ChildCare, Pets } from '@mui/icons-material';

const iconMap = {
  Pets,
  Male,
  Cake,
  Scale,
  Palette,
  ChildCare,
};

const PetCard = ({ pet }) => (
  <Card sx={{ width: '100%', bgcolor: '#FFFFFF', borderRadius: '16px', overflow: 'hidden' }}>
    <Box sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        height="300"
        image={pet.image}
        alt={pet.name}
        sx={{ objectFit: 'cover' }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'rgba(76, 175, 80, 0.9)', // Slightly transparent green
          color: 'white',
          padding: '8px 16px',
        }}
      >
        <Typography variant="h6" component="span">
          {pet.name}
        </Typography>
        <Typography variant="h6" component="span" sx={{ ml: 1 }}>
          {pet.age}
        </Typography>
      </Box>
    </Box>
    <CardContent>
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {pet.traits.map((trait, index) => {
          const IconComponent = iconMap[trait.icon];
          return (
            <Grid item key={index}>
              <Chip 
                icon={<IconComponent style={{ color: '#f4900c' }} />} 
                label={trait.text} 
                size="small"
                sx={{
                  '& .MuiChip-icon': {
                    color: '#f4900c',
                  },
                }}
              />
            </Grid>
          );
        })}
      </Grid>
      <Typography variant="body2" color="text.secondary">
        {pet.summary}
      </Typography>
    </CardContent>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
      <Button variant="contained" color="secondary" startIcon={<Close />}>
        Pass
      </Button>
      <Button variant="contained" color="primary" endIcon={<Favorite />}>
        Adopt
      </Button>
    </Box>
  </Card>
);

export default PetCard;