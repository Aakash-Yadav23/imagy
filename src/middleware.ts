import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { cookies } from 'next/headers';

const secretKey = process.env.JWT_SECRET as string; // Replace 'your_secret_key' with your actual secret key

export function middleware(request: NextRequest) {
    const url = request.nextUrl;

    const cookiesFromRequest = cookies();
    const publicRouts = ['/profile']
    // Get a specific cookie by name
    const token = cookiesFromRequest.get('token')?.value;




    if (url.pathname === '/') {
        // If the user is already authenticated angd tries to access the sign-in page,
        // redirect them to the home page
        console.log("here", token)

        if (token) {
            try {
                jwt.verify(token, secretKey);
                return NextResponse.redirect(new URL('/', request.url));
            } catch (error) {
                // If the token is invalid, do nothing and let the user access the sign-in page
            }
        }
        else {
            return NextResponse.redirect(new URL('/sign-in', request.url));

        }
        // If the user is not authenticated, allow them to access the sign-in page
        return NextResponse.next();
    }

    // For other pages, check if the user is authenticated
    if (!token && url.pathname === '/') {
        // If the user is not authenticated, redirect them to the sign-in page
        return NextResponse.redirect(new URL('/', request.url));
    }

    try {

        // If the token is valid, allow the user to access the page
        return NextResponse.next();
    } catch (error) {
        console.log(error);
        // If the token is invalid, redirect the user to the sign-in page
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
}

// Apply the middleware to all routes
export const config = {
    matcher: ['/', '/sign-up', '/transformations', '/credits', '/sign-in', '/profile',],
};