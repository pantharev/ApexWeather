import { NextRequest, NextResponse } from 'next/server';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.POSTGRES_CONNECTION,
});

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function POST(req: NextRequest) {
    // add form data to subscriptions table
    // return subscription id

    const { email } = await req.json() as { email: string };
    console.log("email: ", email);

    const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Subscription Confirmation",
        text: "You have successfully subscribed to our newsletter",
    });

    console.log("Message sent: %s", info.messageId);

    const client = await pool.connect();

    try {
    const text = 'INSERT INTO subscriptions(email) VALUES($1) RETURNING *';
    const values = [email];

    const res = await client.query(text, values);
    console.log(res.rows[0]); // Hello world!w
    // postgresql://pantharev:MvhBG9cbiuF7@ep-falling-fog-a49f3jev.us-east-1.aws.neon.tech/weather-subs?sslmode=require

    // console.log("formData: ", formData);
    return new NextResponse("Subscription created", 
        { 
            headers: {
                'Content-Type': 'application/json'
            },
            status: 200 
        }
    );
} catch(err) {
    console.error(err);
    return new NextResponse("Error creating subscription", 
        { 
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500 
        }
    );
}
}