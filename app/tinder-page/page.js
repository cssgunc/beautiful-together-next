// app/tinder-page/page.js
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Card, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PetCard from "./PetCard";
import { petsData, petsData2 } from "./petsData";
import { fetchPetData } from "../fetchPetData/fetchPetData";
import Notification from "./Notification";
import Navbar from "../navbar/navbar";
import {getSavedAnimals } from '../savedPetsCookie/savedPetsCookie';

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#f44336",
    },
    background: {
      default: "#F8F6F3",
    },
  },
});
const defaultImage =
  "https://beautifultogethersanctuary.com/wp-content/uploads/2023/09/btogether-new-sanctuary-286x116-1.png";

export default function Home() {
  const petsQueue = JSON.parse(localStorage.getItem("pet-data")).data;
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Load pet data once on initial render
  const adoptNotification = (name) => {
    console.log("Adopted pet!");
    addNotification(name)
  };

  const addNotification = (name) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, {id, name}])
  }
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  // Function to simulate the pass action
  const handlePass = () => {
    console.log("Passed on pet");
  };

  useEffect(() => {
    setLoading(false); // Simulating data load
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading pets...
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh" }}
      >
        <Navbar />
        {!loading && (
          <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ width: "90%", maxWidth: "400px" }}>
                {petsQueue[0] ? (
                  <div>
                    <PetCard petsQueue={petsQueue} adoptNotification = {adoptNotification} />
                    <Box sx={{ bottom: 20, right: 20, zIndex: 1000 }}>
                    {
                      notifications.map((n) => (
                        <Notification key = {n.id} name = {n.name} onClose = {() => removeNotification(n.id)}/>
                      )
                      )
                    } 
                  </Box>   
                  </div>
                ) : (
                  <Box
                    sx={{
                      textAlign: "center",
                      mt: 4,
                      p: 4,
                      bgcolor: "white",
                      borderRadius: "16px",
                      boxShadow: 1,
                    }}
                  >
                    <Typography variant="h6">No more pets to show!</Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      Check back later for more furry friends.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
}
