'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const FetchAnimalsDataTest = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const { data, error } = await supabase
          .from('Available Animals')
          .select('*');
        if (error) throw error;

        setAnimals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Available Animals</h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <strong>{animal.name}</strong> ({animal['dog/cat']})
            <br />
            Tags: {JSON.stringify(animal.tags)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchAnimalsDataTest;