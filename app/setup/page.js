"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Setup() {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const updateViews = async () => {
      const { data } = await supabase
        .from("betoes")
        .select("views")
        .eq("name", "Nicholas Cope")
        .single();

      let currentViews = 0;

      if (data) {
        currentViews = data.views;
      } else {
        await supabase
          .from("betoes")
          .insert({ name: "Nicholas Cope", views: 0 });
      }

      await supabase
        .from("betoes")
        .update({ views: currentViews + 1 })
        .eq("name", "Nicholas Cope");

      setViews(currentViews + 1);
    };

    updateViews();
  }, []);

  return (
    <div>
      <h1>Nicholas Cope</h1>
      <p>Views: {views}</p>
    </div>
  );
}
