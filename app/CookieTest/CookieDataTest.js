// components/CookieDataTest.js
import React, { useEffect, useState } from 'react';
import { setCookieData, getCookieData, needsRefresh, clearCookieData } from '@/utils/cookieManager';
import { fetchPetData } from '@/utils/fetchPetData';

const CookieDataTest = () => {
    const [cookieData, setCookieState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastRefresh, setLastRefresh] = useState(null);
    const [fullData, setFullData] = useState(null);

    const checkAndUpdateData = async () => {
        try {
            console.log('Starting data refresh...');
            setLoading(true);
            setError(null);

            // Fetch new data
            console.log('Fetching fresh data...');
            const freshData = await fetchPetData();
            
            if (!freshData || !Array.isArray(freshData)) {
                throw new Error('Invalid data received from API');
            }

            console.log(`Fetched ${freshData.length} animals`);
            
            // Store full data in state
            setFullData(freshData);

            // Set the cookie with limited data
            const success = setCookieData(freshData);
            if (!success) {
                throw new Error('Failed to set cookie data');
            }

            // Verify the cookie was set by reading it back
            const verifiedData = getCookieData();
            if (!verifiedData) {
                throw new Error('Failed to verify cookie data');
            }

            // Update state
            console.log('Updating state with new data');
            setCookieState(verifiedData);
            setLastRefresh(new Date().toLocaleString());

        } catch (error) {
            console.error('Error in checkAndUpdateData:', error);
            setError(error.message);
            setCookieState(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAndUpdateData();
    }, []);

    const handleRefreshClick = () => {
        checkAndUpdateData();
    };

    const handleClearClick = () => {
        clearCookieData();
        setCookieState(null);
        setLastRefresh(null);
        setFullData(null);
    };

    if (loading) return <div className="p-4">Loading...</div>;
    
    if (error) return (
        <div className="p-4">
            <div className="text-red-600">Error: {error}</div>
            <button 
                onClick={handleRefreshClick}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Try Again
            </button>
        </div>
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Cookie Data Test</h1>
            
            <div className="space-y-4">
                <div className="flex space-x-4">
                    <button 
                        onClick={handleRefreshClick}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Refresh Data
                    </button>
                    <button 
                        onClick={handleClearClick}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Clear Cookie
                    </button>
                </div>

                {lastRefresh && (
                    <div className="text-sm text-gray-600">
                        Last refresh: {lastRefresh}
                    </div>
                )}

                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Cookie Data Summary:</h2>
                    {cookieData ? (
                        <div>
                            <div className="bg-gray-100 p-4 rounded">
                                <p className="font-bold">Total Animals in Database: {cookieData.totalCount}</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    (Storing first 10 animals in cookie for size limitations)
                                </p>
                            </div>
                            
                            <h3 className="text-lg font-semibold mt-4 mb-2">Sample Data (First 10):</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cookieData.data.map(animal => (
                                    <div key={animal.id} className="border p-4 rounded shadow-sm">
                                        <p className="font-bold">{animal.name}</p>
                                        <p className="text-sm text-gray-600">ID: {animal.id}</p>
                                        <p className="text-sm text-gray-600">Type: {animal.type}</p>
                                        <p className="text-sm text-gray-600">Created: {new Date(animal.created).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500">No cookie data available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CookieDataTest;