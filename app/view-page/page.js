"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ViewPage() {
  const [views, setViews] = useState();
  const [error, setError] = useState(null);
  console.log("hello");

  useEffect(() => {
    let isMounted = true; // flag to track if the effect has been run
    
    const updateViewCount = async () => {
      try {
        // get data
        let { data, error } = await supabase
          .from('betoes')
          .select('views')
          .eq('name', 'Aileen');
  
        if (error) throw error;
  
        let currentViews = 0;
        if (data && data.length > 0) {
          currentViews = data[0].views || 0;
        }
  
        // update the view count only if still mounted
        if (isMounted) {
          const { error: updateError } = await supabase
            .from('betoes')
            .update({ views: currentViews + 1 })
            .eq('name', 'Aileen');
          
          if (updateError) throw updateError;
  
          setViews(currentViews + 1);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
        console.error("Error updating view count:", err);
      }
    };
  
    updateViewCount();
  
    return () => {
      isMounted = false; // cleanup to mark the component as unmounted
    };
  }, []); // runs once when the component mounts
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Aileen</h1>
      <p>Views: {views}</p>
    </div>
  );
}


