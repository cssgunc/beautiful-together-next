"use client"

import Image from "next/image";
import styles from "./../page.module.css";
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [pingResult1, setPingResult1] = useState('');
  const [pingResult2, setPingResult2] = useState('');
  // ping
  const pingSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('betoes') 
        .select('*')
        .limit(3);

      if (error) throw error;
      if (data) setPingResult1(data.view);
      if (data) setPingResult2(data.name);

      alert(data);
      console.log(pingResult1)



    } catch (error) {
      console.error('Error pinging Supabase:', error.message);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
    
        <button onClick={pingSupabase} className={styles.primary}>Ping Supabase Test</button>
        {}
        <div className={styles.ctas}>
          {}
        </div>
      </main>
    </div>
  );
}
