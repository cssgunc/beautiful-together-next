import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const preferenceTagMap = {
  "Pet Preference": {
    "Dogs": ["dog"], // Maps to dog/cat field
    "Cats": ["cat"],
  },
  "Gender": {
    "Male": ["male"],
    "Female": ["female"],
  },
  "Age": {
    "Baby (0-5 Months)": ["baby (0-5 months)", "kitten (under 1 year)", "puppy (under 1 year)"],
    "Puppy (5-24 Months)": ["puppy (5-24 months)", "youth (24-60 months)"],
    "Youth (2-5 Years)": ["youth (2-5 years)"],
    "Adult (5-9 Years)": ["adult (5-9 years)"],
    "Senior (9+ Years)": ["senior (9+ years)"],
  },
  "Good With Kids?": {
    "Kids Over 6": ["i like kids over 6", "i like all kids"],
    "Kids Over 10": ["i like kids over 6", "i like kids over 10", "i like all kids"],
    "I Like All Kids": ["i like kids over 6", "i like kids over 10", "i like all kids"],
    // "Not Tested With Kids": []
  },
  "Good With Dogs?": {
    "Big Dogs": ["i like all big dogs", "i like select dogs", "i like all dogs"],
    "Small Dogs": ["i like all small dogs", "i like select dogs", "i like all dogs"],
  },
  "Good With Cats?": {
    "Cats": ["i like all cats", "some"],
  },
  "Special Needs": {
    "Yes": ["yes"],
    "No": ["no"],
  },
};


function comparePreference(preferenceCategory, userChoices, animalValue, allowPartial = false) {
  if (animalValue == undefined || userChoices == []){
    return false;
  }

  // Trim whitespace off of any string
  const normalize = (value) => (value ? value.toString().trim().toLowerCase() : "");
  
  // catch invalid input
  if (!userChoices?.length || !preferenceTagMap[preferenceCategory]) return false;

  // create an array of choices
  const validTags = userChoices
    .map((choice) => preferenceTagMap[preferenceCategory][choice])
    .flat() // Flatten nested arrays
    .map(normalize);

  const normalizedAnimalValue = normalize(animalValue);

  console.log(
    `Comparing Preferences for ${preferenceCategory}:`,
    validTags,
    "with Animal Value:",
    normalizedAnimalValue
  );

  // Allow partial matches for specific categories
  if (allowPartial) {
    const match = validTags.some((pref) => /*normalizedAnimalValue.includes(pref) ||*/ pref.includes(normalizedAnimalValue));
    console.log(`Partial Match Result for ${preferenceCategory}:`, match);
    return match;
  }

  // Exact match logic
  const match = validTags.includes(normalizedAnimalValue);
  // console.log("Unnormalized: " + animalValue);
  // console.log("Normalized: " + normalizedAnimalValue)
  // console.log(validTags);
  // console.log(userChoices);
  console.log(match);
  // console.log(`Exact Match Result for ${preferenceCategory}:`, match);
  return match;
}



function calculateClosenessScore(animal, preferences) {
  // returns a value relating to the filters inputted
  let score = 0;

  const WEIGHTS = {
    "Pet Preference": 20,
    "Gender": 5,
    "Age": 10,
    "Good With Kids?": 3,
    "Good With Dogs?": 3,
    "Good With Cats?": 3,
    "Special Needs": 10,
  };
  console.log(animal.name);
  // for each of the weights, calculate if it is relevent
  // Object.keys(WEIGHTS).forEach((category) => {
  Object.keys(preferences).forEach((category) => {
    const userChoices = preferences[category];
    // mapping 'Pet Preference' to the 'dog/cat' type
    // console.log(category)
    if (userChoices != []) {
    let animalValue =
      category === "Pet Preference" ? animal["dog/cat"] : animal.tags[category];
    console.log(animalValue)
    // Enable partial matching only for Age, Good With Kids?, and Good With Pets?
    // const allowPartial = category === "Age" || category === "Good With Kids?" || category === "Good With Pets?";
    // console.log(animal.tags);
    // console.log(animal.tags[category])
    // if (animalValue !== undefined && category !== "Pet Preference"){
    //   console.log(animalValue);
    // }
    // if (animalValue != undefined) {
      const allowPartial = false;
      if (!comparePreference(category, userChoices, animalValue, allowPartial)) {
        // console.log(`Mismatch in ${category}:`, userChoices, animalValue);
        score += WEIGHTS[category];
      }
    } 
  });

  // console.log("Final Score for Animal:", animal.name, score);
  return score;
}


export async function POST(req) {
  const preferences = await req.json();
  console.log(preferences);

  if (!preferences) {
    return NextResponse.json({ error: 'Preferences not provided' }, { status: 400 });
  }
  console.log(preferences);

  const { data: animals, error } = await supabase.from('Available Animals').select('*');

  if (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }

  const rankedAnimals = animals.map((animal) => {
    const score = calculateClosenessScore(animal, preferences);
    return { ...animal, score };
  });

  rankedAnimals.sort((a, b) => a.score - b.score);
  return NextResponse.json(rankedAnimals, { status: 200 });
}