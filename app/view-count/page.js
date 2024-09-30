"use client"

import styles from "../page.module.css";
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [viewCount, setViewCount] = useState('loading...');
  const [pageLoaded, setPageLoaded] = useState(false);

  // ping
  async function updateViewCount() {
    try {
      /**
      const { data, error } = await supabase
      .from('betoes') 
      .insert({name: 'ChristineHu', views: 1});
      return;
      */

      const { data, error } = await supabase
        .from('betoes') 
        .select('views')
        .eq('name', 'ChristineHu')
        .limit(1);

      if (error) throw error;
      if (data) {
        const newViewCount = data[0].views + 1;
        const { updateData, updateError } = await supabase
        .from('betoes') 
        .upsert({name: 'ChristineHu', views: newViewCount});

        if (updateError) throw error;
        else {
            setViewCount(newViewCount);
        }
      }
    } catch (error) {
      console.error('Error pinging Supabase:', error.message);
      setViewCount('Failed to Connect to Supabase.');
    }
  };

  if (!pageLoaded) {
    setPageLoaded(true);
    updateViewCount();
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        <ol>
          Christine Hu
        </ol>
        <ol>Views: {viewCount}</ol>
        <div className={styles.ctas}>
          {}
        </div>
      </main>
      <footer className={styles.footer}>
        {}
      </footer>
    </div>
  );
}