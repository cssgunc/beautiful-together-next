// utils/fetchPetData.js
const cacheName = "pets-cache";

export const fetchPetData = async () => {
    try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match("/api/animals");
        
        if (cachedResponse) {
            console.log("Found data in cache");
            const data = await cachedResponse.json();
            console.log("Cache data:", data);
            return data;
        }
        
        console.log("No cache found, fetching from network...");
        const res = await fetch("/api/animals");
        console.log("Network response status:", res.status);
        
        if (!res.ok) {
            throw new Error(`Failed to fetch pet data: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log("Network data received:", data);
        
        // Store in cache
        await cache.put(
            "/api/animals",
            new Response(JSON.stringify(data))
        );
        console.log("Data stored in cache");
        
        return data;
    } catch (error) {
        console.error('Error in fetchPetData:', error);
        throw error;
    }
};