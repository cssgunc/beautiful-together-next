'use client';

import React, { useState, useEffect } from 'react';
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

const PetCard = ({ pet, onPass, onAdopt }) => {
  const defaultImage = '/default-pet-image.jpg';
  const [imgSrc, setImgSrc] = useState(defaultImage);

  // Reset and load new image when pet changes
  useEffect(() => {
    if (pet && pet.image) {
      setImgSrc(pet.image);
    } else {
      setImgSrc(defaultImage);
    }
  }, [pet]);

  const handleImageError = () => {
    setImgSrc(defaultImage);
  };

  return (
    <Card sx={{ width: '100%', bgcolor: '#FFFFFF', borderRadius: '16px', overflow: 'hidden' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="300"
          image={imgSrc}
          alt={pet.name}
          onError={handleImageError}
          sx={{ 
            objectFit: 'cover',
            width: '100%',
            height: '300px', // Fixed height
            backgroundColor: '#f0f0f0', // Light gray background while loading
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'rgba(76, 175, 80, 0.9)',
            color: 'white',
            padding: '8px 16px',
            backdropFilter: 'blur(4px)', // Add slight blur to the overlay
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
          {pet.traits && pet.traits.map((trait, index) => {
            const IconComponent = iconMap[trait.icon];
            return IconComponent ? (
              <Grid item key={index}>
                <Chip 
                  icon={<IconComponent style={{ color: '#f4900c' }} />} 
                  label={trait.text} 
                  size="small"
                  sx={{
                    '& .MuiChip-icon': {
                      color: '#f4900c',
                    },
                    maxWidth: '100%',
                    '& .MuiChip-label': {
                      whiteSpace: 'normal',
                      overflow: 'visible',
                    },
                  }}
                />
              </Grid>
            ) : null;
          })}
        </Grid>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            minHeight: '60px',
            overflow: 'auto',
            maxHeight: '120px', // Limit the height of the summary
          }}
        >
          {pet.summary}
        </Typography>
      </CardContent>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        p: 2,
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        backgroundColor: '#fafafa', // Light gray background for button area
      }}>
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<Close />}
          onClick={onPass}
          sx={{
            minWidth: '120px',
            '&:hover': {
              backgroundColor: '#d32f2f',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Pass
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          endIcon={<Favorite sx={{ color: 'white' }} />}
          onClick={onAdopt}
          sx={{ 
            color: 'white',
            minWidth: '120px',
            '&:hover': {
              backgroundColor: '#388e3c',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Adopt
        </Button>
      </Box>
    </Card>
  );
};

PetCard.defaultProps = {
  pet: {
    name: 'Unknown',
    age: 'Unknown',
    image: '/default-pet-image.jpg',
    traits: [],
    summary: 'No information available.',
  },
  onPass: () => console.log('Pass clicked'),
  onAdopt: () => console.log('Adopt clicked'),
};

export default PetCard;