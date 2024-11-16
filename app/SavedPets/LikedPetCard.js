'use client';
import React from 'react';
import { 
  Card, 
  Box, 
  CardMedia, 
  Typography, 
  IconButton, 
  Button,
  CardContent
} from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

export const LikedPetCard = ({ pet, children }) => {
  const [currentPic, setCurrentPic] = React.useState(0);
  const numpics = pet.images.length;

  const prevPic = () => {
    setCurrentPic((currentPic - 1 + numpics) % numpics);
  };

  const nextPic = () => {
    setCurrentPic((currentPic + 1) % numpics);
  };

  return (
    <Card sx={{ 
      width: '90%',
      maxWidth: '400px',
      borderRadius: '16px',
      bgcolor: '#FFFFFF',
      overflow: 'hidden',
      boxShadow: 3
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="300"
          image={pet.images[currentPic]}
          alt={pet.name}
          sx={{ objectFit: 'cover' }}
        />
        <Box sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2
        }}>
          <IconButton 
            onClick={prevPic}
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.8)' }
            }}
          >
            <NavigateBefore />
          </IconButton>
          <IconButton 
            onClick={nextPic}
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.8)' }
            }}
          >
            <NavigateNext />
          </IconButton>
        </Box>
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'rgba(76, 175, 80, 0.9)',
          color: 'white',
          padding: '8px 16px',
        }}>
          <Typography variant="h6" component="span">
            {pet.name}
          </Typography>
        </Box>
      </Box>
      <CardContent>
        {children}
      </CardContent>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        p: 2,
        gap: 2
      }}>
        <Button 
          variant="contained" 
          color="secondary" 
          fullWidth
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            color: 'white'
          }}
        >
          More Information
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            color: 'white'
          }}
        >
          Adopt {pet.name}!
        </Button>
      </Box>
    </Card>
  );
};