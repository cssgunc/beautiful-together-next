import React, { useState, useEffect } from "react";
import { saveAnimal } from "../savedPetsCookie/savedPetsCookie";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
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
  Female,
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
  NavigateBefore, 
  NavigateNext
} from "@mui/icons-material";

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


  // Handle logic for picture carousel 
  const[currentPic, setCurrentPic] = useState(0);
  const numpics = currentPet?.images?.length ?? 1;

  const prevPic = () => {
    const newIndex = (currentPic - 1 + numpics) % numpics;
    console.log(`Moving from image ${currentPic} to ${newIndex}`);
    console.log(`Current images array:`, currentPet.images);
    setCurrentPic(newIndex);
  };

  const nextPic = () => {
    const newIndex = (currentPic + 1) % numpics;
    console.log(`Moving from image ${currentPic} to ${newIndex}`);
    console.log(`Current images array:`, currentPet.images);
    setCurrentPic(newIndex);
  };


  const handleSwipe = (direction) => {
    setAnimation(direction);
    setTimeout(() => {
      if (direction === "swipe-left") {
        handlePass();
      }
      if (direction === "swipe-right") {
        handleAdopt();
      }
      setAnimation("");
    }, 500);
  };

  const handleAdopt = () => {
    if (index < petsQueue.length) {
      adoptNotification(petsQueue[index].name);
      saveAnimal(petsQueue[index].id);
      setIndex(index + 1);
    }
  };

  const handlePass = () => {
    if (index < petsQueue.length) {
      setIndex(index + 1);
    }
  };

  const transformPetData = (pet) => {
    if (!pet) return null;

    console.log("current pet data: ", pet)

    const traits = [];
    if (pet.tags) {
      if (pet.tags.Breed) traits.push({ icon: Pets, text: pet.tags.Breed });
      if (pet.tags.Gender && pet.tags.Gender == 'Male') traits.push({ icon: Male, text: pet.tags.Gender });
      if (pet.tags.Gender && pet.tags.Gender == 'Female') traits.push({ icon: Female, text: pet.tags.Gender });
      if (pet.tags.Age)
        traits.push({ icon: Cake, text: pet.tags.Age.split("-")[0].trim() });
      if (pet.tags.Weight)
        traits.push({ icon: Scale, text: pet.tags.Weight });
      if (pet.tags.Color)
        traits.push({ icon: Palette, text: pet.tags.Color });
      if (pet.tags["Good with Kids"]) {
        traits.push({ icon: ChildCare, text: pet.tags["Good with Kids"] });
      }
    }

    const images = pet.images && pet.images.length > 0
    ? pet.images.map((img) =>
        img.startsWith("http") ? img : `${img}`
      )
    : [defaultImage];



    return {
      id: pet.id,
      name: pet.name || "Unknown",
      age: pet.tags?.Age ? pet.tags.Age.split("(")[0].trim() : "Unknown",
      images,
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

  const isQueueExhausted = index >= petsQueue.length;
  const transformedPet = isQueueExhausted ? null : transformPetData(petsQueue[index]);
  const restartPets = () => {
    setIndex(0);
  }  

  useEffect(() => {
    setCurrentPet(transformPetData(petsQueue[index]));
    console.log("JSON: " + JSON.stringify(currentPet));
    // Reset current picture index when moving to a new pet
    setCurrentPic(0);
  }, [index, petsQueue]);

  if (isQueueExhausted) {
    return (
      <Card
        sx={{
          width: "100%",
          height: "83vh",
          bgcolor: "#f8f8f8",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 4,
        }}
      >
        <Box>
          <Typography variant="h5" gutterBottom>
            You’ve run out of pets!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Adjust your preferences or come back later if you want to see more.
          </Typography>
          <Button
          variant="contained"
          color="primary"
          onClick={restartPets}
          sx={{ mt: 4 }}
        >
          See Pets Again
        </Button>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        width: "100%",
        height: "83vh", 
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", 
        transition:
          animation === "swipe-left" || animation === "swipe-right"
            ? "transform 0.4s ease, opacity 0.2s ease"
            : "opacity 0.2s ease",
        transform:
          animation === "swipe-left"
            ? "translateX(-100%)"
            : animation === "swipe-right"
            ? "translateX(100%)"
            : "translateX(0)",
        opacity: animation ? 0 : 1,
        zIndex: animation ? 2 : 1,
      }}
    >
      {/* Pet Image Section */}
      <Box sx={{ position: "relative", height: "400px" }}> 
        <CardMedia
          component="img"
          image={currentPet?.images?.[currentPic] ?? defaultImage}
          alt={currentPet?.name}
          onError={(e) => {
            console.error(`Failed to load image at index ${currentPic}:`, e);
            // Set fallback image
            e.target.src = defaultImage;
          }}
          sx={{ 
            objectFit: "contain",
            backgroundColor: "#000000",
            height: "100%", 
            width: "100%"   
          }}
        />

        {/* Only show navigation arrows if there is more than one image */}
        {numpics > 1 && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
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
        )}
        
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "rgba(76, 175, 80, 0.9)",
            color: "white",
            padding: "8px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography variant="h6" component="span">
            {currentPet?.name}
          </Typography>
          {numpics > 1 && (
            <Typography variant="body2">
              {currentPic + 1} / {numpics}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Card Content Section */}
      <CardContent sx={{ flex: 1, overflow: "hidden" }}>
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {Array.isArray(currentPet?.traits) &&
            currentPet.traits.map((trait, index) => {
              console.log("current trait:" , trait)
              const IconComponent = trait.icon || Pets;
              return (
                <Grid item key={index}>
                  <Chip
                    icon={<IconComponent style={{ color: "#f4900c" }} />}
                    label={trait.text}
                    size="small"
                  />
                </Grid>
              );
            })}
        </Grid>
        <Typography variant="body2" color="text.secondary">
          {currentPet?.summary}
        </Typography>
      </CardContent>

      {/* Buttons Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
          borderTop: "1px solid #e0e0e0", 
        }}
      >
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
          endIcon={<Favorite sx={{ color: "white" }} />}
          sx={{ color: "white" }}
        >
          Like
        </Button>
      </Box>
    </Card>
  );
};

export default PetCard;