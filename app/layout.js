"use client";
import localFont from "next/font/local";
import "./globals.css";
import { useEffect } from "react";
import { checkAndFetchPetData } from '../utils/petDataManager';  // Changed this line

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    const STORAGE_KEY = "pet-data";
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

    function needsRefresh(storedData) {
      try {
        const data = JSON.parse(storedData);
        const now = Date.now();
        return now - data.timestamp > TWENTY_FOUR_HOURS;
      } catch (error) {
        console.error("Error parsing stored data:", error);
        return true;
      }
    }

    async function fetchAndStorePetData() {
      try {
        const response = await fetch("/api/animals", {
          method: "GET",
          headers: {
            "pet-data": "true", // Signal the middleware to fetch fresh data
          },
        });

        const petDataHeader = response.headers.get("pet-data");
        if (petDataHeader) {
          const petData = JSON.parse(petDataHeader);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(petData));
          console.log("Pet data stored in localStorage:", petData);
        }
      } catch (error) {
        console.error("Error fetching and storing pet data:", error);
      }
    }

    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData || needsRefresh(storedData)) {
      fetchAndStorePetData();
    } else {
      console.log("Local storage data is valid, no refresh needed");
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );

}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <PetDataInitializer>
                    {children}
                </PetDataInitializer>
            </body>
        </html>
    );
}