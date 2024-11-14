// utils/petDataManager.js
import { initDB, setPetData, getPetData, needsRefresh } from '../utils/indexedDB';

export const checkAndFetchPetData = async () => {
    try {
        await initDB();
        
        const shouldRefresh = await needsRefresh();
        
        if (shouldRefresh) {
            console.log('Data needs refresh, fetching from API...');
            const response = await fetch('/api/animals');
            if (!response.ok) {
                throw new Error('Failed to fetch pet data');
            }
            const data = await response.json();
            await setPetData(data);
            console.log(`Stored ${data.length} pets in IndexedDB`);
        } else {
            console.log('Using existing IndexedDB data');
        }
    } catch (error) {
        console.error('Error in checkAndFetchPetData:', error);
    }
};