import { NextRequest, NextResponse } from 'next/server';
import pg from 'pg';
import nodemailer from 'nodemailer';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.POSTGRES_CONNECTION,
});


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function GET(req: NextRequest, res: NextResponse) {
  console.log('Cron job started'); // Simple log
  console.info('Info level log'); // Info level log
  console.warn('Warning level log'); // Warning level log
  console.error('Error level log'); // Error level log

  const client = await pool.connect();

  try {
    const sql = "INSERT INTO Logs (LogText, Create_Timestamp) VALUES ('Cron job started', NOW())"; // todo: fix.

    const res = await client.query(sql);
    console.log(res.rows[0]); // Hello world!w
  } catch (err) {
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

  return NextResponse.json({ message: 'Cron job executed' }, { status: 200 });
}

// export async function GET(req: NextRequest) {
//   const authHeader = req.headers.get('authorization');
//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return new Response('Unauthorized', {
//       status: 401,
//     });
//   }

//   const { email } = await req.json() as { email: string };
//   console.log("email: ", email);

//   const info = await transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to: email,
//       subject: "Subscription Confirmation",
//       text: "You have successfully subscribed to our newsletter",
//   });

//   console.log("Message sent: %s", info.messageId);

//   const client = await pool.connect();

//   try {
//   const text = 'INSERT INTO subscriptions(email) VALUES($1) RETURNING *';
//   const values = [email];

//   const res = await client.query(text, values);
//   console.log(res.rows[0]); // Hello world!w
//   // postgresql://pantharev:MvhBG9cbiuF7@ep-falling-fog-a49f3jev.us-east-1.aws.neon.tech/weather-subs?sslmode=require

//   // console.log("formData: ", formData);
//   return new NextResponse("Subscription created", 
//       { 
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           status: 200 
//       }
//   );
// } catch(err) {
//   console.error(err);
//   return new NextResponse("Error creating subscription", 
//       { 
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           status: 500 
//       }
//   );
 
//   // send email to all subscribers in subscribers table
// }
// }
