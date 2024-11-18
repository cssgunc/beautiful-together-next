"use client";
import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export default function LikedCat({ cat }) {
  return <div>{cat.age}</div>;
}
