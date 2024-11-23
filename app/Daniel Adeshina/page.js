import { useState, useEffect } from 'react';

export default function ViewsPage() {
  const [views, setViews] = useState(null); 
  const [error, setError] = useState(null);  

  
  useEffect(() => {
    
    const fetchViews = async () => {
      try {
        const res = await fetch('/api/incrementViews');  // Assuming API is at /api/incrementViews
        const data = await res.json();

        if (res.ok) {
          setViews(data.views);  // Update the view count state if the response is OK
        } else {
          setError(data.error);  // Handle errors in the response
        }
      } catch (err) {
        setError('Failed to fetch view count');  // Handle any network or other errors
      }
    };

    fetchViews();  // Call the function to fetch views when the component mounts
  }, []);

  return (
    <div>
      <h1>Daniel Adeshina</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>  // Display error message if an error occurred
      ) : (
        <p>Views: {views !== null ? views : 'Loading...'}</p>  // Display the views or a loading message
      )}
    </div>
  );
}