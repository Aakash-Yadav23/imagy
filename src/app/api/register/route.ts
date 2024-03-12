import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/actions/user.actions";
import bcrypt from 'bcryptjs';
import { CreateUserParams, User } from "@/types";
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET; // Replace 'your_secret_key' with your actual secret key

const POST = async (request: Request): Promise<Response> => {
  try {
    const { email, firstName, lastName, username, password } = await request.json() as CreateUserParams;

    // Check if all required fields are provided
    if (!email || !firstName || !lastName || !username || !password) {
      return NextResponse.json({ message: "Fields required" }, { status: 400, statusText: 'Bad Request' });
    }

    // Check if a user with the given email already exists
    const existingUser = await getUserByEmail(email);

    // Fetch user by email, don't pass password
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409, statusText: 'Conflict' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const user = {
      password: hashedPassword,
      email,
      username,
      firstName,
      lastName,
      photo: 'https://github.com/shadcn.png',
    };

    // Create user in database
    const newUser = await createUser(user);



    // Create JWT token
    if (secretKey) {
      const { password, ...send_this } = newUser;
      const token = jwt.sign({ user: send_this }, secretKey, { expiresIn: '72' });
      // Set the cookie using the NextResponse object
      const response = NextResponse.json({ message: "OK", token });
      response.cookies.set('token', token, { secure: true, httpOnly: true, expires: 3000000 });
      return response;
    }

    return NextResponse.json({ message: "Token Not Found" }, { status: 200, statusText: 'false' });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500, statusText: 'Internal Server Error' });
  }
}

export { POST }