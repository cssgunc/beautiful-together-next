"use client";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export default function LikedDog({ dog }) {
  return (
    <div className="bg-white w-1/2 h-full border-4 rounded-xl border-green-400 p-4 overflow-hidden">
      <div className="relative">
        <img
          className="w-24 h-24 object-cover rounded-md"
          src={dog.images[0]}
          alt={dog.name}
        />
      </div>
    </div>
  );
}
