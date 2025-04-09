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

      // Fetch unranked animals if no preferences are saved
      const res = await fetch("../api/animals");
      const unrankedAnimals = await res.json();
      return unrankedAnimals;
    }

    const response = await fetch("../api/animalsByPreference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });
    //console.log(preferences);

    if (!response.ok) {

      const res = await fetch("../api/animals");
      const unrankedAnimals = await res.json();
      return unrankedAnimals;
    }

    const rankedAnimals = await response.json();
    //console.log("Ranked Animals:", rankedAnimals);
    return rankedAnimals;
  } catch (error) {
    const res = await fetch("../api/animals");
    const unrankedAnimals = await res.json();
    return unrankedAnimals;
  }
};
