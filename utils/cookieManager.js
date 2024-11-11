// utils/cookieManager.js
const COOKIE_NAME = 'pets-data';
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

const setCookieData = (data) => {
    try {
        // Take first 20 animals instead of 10
        const limitedData = Array.isArray(data) ? data.slice(0, 20) : data;
        
        // Simplify the data structure to reduce size
        const simplifiedData = limitedData.map(animal => ({
            id: animal.id,
            name: animal.name,
            type: animal['dog/cat'],
            created: animal.created_at,
            // Adding basic tags that might be useful
            breed: animal.tags?.Breed || 'Unknown',
            gender: animal.tags?.Gender || 'Unknown',
            age: animal.tags?.Age || 'Unknown'
        }));

        const cookieValue = {
            data: simplifiedData,
            timestamp: Date.now(),
            totalCount: data.length // Store total count for reference
        };

        const stringifiedValue = JSON.stringify(cookieValue);
        document.cookie = `${COOKIE_NAME}=${encodeURIComponent(stringifiedValue)}; path=/`;
        
        // Verify the cookie was set
        const verificationRead = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${COOKIE_NAME}=`));
            
        if (!verificationRead) {
            console.error('Cookie verification failed - cookie not found after setting');
            return false;
        }

        console.log('Cookie set successfully with limited data (20 animals)');
        return true;
    } catch (error) {
        console.error('Error setting cookie:', error);
        return false;
    }
};

const getCookieData = () => {
    try {
        const cookie = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${COOKIE_NAME}=`));
        
        if (cookie) {
            const value = cookie.split('=')[1];
            const decodedValue = decodeURIComponent(value);
            return JSON.parse(decodedValue);
        }
        return null;
    } catch (error) {
        console.error('Error reading cookie:', error);
        return null;
    }
};

const needsRefresh = () => {
    const cookieData = getCookieData();
    if (!cookieData) return true;
    
    const now = Date.now();
    return (now - cookieData.timestamp) > TWENTY_FOUR_HOURS;
};

const clearCookieData = () => {
    document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    console.log('Cookie cleared');
};

export {
    COOKIE_NAME,
    setCookieData,
    getCookieData,
    needsRefresh,
    clearCookieData
};