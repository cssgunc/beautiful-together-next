const cacheName = "pets-cache";

export const fetchPetData = async () => {
  const cache = await caches.open(cacheName);

  //dummy data
  const cachedResponse = await cache.match("../api/animals");

  if (cachedResponse) {
    // if data is cached, return it
    console.log("Returning data from cache");
    const data = await cachedResponse.json();
    return data;
  } else {
    //if not, fetch from API (dummy data)
    console.log("Fetching data from network");
    const res = await fetch("../api/animals");
    const data = await res.json();

    //add response to cache
    await cache.put("../api/animals", new Response(JSON.stringify(data)));

    return data;
  }
};
