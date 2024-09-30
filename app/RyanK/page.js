"use client"
// "use server"

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [name, setName] = useState('');
  const [views, setViews] = useState(0);
  // ping
  const getInfo = async () => {
    try {
       const { data, error1 } = await supabase
         .from('betoes') 
         .select()
         .eq('name', 'Ryan Krasinski');

      if (error1) throw error1;
      if (data) {
        const obj = {name: 'Ryan Krasinski', views: data[0]['views'] + 1};
        const {error2} = await supabase
        .from('betoes')
        .update(obj)
        .eq('name', 'Ryan Krasinski');

        if (error2) throw error2;
        setName(obj['name']);
        setViews(obj['views']);
      };
    } catch (error) {
      console.error('Error in accessing Supabase:', error.message);
      
    }
  };

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <div>
      <p>{name}</p>
      <p>Views: {views}</p>
      {/* <button onClick={() => getInfo()}>test</button> */}
    </div>
  );
}
