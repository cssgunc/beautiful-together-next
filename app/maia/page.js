"use client"

import Image from "next/image";
import styles from "../page.module.css";
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [run, setRun] = useState(false)
  const [views, setViews] = useState(null)

    useEffect(() => {
        const increment = async () => {
            try {
                const { data, error } = await supabase
                .from('betoes')
                .select('*')
                .eq('name', 'Maia Manaligod')
                .single()

                if (error){ console.log(error) ; throw error }
                else {
                    let viewCount = (data.views ? data.views + 1 : 1)
                    const { upData, error } = await supabase
                    .from('betoes')
                    .upsert({ name: 'Maia Manaligod', views: viewCount})
                    .select()

                    if (error){throw error}
                    setViews(viewCount)
                }
            } catch (error) {
                console.error('Error retrieving Maia', error.message);
            }
        }
        if (!run){
            increment();
            setRun(true)    
        }
    } , []);


  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <div>
            <h3>Maia Manaligod</h3>
            <p>Views: {views}</p>
        </div>
        
        
      </main>
      <footer className={styles.footer}>
        {}
      </footer>
    </div>
  );
}
