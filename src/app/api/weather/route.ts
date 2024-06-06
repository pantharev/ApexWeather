import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const { city } = await req.json() as { city: string };
  console.log("City: ", city);
  const weather = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=7`, {
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY || "",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  });
  const data = await weather.json();
  
  console.log("Data", data);
  return NextResponse.json(data);
}

