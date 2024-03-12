import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { User } from '@/types';

const secretKey = process.env.JWT_SECRET; // Replace 'your_secret_key' with your actual secret key



const GET = async () => {

    try {
        const cookiesFromRequest = cookies();

        // Get a specific cookie by name
        const token = cookiesFromRequest.get('token')?.value;


        if (!token) {
            return NextResponse.json(
                { message: 'Authorization header missing' },
                { status: 401 }
            );
        }
        if (secretKey) {

            const decoded = jwt.verify(token, secretKey) as { user: User };
            const user = decoded.user;

            // Fetch user details from the database or data source
            // const user = await getUserById(userId);

            if (!user) {
                return NextResponse.json({ message: 'User not found' }, { status: 404 });
            }
            return NextResponse.json({ user }, { status: 200, statusText: "ok" });
        }
        return NextResponse.json({
            message: "Token Not Found"
        }, {
            status: 200,
            statusText: 'false'
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Invalid token' },
            { status: 401 }
        );
    }
};



export { GET };