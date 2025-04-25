"use client";
import React, { useState } from "react";
import { Chip, Grid, Stack, Box, Typography, IconButton, Button } from "@mui/material";
import {
  Pets,
  Male,
  Female,
  Cake,
  Palette,
  Battery0Bar,
  Close,
  ChildCare,
  House,
  LocationOn,
  School
} from "@mui/icons-material";
import { LikedPetCard } from "./LikedPetCard";
import { removeAnimal } from "../savedPetsCookie/savedPetsCookie";

const LikedCat = ({ cat, onRemove }) => {
  const [expanded, setExpanded] = useState(false);

  // Handle removing the pet
  const handleRemovePet = () => {
    removeAnimal(cat.id); // Remove from cookies
    if (onRemove) {
      onRemove(cat.id); // Notify the parent to update the UI
    }
  };

  // Toggle expanded description
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Create a detailed description for the cat
  const generateDescription = () => {
    let description = `${cat.name} is a ${cat.tags?.Age?.toLowerCase() || "wonderful"} ${cat.tags?.Breed || "cat"} `;
    
    if (cat.tags?.Color) {
      description += `with a beautiful ${cat.tags.Color.toLowerCase()} coat. `;
    }
    
    if (cat.tags?.["Energy Level"]) {
      description += `${cat.name} has a ${cat.tags["Energy Level"].toLowerCase()} energy level. `;
    }
    
    if (cat.tags?.["Good with Kids"]) {
      description += `${cat.name} is ${cat.tags["Good with Kids"].toLowerCase()} with kids. `;
    }
    
    if (cat.tags?.["Good with Dogs"]) {
      description += `${cat.name} is ${cat.tags["Good with Dogs"].toLowerCase()} with dogs. `;
    }
    
    if (cat.tags?.["Good with Cats"]) {
      description += `${cat.name} is ${cat.tags["Good with Cats"].toLowerCase()} with other cats. `;
    }
    
    if (cat.tags?.["Litterbox Trained"]) {
      description += `${cat.name} is ${cat.tags["Litterbox Trained"].toLowerCase()} litterbox trained. `;
    }
    
    description += `${cat.name} is looking for a loving forever home where ${cat.tags?.Gender === "Male" ? "he" : "she"} can thrive and be part of a caring family.`;
    
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
    <LikedPetCard pet={cat} sx={{ 
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
        onClick={handleRemovePet} // Call the remove function on click
        sx={{
          position: "absolute", // Position it absolutely inside the card
          top: "10px", // 10px from the top
          right: "10px", // 10px from the right
          backgroundColor: "white",
          borderRadius: "50%", // Circular button
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional shadow
          zIndex: 10 // Ensure it's above other elements
        }}
      >
        <Close sx={{ color: "secondary.main" }} /> {/* Close icon */}
      </IconButton>

      {/* Pet traits grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 2,
          gridAutoFlow: "dense", // Moves elements up to fill gaps
          mb: 2 // Margin bottom for spacing between grid and description
        }}
      >
        <Chip
          icon={<Pets style={{ color: "#f4900c" }} />}
          label={cat.tags.Breed}
          size="small"
        />
        
        <Chip
          icon={cat.tags.Gender === "Male" ? 
            <Male style={{ color: "#f4900c" }} /> : 
            <Female style={{ color: "#f4900c" }} />
          }
          label={cat.tags.Gender}
          size="small"
        />
        
        {cat.tags.Age && (
          <Chip
            icon={<Cake style={{ color: "#f4900c" }} />}
            label={cat.tags.Age}
            size="small"
          />
        )}

        {cat.tags.Color && (
          <Chip
            icon={<Palette style={{ color: "#f4900c" }} />}
            label={cat.tags.Color}
            size="small"
          />
        )}
      
        {cat.tags["Energy Level"] && (
          <Chip
            icon={<Battery0Bar style={{ color: "#f4900c" }} />}
            label={cat.tags["Energy Level"]}
            size="small"
          />
        )}
        
        {cat.tags["Litterbox Trained"] && (
          <Chip
            icon={<School style={{ color: "#f4900c" }} />}
            label={cat.tags["Litterbox Trained"]}
            size="small"
          />
        )}
        
        {cat.tags["Good with Kids"] && (
          <Chip
            icon={<ChildCare style={{ color: "#f4900c" }} />}
            label={cat.tags["Good with Kids"]}
            size="small"
          />
        )}
        
        {cat.tags["Good with Dogs"] && (
          <Chip
            icon={<Pets style={{ color: "#f4900c" }} />}
            label={cat.tags["Good with Dogs"]}
            size="small"
          />
        )}
        
        {cat.tags["Good with Cats"] && (
          <Chip
            icon={<Pets style={{ color: "#f4900c" }} />}
            label={cat.tags["Good with Cats"]}
            size="small"
          />
        )}
        
        {cat.tags.State && (
          <Chip
            icon={<LocationOn style={{ color: "#f4900c" }} />}
            label={cat.tags.State}
            size="small"
          />
        )}
        
        {cat.tags["Litter Name"] && (
          <Chip
            icon={<House style={{ color: "#f4900c" }} />}
            label={cat.tags["Litter Name"]}
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

export default LikedCat;