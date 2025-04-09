function getSavedPreferences() {
  // Retrieve the JSON string from localStorage
  const savedPreferences = localStorage.getItem("preferences");

  // Parse the JSON string back into an object
  return savedPreferences ? JSON.parse(savedPreferences) : null;
}

export const fetchOrderedPets = async () => {
    const preferences = getSavedPreferences();
    //console.log(preferences);
  
    try {
      if (!preferences) {
        //console.warn('No preferences saved to rank animals. Fetching unranked animals.');
        // Fetch unranked animals if no preferences are saved
        const res = await fetch('../api/animals');
        const unrankedAnimals = await res.json();
        return unrankedAnimals;
      }
  
      const response = await fetch('../api/animalsByPreference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });
      console.log(preferences);
  
      if (!response.ok) {
        //console.warn('Failed to fetch ranked animals. Fetching unranked animals instead.');
        //console.error("Response: " + response.status);
        const res = await fetch('../api/animals');
        const unrankedAnimals = await res.json();
        return unrankedAnimals;
      }
  
      const rankedAnimals = await response.json();
      //console.log('Ranked Animals:', rankedAnimals);
      return rankedAnimals;
  
    } catch (error) {
      //console.error('An error occurred while fetching ranked animals:', error);
      //console.warn('Fetching unranked animals as fallback.');
      const res = await fetch('../api/animals');

      const unrankedAnimals = await res.json();
      return unrankedAnimals;
    }
};