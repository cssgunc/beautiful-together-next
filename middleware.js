import { NextResponse } from "next/server";

const COOKIE_NAME = "pets-data";
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export async function middleware(request) {
  // Initiate Response
  const response = NextResponse.next();

  // Get the 'pet-data' cookie from the request
  const petDataCookie = request.cookies.get(COOKIE_NAME);

  // If there's no pet-data cookie or it needs a refresh, fetch data
  if (!petDataCookie || needsRefresh(petDataCookie)) {
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
      const newData = data.slice(0, 5);

      // Create the cookie value with only the first 10 objects
      const cookieValue = {
        data: newData,
        timestamp: Date.now(),
        totalCount: data.length, // Store the total count, not just the limited data
      };

      const cookieSize = new TextEncoder().encode(
        JSON.stringify(cookieValue)
      ).length;

      console.log("Cookie Size " + cookieSize + " bytes");

      response.cookies.set(COOKIE_NAME, JSON.stringify(cookieValue), {
        maxAge: TWENTY_FOUR_HOURS / 1000, // maxAge in seconds
        path: "/",
      });

      console.log("Pet data cookie set with fresh data");
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
