// testRankedPreferences.js
import { rankAnimals } from './ranked-preferences/page'; // Adjust the path as needed

// Test preferences
const testPreferences = {
    "Age": ["Puppy (5-24 Months)"],
    "Good With Pets?": ["Big Dogs"]
};

// Run the ranking function
const testRankedAnimals = async () => {
    console.log("Testing ranked preferences...");

    const rankedAnimals = await rankAnimals(testPreferences);

    console.log("Ranked Animals:", rankedAnimals);
};

// Run the test
testRankedAnimals();