import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database(
//     "./database.db",
//     sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
//     (err: any) => {
//         if (err) {
//             console.error(err.message);
//         }
//         console.log("Connected to the database.");
//     }
// )

// export async function GET(req: NextRequest) {
//     const sql = `SELECT * FROM subscriptions`;
//     db.all(sql, [], (err: any, rows: any) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Rows: ", rows);
//         return NextResponse.json(rows);
//     });
// }

// use regular postgres database instead.

export async function GET(req: NextRequest) {
    return NextResponse.json({ message: "Hello" });
}

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

