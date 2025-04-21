import { getPetData } from "@/utils/indexedDB";
import { getSavedAnimals, removeAnimal } from "../savedPetsCookie/savedPetsCookie";

export const cleanSavedAnimalsFromIndexedDB = async () => {
    try {
      const savedAnimals = getSavedAnimals();
      const allPets = await getPetData();
      const validPetIds = new Set(allPets.map((pet) => pet.id));
  
      const invalidIds = savedAnimals.filter((id) => !validPetIds.has(id));
  
      for (const id of invalidIds) {
        removeAnimal(id);
      }
  
      if (invalidIds.length > 0) {
        console.log(`Removed invalid saved pet IDs:`, invalidIds);
      }
    } catch (error) {
      console.error("Error cleaning saved pets from cookies:", error);
    }
  };
  