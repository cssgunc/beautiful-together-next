"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Setup() {
  const [currentViews, setCurrentViews] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("betoes")
        .select("views")
        .eq("name", "Gili Horwitz")
        .single();

      let views = 0;

      if (data) {
        views = data.views;
      } else {
        const t = await supabase
          .from("betoes")
          .insert({ name: "Gili Horwitz", views: 0 });
      }

      const t = await supabase
        .from("betoes")
        .update({ views: views + 1 })
        .eq("name", "Gili Horwitz");

      setCurrentViews(views + 1);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Gili Horwitz</h1>
      <p>Views: {currentViews}</p>
    </div>
  );
}