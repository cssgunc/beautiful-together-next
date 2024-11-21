import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const SUPABASE_URL = 'https://bdcvlsgmanecdortkjcu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkY3Zsc2dtYW5lY2RvcnRramN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4ODIxNzIsImV4cCI6MjA0MjQ1ODE3Mn0.mVnJfs6UA-cPvRTTie8XmPmhCSNmfK5PtzgZ9Zhy9Ss';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Fetch animals from Supabase
async function fetchAnimals() {
  const { data, error } = await supabase
    .from('Available Animals')
    .select('*');

  if (error) {
    console.error("Error fetching animals:", error);
    return [];
  }

  console.log("Fetched Animals:", data);
  return data;
}

// Compare animal attributes to preferences to calculate a closeness score
function calculateClosenessScore(animal, preferences) {
  let score = 0;

  // Helper function to normalize values for case-insensitive comparison
  const normalize = (value) => (value ? value.toString().trim().toLowerCase() : "");

  // Assign weights for different attributes
  const WEIGHTS = {
    "dog/cat": 5, // More important comparison
    "Breed": 3,
    "Gender": 1,
    "Age": 2,
    "Good With Kids?": 1,
    "Good With Dogs?": 1,
    "Energy Level": 1,
    "Special Needs": 1,
  };

  // Compare "dog/cat" (e.g., Dog or Cat)
  if (preferences["Pet Preference"]?.length) {
    const prefList = preferences["Pet Preference"].map(pref => normalize(pref));
    if (!prefList.includes(normalize(animal["dog/cat"]))) {
      score += WEIGHTS["dog/cat"];
    }
  }

  // Compare "Breed"
  if (preferences["Breed"]?.length) {
    const prefList = preferences["Breed"].map(pref => normalize(pref));
    if (!prefList.includes(normalize(animal?.tags?.Breed))) {
      score += WEIGHTS["Breed"];
    }
  }

  // Compare "Gender"
  if (preferences["Gender"]?.length) {
    const prefList = preferences["Gender"].map(pref => normalize(pref));
    if (!prefList.includes(normalize(animal?.tags?.Gender))) {
      score += WEIGHTS["Gender"];
    }
  }

  // Compare "Age"
  if (preferences["Age"]?.length) {
    const prefList = preferences["Age"].map(pref => normalize(pref));
    if (!prefList.some(age => normalize(animal?.tags?.Age).includes(age))) {
      score += WEIGHTS["Age"];
    }
  }

  // Compare "Good With Kids?"
  if (preferences["Good With Kids?"]?.length) {
    const prefList = preferences["Good With Kids?"]?.map(pref => normalize(pref));
    if (!prefList.some(pref => normalize(animal?.tags?.["Good With Kids?"]).includes(pref))) {
      score += WEIGHTS["Good With Kids?"];
    }
  }

  // Compare "Good With Dogs?"
  if (preferences["Good With Dogs?"]?.length) {
    const prefList = preferences["Good With Dogs?"]?.map(pref => normalize(pref));
    if (!prefList.some(pref => normalize(animal?.tags?.["Good With Dogs?"]).includes(pref))) {
      score += WEIGHTS["Good With Dogs?"];
    }
  }

  // Compare "Energy Level"
  if (preferences["Energy Level"]?.length) {
    const prefList = preferences["Energy Level"].map(pref => normalize(pref));
    if (!prefList.includes(normalize(animal?.tags?.["Energy Level"]))) {
      score += WEIGHTS["Energy Level"];
    }
  }

  // Compare "Special Needs"
  if (preferences["Special Needs"]?.length) {
    const prefList = preferences["Special Needs"].map(pref => normalize(pref));
    if (!prefList.includes(normalize(animal?.tags?.["Special Needs"]))) {
      score += WEIGHTS["Special Needs"];
    }
  }

  return score;
}

// Rank animals based on preferences
async function rankAnimals(preferences) {
  console.log('Ranking animals with preferences:', preferences);

  const animals = await fetchAnimals();

  if (animals.length === 0) {
    console.log("No animals to rank.");
    return [];
  }

  // Rank animals by calculating their closeness score to preferences
  const rankedAnimals = animals.map((animal) => {
    const score = calculateClosenessScore(animal, preferences);
    return { ...animal, score };
  });

  // Sort animals based on the score (lowest to highest)
  rankedAnimals.sort((a, b) => a.score - b.score);

  // Log ranked animals to the console with additional details
  console.log("Ranked Animals:");
  rankedAnimals.forEach((animal, index) => {
    console.log(`Rank ${index + 1}: ID: ${animal.id}, Name: ${animal.name}, Score: ${animal.score}, Breed: ${animal?.tags?.Breed}, Gender: ${animal?.tags?.Gender}`);
  });

  // Verify if the actual results align with expected rankings
  console.log("Final Ranked Animals:", rankedAnimals);

  return rankedAnimals;
}

// Example usage
const preferences = {
  "Pet Preference": ["Cat"],
  "Breed": ["Terrier"],
  "Gender": ["Female"],
  "Age": ["Youth"],
  "Good With Kids?": ["I Like All Kids"],
  "Good With Dogs?": ["I Like All Dogs"],
  "Energy Level": ["Gentle and Friendly"],
  "Special Needs": ["None"]
};

// Call rankAnimals function to get the ranked animals in the terminal
rankAnimals(preferences)
  .then(rankedAnimals => {
    console.log("Final Ranked Animals:", rankedAnimals);
    // Verify if the actual results align with the expected rankings
    rankedAnimals.forEach((animal, index) => {
      console.log(`Verification - Rank ${index + 1}: ID: ${animal.id}, Name: ${animal.name}, Score: ${animal.score}`);
    });
  })
  .catch(error => {
    console.error("Error ranking animals:", error);
  });