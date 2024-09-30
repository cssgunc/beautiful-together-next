"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SiyaPage() {
    const [name, setName] = useState('Siya Yeolekar');
    const [views, setViews] = useState(0);
    useEffect(() => {
      const incrementViews = async () => {
        const { data, error } = await supabase
          .from('betoes')
          .select('views')
          .eq('name', name)
          .single();
        if (error) {
          await supabase.from('betoes').insert([{ name, views: 1 }]);
          setViews(1);
        } else {
          await supabase
            .from('betoes')
            .update({ views: data.views + 1 })
            .eq('name', name);
          setViews(data.views + 1);
        }
      };
      incrementViews();
    }, [name]);
  
    return (
      <div style={{ border: '2px solid black', padding: '20px', width: '300px', fontFamily: 'Arial' }}>
        <h1>{name}</h1>
        <p>Views: {views}</p>
      </div>
    );
  }
