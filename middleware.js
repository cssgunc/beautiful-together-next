import { NextResponse } from "next/server";
import { fetchPetData } from "./utils/fetchPetData";

const COOKIE_NAME = "pets-data";
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export async function middleware(request) {
  // Initiate Response
  const response = NextResponse.next();

  // Get the 'pets-data' cookie from the request
  const needPetData = request.headers.get("pet-data");

  // If there's no pets-data cookie or it needs a refresh, fetch data
  if (needPetData) {
    try {
      // Call the API to get pet data
      const apiResponse = await fetch(`${request.nextUrl.origin}/api/animals`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      });
      const data = await apiResponse.json();
      console.log("Is Array: " + Array.isArray(data));

      // Create the cookie value with only the first 10 objects
      response.headers.set(
        "pet-data",
        JSON.stringify(
          {
            data: data,
            timestamp: Date.now(),
            totalCount: data.length,
          },
          (key, value) => {
            // Optionally clean or filter out unwanted characters
            if (typeof value === "string") {
              return value.replace(/[^\x00-\x7F]/g, ""); // Removes non-ASCII characters
            }
            return value;
          }
        )
      );

      console.log("Data Fetched");
    } catch (error) {
      console.error("Error fetching pet data:", error);
      return NextResponse.json(
        { error: "Failed to fetch pet data" },
        { status: 500 }
      );
    }
  } else {
    console.log("Pet data cookie is valid, no refresh needed");
  }

  return response;
}

function needsRefresh(cookie) {
  try {
    const cookieData = JSON.parse(cookie);
    const now = Date.now();
    return now - cookieData.timestamp > TWENTY_FOUR_HOURS;
  } catch (error) {
    console.error("Error parsing cookie data:", error);
    return true;
  }
}
