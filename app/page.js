"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import Setup from './Setup';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [pingResult, setPingResult] = useState('');

  // ping
  const pingSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('test_table') 
        .select('*')
        .limit(1);

      if (error) throw error;
      if (data) setPingResult('Supabase Connected Successfully!');
    } catch (error) {
      console.error('Error pinging Supabase:', error.message);
      setPingResult('Failed to Connect to Supabase.');
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>

      <Image
          className={styles.logo}
          src="/logo.png"
          alt="bt_logo"
          width={170}
          height={70}
          priority
        />

        <Setup/>
        
        <ol>
          Welcome to the Beautiful Together Project Team!
        </ol>
        <ol>
          Before making edits, make sure to completely read the README.
        </ol>
        <button onClick={pingSupabase} className={styles.primary}>Ping Supabase Test</button>
        {pingResult && <ol>{pingResult}</ol>}
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
