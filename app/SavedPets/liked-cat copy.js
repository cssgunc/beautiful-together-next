"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import PetsIcon from "@mui/icons-material/Pets";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ChildFriendlyOutlinedIcon from "@mui/icons-material/ChildFriendlyOutlined";
import ChargingStationOutlinedIcon from "@mui/icons-material/ChargingStationOutlined";

export default function LikedCat({ cat }) {
  // State Variable For Tracking Picture Index
  const [currentPic, setCurrentPic] = useState(0);
  const numpics = cat.images.length;

  //   Previous Picture Button
  const prevPic = () => {
    setCurrentPic((currentPic - 1 + numpics) % numpics);
  };

  //   Next Picture Button
  const nextPic = () => {
    setCurrentPic((currentPic + 1) % numpics);
  };

  return (
    // Overall Card
    <div className="bg-white  w-4/5 md:w-2/5 md:max-w-md md:h-full border-4 rounded-xl border-btgreen p-4 overflow-hidden">
      {/* Image Box */}
      <div className="relative">
        {/* Image */}
        <img
          className="w-75% max-h-96 object-fill rounded-xl"
          src={cat.images[currentPic]}
          alt={cat.name}
        />
        {/* Next/Previous Buttons */}
        <div className="absolute inset-0 flex justify-between items-center p-4">
          <button className="p-2 rounded-full shadow-md" onClick={prevPic}>
            ❮
          </button>
          <button className="p-2 rounded-full shadow-md" onClick={nextPic}>
            ❯
          </button>
        </div>
        {/* Name Overlay */}
        <div className="absolute w-full bottom-0 h-10% bg-btgreen text-leading text-white font-bold text-xl py-2 px-5 rounded-b-xl rounded-t-none mt-2">
          <p>{cat.name}</p>
        </div>
      </div>

      {/* Cat Attributes */}
      <div className="flex flex-row text-wrap mt-2 justify-between">
        {/* Left Side Column */}
        <div className="flex flex-col text-wrap w-1/2 mt-2 gap-4">
          {/* Breed */}
          <div className="text-black text-xs flex flex-row gap-4 items-center">
            <PetsOutlinedIcon className="w-4 h-4 text-btorange" />
            {cat.breed}
          </div>
          {/* Sex */}
          <div className="text-black text-xs flex flex-row gap-4 items-center">
            {/* Ternary Operator to Assing Gender Icon */}
            {cat.sex == "Male" ? (
              <MaleIcon className="w-4 h-4 text-btorange" />
            ) : (
              <FemaleIcon className="w-4 h-4 text-btorange" />
            )}
            {cat.sex}
          </div>
          {/* Cat Age */}
          <div className="text-black text-xs flex flex-row gap-4 items-center">
            <CakeOutlinedIcon className="w-4 h-4 text-btorange" />
            {cat.age}
          </div>
        </div>
        {/* Right Side Column */}
        <div className="flex flex-col text-wrap w-40% items-end mt-2 gap-4">
          {/* Cat Color */}
          <div className="text-black text-xs flex flex-row gap-4 items-center w-full justify-between">
            <ColorLensOutlinedIcon className="w-4 h-4 text-btorange" />
            <div>{cat.color}</div>
          </div>
          {/* Cat Temperament */}
          <div className="text-black text-xs flex flex-row gap-4 items-center w-full justify-between">
            <ChargingStationOutlinedIcon className="w-4 h-4 text-btorange" />
            <div>{cat.temperament}</div>
          </div>
          {/* Cat Litterbox Trained */}
          <div className="text-black text-xs flex flex-row gap-4 items-center w-full justify-between">
            <PetsOutlinedIcon className="w-4 h-4 text-btorange" />
            <div>{cat.litter}</div>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between mt-6 gap-8">
        {/* More Info Button */}
        <button className="w-1/2 bg-btorange text-white text-sm font-bold py-2 px-4 rounded-lg">
          More Information
        </button>
        {/* Adopt Button */}
        <button className="w-1/2 bg-btorange text-white font-bold py-2 px-4 rounded-lg">
          Adopt {cat.name}!
        </button>
      </div>
    </div>
  );
}
