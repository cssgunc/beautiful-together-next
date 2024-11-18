'use client';
import localFont from "next/font/local";
import "./globals.css";
import { useEffect } from 'react';
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

function PetDataInitializer({ children }) {
    useEffect(() => {
        checkAndFetchPetData();

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                checkAndFetchPetData();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', checkAndFetchPetData);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', checkAndFetchPetData);
        };
    }, []);

    return children;
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