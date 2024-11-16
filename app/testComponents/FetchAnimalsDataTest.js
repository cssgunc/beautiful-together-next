import React, { useEffect, useState } from 'react';

const FetchAnimalsDataTest = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch('/api/animals');
            if (!response.ok) {
                throw new Error('Failed to fetch animals data');
            }
            const data = await response.json();
            setData(data);  
            setLoading(false);  
        } catch (error) {
            setError(error.message);
            setLoading(false);  
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Data from Supabase</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default FetchAnimalsDataTest;