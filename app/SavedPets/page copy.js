"use client";
import Link from "next/link";
import LikedCat from "./liked-cat";
import LikedDog from "./liked-dog";
import { useState } from "react";

export default function LikedPetsPage() {
  const [bear] = useState({
    name: "Bear",
    years: "7",
    breed: "Hound & Mix",
    sex: "Male",
    age: "Adult (5-9 Years) (04/01/2018) - Estimated",
    weight: "71-80 Pounds",
    color: "Brown & Tan",
    temperament: "Affectionate",
    kids: "I Like Kids Over 10",
    dogs: "I Like Select Dogs",
    cats: "I Don't Like Cats",
    images: [
      "https://beautifultogethersanctuary.com/wp-content/uploads/2024/08/IMG_7774.jpeg",
      "https://beautifultogethersanctuary.com/wp-content/uploads/2024/08/IMG_7771.jpeg",
      "https://beautifultogethersanctuary.com/wp-content/uploads/2024/08/IMG_7773.jpeg",
      "https://beautifultogethersanctuary.com/wp-content/uploads/2024/08/IMG_7772.jpeg",
      "https://beautifultogethersanctuary.com/wp-content/uploads/2024/08/IMG_7770.jpeg",
    ],
  });
  const [acorn] = useState({
    name: "Acorn",
    years: "< 1",
    breed: "Domestic Short Hair",
    sex: "Male",
    age: "Baby (08/13/2024) - Estimated",
    color: "Gray / Blue / Silver",
    temperament: "Social & Friendly",
    litter: "I'm Litterbox Trained",
    images: [
      "https://beautifultogethersanctuary.com/wp-content/uploads/2024/09/IMG_3647-scaled.jpeg",
      "https://beautifultogethersanctuary.com/wp-content/uploads/2024/09/IMG_3695-scaled.jpeg",
    ],
  });
  return (
    <div className="w-full h-full flex flex-col items-center gap-10 py-10">
      <LikedDog dog={bear} />
      <LikedCat cat={acorn} />
    </div>
  );
}
