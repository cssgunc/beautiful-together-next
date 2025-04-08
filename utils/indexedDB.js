const DB_NAME = "pets-database";
const DB_VERSION = 1;
const STORE_NAME = "pets-store";

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error("Error opening DB:", request.error);
      reject(request.error);
    };

    request.onsuccess = (event) => {
      console.log("Database opened successfully");
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        // Changed 'dog/cat' to 'petType' for a valid index name
        store.createIndex("petType", "petType", { unique: false });
        store.createIndex("timestamp", "timestamp", { unique: false });
        console.log("Object store created");
      }
    };
  });
};

export const setPetData = async (data) => {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const timestamp = Date.now();
    const enrichedData = data.map((pet) => ({
      ...pet,
      timestamp,
      // Transform 'dog/cat' to 'petType' when storing
      petType: pet["dog/cat"],
    }));

    await store.clear();

    for (const pet of enrichedData) {
      await store.add(pet);
    }

    console.log(`Stored ${enrichedData.length} pets in IndexedDB`);
    return true;
  } catch (error) {
    console.error("Error storing pet data:", error);
    return false;
  }
};

export const getPetData = async () => {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error getting pet data:", error);
    return null;
  }
};

export const needsRefresh = async () => {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index("timestamp");

    return new Promise((resolve, reject) => {
      const request = index.openCursor(null, "prev");

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (!cursor) {
          resolve(true);
          return;
        }

        const lastTimestamp = cursor.value.timestamp;
        const now = Date.now();
        resolve(now - lastTimestamp > 24 * 60 * 60 * 1000);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error checking refresh:", error);
    return true;
  }
};

// Add a helper function to filter by pet type
export const filterByPetType = async (type) => {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index("petType");

    return new Promise((resolve, reject) => {
      const request = index.getAll(type);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error filtering by pet type:", error);
    return [];
  }
};
