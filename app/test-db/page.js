// app/test-db/page.js
"use client";
import { useEffect, useState } from "react";
import { getPetData } from "../../utils/indexedDB";

export default function TestDBPage() {
  const [pets, setPets] = useState([]);
  const [dbStatus, setDbStatus] = useState("");

  useEffect(() => {
    const checkDB = async () => {
      try {
        const data = await getPetData();
        console.log("Data in IndexedDB:", data);
        setPets(data || []);
        setDbStatus("Data retrieved successfully");
      } catch (error) {
        console.error("Error checking DB:", error);
        setDbStatus("Error: " + error.message);
      }
    };

    checkDB();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">IndexedDB Test Page</h1>

      <div className="mb-4 p-2 bg-gray-100 rounded">
        <h2 className="font-semibold">Database Status:</h2>
        <p>{dbStatus}</p>
        <p>Total Pets in DB: {pets.length}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          First Pet in DB (Sample):
        </h2>
        <pre className="bg-gray-100 p-2 rounded overflow-auto">
          {pets.length > 0 ? JSON.stringify(pets[0], null, 2) : "No pets in DB"}
        </pre>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">How to Check IndexedDB:</h2>
        <ol className="list-decimal pl-5">
          <li>Open DevTools (F12)</li>
          <li>Go to Application tab</li>
          <li>Find IndexedDB in left sidebar</li>
          <li>Look for 'pets-database'</li>
          <li>Check 'pets-store' for data</li>
        </ol>
      </div>
    </div>
  );
}
