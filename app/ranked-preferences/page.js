// ranked-preferences/page.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient('https://bdcvlsgmanecdortkjcu.supabase.co', 'YOUR_SUPABASE_ANON_KEY');

// Fetch animals from the Supabase database
const fetchAnimals = async () => {
  const { data, error } = await supabase
    .from('Available Animals')
    .select('*');
  
  if (error) {
    console.error("Error fetching animals:", error);
    return [];
  }

  return data;
};

// Compare an animal's attributes to preferences
const comparePreferences = (animal, preferences) => {
  let score = 0;

  // Compare "Age"
  if (preferences["Age"] && preferences["Age"].includes(animal["Age"])) {
    score += 1;
  }

  // Compare "Good With Pets?"
  if (preferences["Good With Pets?"] && preferences["Good With Pets?"].includes(animal["Good With Pets?"])) {
    score += 1;
  }

  // Add more comparisons if needed

  return score;
};

// Rank animals based on preferences
export const rankAnimals = async (preferences) => {
  const animals = await fetchAnimals();

  // Rank animals by comparing them to preferences
  const rankedAnimals = animals.map((animal) => {
    const score = comparePreferences(animal, preferences);
    return { ...animal, score };
  });

  // Sort animals based on the score (highest to lowest)
  rankedAnimals.sort((a, b) => b.score - a.score);

  return rankedAnimals;
};