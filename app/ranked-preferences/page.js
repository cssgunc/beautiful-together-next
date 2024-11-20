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

// Compare an animal's attributes to preferences
function comparePreferences(animal, preferences) {
  let score = 0;

  // Compare "Pet Preference"
  if (preferences["Pet Preference"] && preferences["Pet Preference"].includes(animal["Pet Preference"])) {
    score += 1;
  }

  // Compare "Gender"
  if (preferences["Gender"] && preferences["Gender"].includes(animal["Gender"])) {
    score += 1;
  }

  // Compare "Age"
  if (preferences["Age"] && preferences["Age"].includes(animal["Age"])) {
    score += 1;
  }

  // Compare "Good With Pets?"
  if (preferences["Good With Pets?"] && preferences["Good With Pets?"].includes(animal["Good With Pets?"])) {
    score += 1;
  }

  // Compare "Good With Kids?"
  if (preferences["Good With Kids?"] && preferences["Good With Kids?"].includes(animal["Good With Kids?"])) {
    score += 1;
  }

  // Compare "Special Needs"
  if (preferences["Special Needs"] && preferences["Special Needs"].includes(animal["Special Needs"])) {
    score += 1;
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

  // Rank animals by comparing them to preferences
  const rankedAnimals = animals.map((animal) => {
    const score = comparePreferences(animal, preferences);
    return { ...animal, score };
  });

  // Sort animals based on the score (highest to lowest)
  rankedAnimals.sort((a, b) => b.score - a.score);

  // Log ranked animals to the console
  console.log("Ranked Animals:");
  rankedAnimals.forEach((animal, index) => {
    console.log(`Rank ${index + 1}: ID: ${animal.id}, Score: ${animal.score}, Name: ${animal.name}`);
  });

  return rankedAnimals;
}

// Example usage
const preferences = {
  "Pet Preference": ["Dog", "Cat"],
  "Gender": ["Female", "Male"],
  "Age": ["Adult", "Puppy"],
  "Good With Pets?": ["Yes"],
  "Good With Kids?": ["Yes"],
  "Special Needs": ["None"]
};

// Call rankAnimals function to get the ranked animals in the terminal
rankAnimals(preferences)
  .then(rankedAnimals => {
    console.log("Final Ranked Animals:", rankedAnimals);
  })
  .catch(error => {
    console.error("Error ranking animals:", error);
  });