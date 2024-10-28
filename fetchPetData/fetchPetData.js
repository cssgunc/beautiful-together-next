const cacheName = "pets-cache"

export const fetchPetData = async () => {
    const cache = await caches.open(cacheName)
    
    //dummy data
    const cachedResponse = await cache.match("https://dummyjson.com/products");

    if (cachedResponse){
        // if data is cached, return it 
        console.log("Returning data from cache")
        const data = await cachedResponse.json();
        return data;
    } else {
        //if not, fetch from API (dummy data)
        console.log("Fetching data from network")
        const res = await fetch("https://dummyjson.com/products")
        const data = await res.json()
        
        //add response to cache
        await cache.put(
            "https://dummyjson.com/products",
            new Response(JSON.stringify(data))
        )
        
        return data
    }
}

