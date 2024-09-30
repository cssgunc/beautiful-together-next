"use client";

import Image from "next/image";
import styles from "../page.module.css";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Name() {
  const [name, setName] = useState("");
  const [views, setViews] = useState(0);

  useEffect(() => {
    const getRow = async () => {
      console.log("Row search started");
      const { data, error: error } = await supabase
        .from("betoes")
        .select("*")
        .eq("name", "Ryan Bowers")
        .single();

      if (error) console.error(error);

      if (data) {
        console.log("Row found");
        const numViews = data.views + 1;
        console.log("Views incremented");

        setName(data.name);

        const { error: error } = await supabase
          .from("betoes")
          .update({ views: numViews })
          .eq("name", "Ryan Bowers");

        if (error) throw error;

        setViews(numViews);
      } else {
        console.log("No row");
        const { error: error } = await supabase
          .from("betoes")
          .insert([{ name: "Ryan Bowers", views: 1 }]);

        if (error) throw error;

        console.log("Row made");

        setViews(1);
      }
    };
    getRow();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>{name}</div>
        <div>Views: {views}</div>
      </main>
      <footer className={styles.footer}>{}</footer>
    </div>
  );
}
