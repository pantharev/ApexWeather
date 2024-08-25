
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.POSTGRES_CONNECTION,
});

export async function POST(req: NextRequest) {
    const { first_name, last_name, email, feedback } = await req.json() as { first_name: string, last_name: string, email: string, feedback: string };
    console.log("feedback: ", first_name, last_name, email, feedback);

    const client = await pool.connect();

    try {
        const text = 'INSERT INTO Feedback(feedback_first_name, feedback_last_name, feedback_email, feedback) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [first_name, last_name, email, feedback];
    
        const res = await client.query(text, values);
        console.log(res.rows[0]); 
    
        return new NextResponse("Feedback created", 
            { 
                headers: {
                    'Content-Type': 'application/json'
                },
                status: 200 
            }
        );
    } catch(err) {
        console.error(err);
        return new NextResponse("Error creating feedback", 
            { 
                headers: {
                    'Content-Type': 'application/json'
                },
                status: 500 
            }
        );
    }

  }
  