export const getSavedAnimals = () => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {});
    
    return cookies.savedAnimals ? JSON.parse(decodeURIComponent(cookies.savedAnimals)) : [];
  };


  export const saveAnimal = (animalId) => {
    
    const savedAnimals = getSavedAnimals();
    console.log("animal id", animalId,!savedAnimals.includes(animalId) )
    if (!savedAnimals.includes(animalId)) {
      const updatedSavedAnimals = [...savedAnimals, animalId];
  
      document.cookie = `savedAnimals=${encodeURIComponent(JSON.stringify(updatedSavedAnimals))}; path=/; max-age=${30 * 24 * 60 * 60}`;
    }
    console.log("saved", document.cookie)
  };

  const deleteAllCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; path=/; max-age=0`;
    });
  };
  
  // Call the function to delete all cookies