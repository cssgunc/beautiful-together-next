'use client'
import React from 'react';
import { useState, useEffect } from 'react';

import { 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Grid, 
  Box, 
  Chip,
  Typography,
} from '@mui/material';
import { Favorite, Close, Male, Cake, Scale, Palette, ChildCare, Pets, Battery0Bar, LocationOn, School, FamilyHome, House} from '@mui/icons-material';

/*
const iconMap = {
  Pets,
  Male,
  Cake,
  Scale,
  Palette,
  ChildCare,
};
*/

const iconMap = {
  "Age" : Cake,
  "Breed" : Pets,
  "Color" : Palette,
  "Energy Level" : Battery0Bar,
  "Gender" : Male,
  "Litterbox Trained?" : School,
  "State" : LocationOn,
  "Weight": Scale,
  "Good With Cats?": Pets,
  "Is Cat DeClawed?": Pets,
  "Litter Name": FamilyHome,
  "Good With Kids?" : ChildCare,
  "Foster": House,
  "Good With Dogs?" : Pets,
  "Good With Livestock?": Pets 
};


const PetCard = ({ pet, adopt, pass}) => {
  const [animation, setAnimation] = useState(''); // Track animation type

  const handleSwipe = (direction) => {
    setAnimation(direction);
    if (direction === 'swipe-left') pass();
    if (direction === 'swipe-right') adopt();
    setTimeout(() => {
      setAnimation(''); 
 
    }, 500); 

  };

  


  return (
      <Card sx={{ width: '100%', bgcolor: '#FFFFFF', borderRadius: '16px', overflow: 'hidden',
        transition: animation == 'swipe-left' || animation == 'swipe-right' ? 'transform 0.4s ease, opacity 0.2s ease' : 'opacity 0.2s ease', 
        transform: animation === 'swipe-left' ? 'translateX(-100%)' : animation === 'swipe-right' ? 'translateX(100%)' : 'translateX(0)',
        opacity: animation == 'reversing' ? 0 : animation ? 0 : 1, 
        zIndex: animation ? 2 : 1
      }}>
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
            {Object.entries(pet.tags).map(([key, value]) => {
              const IconComponent = (iconMap[key] != undefined) ? iconMap[key] : Pets;
              return (
                <Grid item key={key}>
                  <Chip 
                    icon={<IconComponent style={{ color: '#f4900c' }} />} 
                    label={value} 
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
          <Button onClick = {() => handleSwipe('swipe-left')} variant="contained" color="secondary" startIcon={<Close />}>
            Pass
          </Button>
          <Button 
            onClick={() => handleSwipe('swipe-right')}
            variant="contained" 
            color="primary" 
            endIcon={<Favorite sx={{ color: 'white' }} />} // Add white color to icon
            sx={{ 
              color: 'white' // Add white color to text
            }}
          >
            Like
          </Button>
        </Box>
      </Card>
    );
}

export default PetCard;