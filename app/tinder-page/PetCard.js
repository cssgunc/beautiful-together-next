"use client";
import React, { useState, useEffect } from "react";
import { saveAnimal} from '../savedPetsCookie/savedPetsCookie';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import {
  Favorite,
  Close,
  Male,
  Cake,
  Scale,
  Palette,
  ChildCare,
  Pets,
  Battery0Bar,
  LocationOn,
  School,
  FamilyHome,
  House,
} from "@mui/icons-material";

// Map icons to traits
const iconMap = {
  Age: Cake,
  Breed: Pets,
  Color: Palette,
  "Energy Level": Battery0Bar,
  Gender: Male,
  "Litterbox Trained?": School,
  State: LocationOn,
  Weight: Scale,
  "Good With Cats?": Pets,
  "Is Cat DeClawed?": Pets,
  "Litter Name": House,
  "Good With Kids?": ChildCare,
  Foster: House,
  "Good With Dogs?": Pets,
  "Good With Livestock?": Pets,
};

const defaultImage =
  "https://beautifultogethersanctuary.com/wp-content/uploads/2023/09/btogether-new-sanctuary-286x116-1.png";

const PetCard = ({ petsQueue, adoptNotification }) => {
  const [currentPet, setCurrentPet] = useState(petsQueue[0]);
  const [animation, setAnimation] = useState(""); // Track animation type
  const [index, setIndex] = useState(0);

  // Handle pet swipe (pass/adopt)
  const handleSwipe = (direction) => {
    setAnimation(direction);
    setTimeout(() => {
      // Update the pet after the animation
      if (direction === "swipe-left") {
        handlePass();
      }
      if (direction === "swipe-right") {
        handleAdopt();
      }
      setAnimation(""); // Reset animation after swipe
    }, 500); // Wait for the animation to finish
  };

  const handleAdopt = () => {
    if (index + 1 < petsQueue.length) {
      adoptNotification(petsQueue[index].name)
      saveAnimal(petsQueue[index].id) //add id to cookie
      setIndex(index + 1); // Move to the next pe
      console.log("Adopted pet!");
      
    }
  };

  // Function to simulate the pass action
  const handlePass = () => {
    if (index + 1 < petsQueue.length) {
      setIndex(index + 1); // Move to the next pet
      console.log("Passed on pet");
    }
  };

  // Transform pet data to match PetCard format
  const transformPetData = (pet) => {
    if (!pet) return null;

    const traits = [];
    if (pet.tags) {
      if (pet.tags.Breed) traits.push({ icon: "Pets", text: pet.tags.Breed });
      if (pet.tags.Gender) traits.push({ icon: "Male", text: pet.tags.Gender });
      if (pet.tags.Age)
        traits.push({ icon: "Cake", text: pet.tags.Age.split("-")[0].trim() });
      if (pet.tags.Weight)
        traits.push({ icon: "Scale", text: pet.tags.Weight });
      if (pet.tags.Color)
        traits.push({ icon: "Palette", text: pet.tags.Color });
      if (pet.tags["Good with Kids"]) {
        traits.push({ icon: "ChildCare", text: pet.tags["Good with Kids"] });
      }
    }

    let imageUrl = defaultImage;
    if (pet.images && pet.images.length > 0 && pet.images[0]) {
      imageUrl = pet.images[0].startsWith("http")
        ? pet.images[0]
        : `${pet.images[0]}`;
    }

    return {
      id: pet.id,
      name: pet.name || "Unknown",
      age: pet.tags?.Age ? pet.tags.Age.split("(")[0].trim() : "Unknown",
      image: imageUrl,
      traits,
      summary: pet.tags?.["Energy Level"]
        ? `${pet.name} is ${pet.tags["Energy Level"].toLowerCase()}. ${
            pet.tags.Breed ? `This lovely ${pet.tags.Breed}` : "This pet"
          } is looking for a forever home!`
        : `Meet ${pet.name}! A lovely ${
            pet.tags?.Breed || "pet"
          } looking for a forever home.`,
    };
  };

  useEffect(() => {
    setCurrentPet(transformPetData(petsQueue[index]));
  }, [index]);

  return (
    <Card
      sx={{
        width: "100%",
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        overflow: "hidden",
        transition:
          animation == "swipe-left" || animation == "swipe-right"
            ? "transform 0.4s ease, opacity 0.2s ease"
            : "opacity 0.2s ease",
        transform:
          animation === "swipe-left"
            ? "translateX(-100%)"
            : animation === "swipe-right"
            ? "translateX(100%)"
            : "translateX(0)",
        opacity: animation == "reversing" ? 0 : animation ? 0 : 1,
        zIndex: animation ? 2 : 1,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="300"
          image={currentPet.image}
          alt={currentPet.name}
          sx={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "rgba(76, 175, 80, 0.9)", // Slightly transparent green
            color: "white",
            padding: "8px 16px",
          }}
        >
          <Typography variant="h6" component="span">
            {currentPet.name}
          </Typography>
          
        </Box>
      </Box>
      <CardContent>
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {Array.isArray(currentPet.traits) &&
            currentPet.traits.map((trait, index) => {
              const IconComponent = iconMap[trait.icon] || Pets;
              return (
                <Grid item key={index}>
                  <Chip
                    icon={<IconComponent style={{ color: "#f4900c" }} />}
                    label={trait.text}
                    size="small"
                    sx={{
                      "& .MuiChip-icon": {
                        color: "#f4900c",
                      },
                    }}
                  />
                </Grid>
              );
            })}
        </Grid>

        <Typography variant="body2" color="text.secondary">
          {currentPet.summary}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Button
          onClick={() => handleSwipe("swipe-left")}
          variant="contained"
          color="secondary"
          startIcon={<Close />}
        >
          Pass
        </Button>
        <Button
          onClick={() => handleSwipe("swipe-right")}
          variant="contained"
          color="primary"
          endIcon={<Favorite sx={{ color: "white" }} />} // Add white color to icon
          sx={{
            color: "white", // Add white color to text
          }}
        >
          Like
        </Button>
      </Box>
    </Card>
  );
};

export default PetCard;
