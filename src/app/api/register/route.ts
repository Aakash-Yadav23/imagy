/* eslint-disable camelcase */
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
const POST = async (request: Request) => {
    const { email, photo, firstName, lastName, username } = await request.json() as unknown as CreateUserParams;

    const user = {
        clerkId: '1',
        email,
        username,
        firstName,
        lastName,
        photo,
    };

    const newUser = await createUser(user);



    return NextResponse.json({ message: "OK", user: newUser });
}

// UPDATE



export { POST }