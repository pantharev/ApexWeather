import { NextRequest, NextResponse } from 'next/server';
import pg from 'pg';
import nodemailer from 'nodemailer';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.POSTGRES_CONNECTION,
});

const testAccount = {
    user: 'stone23@ethereal.email',
    pass: 'qkS7DkmBx7DcUA1B6h'
}

export async function POST(req: NextRequest) {
    // add form data to subscriptions table
    // return subscription id

    const { email } = await req.json() as { email: string };
    console.log("email: ", email);
    // send an email using nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // todo: use google smtp server
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
    const info = await transporter.sendMail({
        from: '"Weather App"',
        to: email,
        subject: "Subscription Confirmation",
        text: "Thank you for subscribing to our weather updates!",
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