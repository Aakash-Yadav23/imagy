import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
const GET = async () => {

    try {
        const cookiesFromRequest = cookies();

        // Get a specific cookie by name
        const token = cookiesFromRequest.delete('token');


        return NextResponse.json({ status: 200, statusText: "ok" });
    } catch (error) {
        return NextResponse.json(
            { message: 'Invalid token' },
            { status: 401 }
        );
    }
};



export { GET };