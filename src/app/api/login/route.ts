import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'; // Import JWT library

import { getUserByEmail } from "@/lib/actions/user.actions";
import { verifyPassword } from "@/lib/password";
import { LoginParams } from "@/types";
import { NextApiResponse } from "next";

const secretKey = process.env.JWT_SECRET; // Replace 'your_secret_key' with your actual secret key


async function POST(request: NextRequest, res: NextApiResponse) {
    try {    // try {


        const { email, password } = await request.json() as unknown as LoginParams;

        console.log("Data Recieved", email, password);


        if (!email || !password) {
            return NextResponse.json({
                message: "Fields required"
            }, {
                status: 200,
                statusText: 'false'
            });
        }


        console.log("Data 2");

        const user = await getUserByEmail(email);

        if (!user) {
            return NextResponse.json({
                message: "Invalid credentials"
            }, {
                status: 401,
                statusText: 'Unauthorized'
            });
        }

        console.log("User1", user);

        const isValid = await verifyPassword(
            password,
            user.password
        );

        if (!isValid) {
            return NextResponse.json({
                message: "Invalid credentials"
            }, {
                status: 401,
                statusText: 'Unauthorized'
            });
        }    // Authenticate user

        console.log("IsValid", isValid);
        console.log("Data Recieved", email, password);


        if (secretKey) {


            // Create JWT token
            const token = jwt.sign({ user: user }, secretKey, { expiresIn: '1h' });
            cookies().set('token', token, { secure: true })

            return NextResponse.json({ message: "OK", token });
        }
        return NextResponse.json({
            message: "Token Not Found"
        }, {
            status: 200,
            statusText: 'false'
        });


    } catch (error: any) {
        console.log("Login Error", error);

        NextResponse.json({ message: "Something went wrong", error });
        throw new Error(error)
    }

}
export { POST }
