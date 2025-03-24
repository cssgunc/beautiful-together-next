"use client";
import React from "react";
import { Grid, Stack, Box, Typography, IconButton } from "@mui/material";
import {
  PetsOutlined,
  Male,
  Female,
  CakeOutlined,
  ColorLensOutlined,
  ChargingStationOutlined,
  Close,
} from "@mui/icons-material";
import { LikedPetCard } from "./LikedPetCard";
import { removeAnimal } from "../savedPetsCookie/savedPetsCookie";

const LikedCat = ({ cat, onRemove }) => {
  // Handle removing the pet
  const handleRemovePet = () => {
    removeAnimal(cat.id); // Remove from cookies
    if (onRemove) {
      onRemove(cat.id); // Notify the parent to update the UI
    }
  };

  return (
    <LikedPetCard pet={cat} sx={{ position: "relative" }}>
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
        }}
      >
        <Close sx={{ color: "secondary.main" }} /> {/* Close icon */}
      </IconButton>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PetsOutlined sx={{ color: "secondary.main" }} />
              <Typography variant="body2">{cat.tags.Breed}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {cat.sex === "Male" ? (
                <Male sx={{ color: "secondary.main" }} />
              ) : (
                <Female sx={{ color: "secondary.main" }} />
              )}
              <Typography variant="body2">{cat.tags.Gender}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CakeOutlined sx={{ color: "secondary.main" }} />
              <Typography variant="body2">{cat.tags.Age}</Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2} alignItems="flex-end">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ColorLensOutlined sx={{ color: "secondary.main" }} />
              <Typography variant="body2">{cat.tags.Color}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ChargingStationOutlined sx={{ color: "secondary.main" }} />
              <Typography variant="body2">
                {cat.tags["Energy Level"]}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PetsOutlined sx={{ color: "secondary.main" }} />
              <Typography variant="body2">{cat.tags.litter}</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </LikedPetCard>
  );
};

export default LikedCat;
