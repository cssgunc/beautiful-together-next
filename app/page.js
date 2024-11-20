"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [petCount, setPetCount] = useState(-1);
  const [petData, setPetData] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Loading Pets...")
  const headers = ['Name', 'Dog/Cat', 'Images', 'Tags'];
  const databaseHeaders = ['name', 'dog/cat', 'images', 'tags'];


  // ping
  /*
  async function updatePetData() {
    try {
      const { count, data, error } = await supabase
        .from('Available Animals') 
        .select('*', {count: 'exact'});

      if (error) throw error;
      if (data) {
        console.log(data);
        setPetCount(count);
        setPetData(data);
      }
    } catch (error) {
      console.error('Error pinging Supabase:', error.message);
      setErrorMessage('Failed to Connect to Supabase.');
    }
  };
  */

  //new function calling the database
  async function updatePetData(){
    try {
      const data = await fetchPetData()
      if (data){
        console.log("Data retrived:", data)
        console.log("length: ", data.length)
        setPetCount(data.length);
        setPetData(data);
      }

    } catch (error) {
      console.error("Error fetching pet data", error.message);
      setErrorMessage('Failed to Connect to Supabase.');
    }
  }

  /*
  if (!pageLoaded) {
    setPageLoaded(true);
    updatePetData();
  }
  */

  //rewrote to use useEffect when fetching data
  useEffect(() => {
    updatePetData();
  }, [])

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

        {petCount > 0 ? (
          <div>
          <ol>Total Number of Pets: {petCount}</ol>
            <table>
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                  <th />
                </tr>
              </thead>
              <tbody>
                {petData.map((row, index) => (
                  <tr key={index}>
                    {databaseHeaders.map((field) => (
                      <td key={field} className="wrap-cell">
                        {field === 'images' && row[field] && row[field].length > 0 ? (
                          row[field].map((imgUrl) => (
                            <img src={imgUrl}></img>
                          ))
                        ) : field === 'tags' && row[field] ? (
                          Object.entries(row[field]).map(([tag, value]) => (
                            <p>{tag}: {value}</p>
                          ))
                        ) : (
                          row[field]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : petCount == 0 ? (
          <ol>There are no available animals.</ol>
        ) : (
          <ol>{errorMessage}</ol>
        )}
        <div className={styles.ctas}>
          {}
        </div>
        

        {/*<FetchAnimalsDataTest/>  /*<--- was used for testing */}

      </main>
      <footer className={styles.footer}>
        {}
      </footer>
    </div>
  );
}
