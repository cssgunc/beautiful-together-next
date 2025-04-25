'use client';
'use client';
import React, { useState } from 'react';
import { Chip, Grid, Stack, Box, Typography, IconButton, Button } from '@mui/material';
import { 
  Pets, 
  Male, 
  Female, 
  Cake, 
  Scale, 
  Palette,
  ChildCare,
  Battery0Bar,
  Close,
  LocationOn,
  House,
} from "@mui/icons-material";
import { LikedPetCard } from "./LikedPetCard";
import { removeAnimal } from "../savedPetsCookie/savedPetsCookie";

const LikedDog = ({ dog, onRemove }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Handle removing the pet
  const handleRemovePet = () => {
    removeAnimal(dog.id); // Remove the pet from the saved list (cookies)
    if (onRemove) {
      onRemove(dog.id); // Notify the parent component
    }
  };
  
  // Toggle expanded description
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Create a detailed description for the dog
  const generateDescription = () => {
    let description = `${dog.name} is a ${dog.tags?.Age?.toLowerCase() || "wonderful"} ${dog.tags?.Breed || "dog"} `;
    
    if (dog.tags?.Color) {
      description += `with a beautiful ${dog.tags.Color.toLowerCase()} coat. `;
    }
    
    if (dog.tags?.temperament) {
      description += `${dog.name} has a ${dog.tags.temperament.toLowerCase()} temperament. `;
    }
    
    if (dog.tags?.kids) {
      description += `${dog.name} is ${dog.tags.kids.toLowerCase()} with kids. `;
    }
    
    if (dog.tags?.dogs) {
      description += `${dog.name} is ${dog.tags.dogs.toLowerCase()} with other dogs. `;
    }
    
    if (dog.tags?.["Good With Cats?"]) {
      description += `${dog.name} is ${dog.tags["Good With Cats?"].toLowerCase()} with cats. `;
    }
    
    description += `${dog.name} is looking for a loving forever home where ${dog.tags?.Gender === "Male" ? "he" : "she"} can thrive and be part of a caring family.`;
    
    return description;
  };
  
  // Function to truncate text with ellipsis
  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  const description = generateDescription();
  const shouldShowReadMore = description.length > 100;

  return (
    <LikedPetCard pet={dog} sx={{ 
      position: "relative",
      width: "100%",
      height: "83vh",
      bgcolor: "#FFFFFF",
      borderRadius: "16px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      {/* The remove button */}
      <IconButton
        onClick={handleRemovePet}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "white",
          borderRadius: "50%",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          zIndex: 10
        }}
      >
        <Close sx={{ color: "secondary.main" }} />
      </IconButton>

      {/* Pet traits grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 2,
          gridAutoFlow: "dense",
          mb: 2
        }}
      >
        <Chip
          icon={<Pets style={{ color: "#f4900c" }} />}
          label={dog.tags.Breed}
          size="small"
        />
        
        <Chip
          icon={dog.tags.Gender === "Male" ? 
            <Male style={{ color: "#f4900c" }} /> : 
            <Female style={{ color: "#f4900c" }} />
          }
          label={dog.tags.Gender}
          size="small"
        />

        <Chip
          icon={<Cake style={{ color: "#f4900c" }} />}
          label={dog.tags.Age}
          size="small"
        />
   
        <Chip
          icon={<Scale style={{ color: "#f4900c" }} />}
          label={dog.tags.Weight}
          size="small"
        />
       
        <Chip
          icon={<Palette style={{ color: "#f4900c" }} />}
          label={dog.tags.Color}
          size="small"
        />
       
        {dog.tags.kids && (
          <Chip
            icon={<ChildCare style={{ color: "#f4900c" }} />}
            label={dog.tags.kids}
            size="small"
          />
        )}
      
        {dog.tags.dogs && (
          <Chip
            icon={<Pets style={{ color: "#f4900c" }} />}
            label={dog.tags.dogs}
            size="small"
          />
        )}
       
        {dog.tags["Good With Cats?"] && (
          <Chip
            icon={<Pets style={{ color: "#f4900c" }} />}
            label={dog.tags["Good With Cats?"]}
            size="small"
          />
        )}
        
        {dog.tags.temperament && (
          <Chip
            icon={<Battery0Bar style={{ color: "#f4900c" }} />}
            label={dog.tags.temperament}
            size="small"
          />
        )}
        
        {dog.tags.State && (
          <Chip
            icon={<LocationOn style={{ color: "#f4900c" }} />}
            label={dog.tags.State}
            size="small"
          />
        )}
        
        {dog.tags.Foster && (
          <Chip
            icon={<House style={{ color: "#f4900c" }} />}
            label={dog.tags.Foster}
            size="small"
          />
        )}
      </Box>
      
      {/* Description with Read More functionality */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {expanded ? description : truncateText(description, 100)}
        </Typography>
        
        {shouldShowReadMore && (
          <Button 
            onClick={toggleExpanded} 
            size="small" 
            sx={{ mt: 1, p: 0, minWidth: 'auto', color: '#4caf50', textTransform: 'none' }}
          >
            {expanded ? 'Read Less' : 'Read More'}
          </Button>
        )}
      </Box>
    </LikedPetCard>
  );
};

export default LikedDog;