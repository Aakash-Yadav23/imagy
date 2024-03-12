'use client'
import { CreateUserParams, LoginParams } from '@/types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { fetchAuthDetails, loginUser, logoutUser, registerUser } from '@/lib/mutations';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    // Add other user properties as needed
}

const useAuthStore = () => {
    const [user, setUser] = useState<any | null>();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const login = async (userData: LoginParams) => {
        setIsLoading(true);
        try {

            const loggedInUser = await loginUser(userData);

            router.push("/")
            toast.success('Login successful');
        } catch (error: any) {
            console.error('Error logging in:', error.response.data.message);
            toast.error(error.response.data.message);
            throw new Error("Login Failed Error", error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUser = async () => {
        setIsLoading(true);
        try {
            const fetchedUser = await fetchAuthDetails();
            setUser(fetchedUser);
            if (pathname.includes('/sign-in')) {
                router.push("/")
            }

            return fetchedUser;
            // toast.success('User details fetched');
        } catch (error: any) {
            console.error('Error fetching user:', error);
            // toast.error('Failed to fetch user details.');
            throw new Error("Fetching Failed Error", error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await logoutUser();
            setUser(null);
            toast.success('Logged out successfully');
            router.push("/sign-in")

        } catch (error: any) {
            console.error('Error logging out:', error);
            toast.error('Logout failed.');
            throw new Error("Logout Failed Error", error);
        } finally {
            setIsLoading(false);
        }
    };

    const createUserAccount = async (userData: CreateUserParams) => {
        setIsLoading(true);
        try {
            await registerUser(userData);
            toast.success('User account created successfully');
            router.push("/")

        } catch (error: any) {
            console.error('Error creating user account:', error);
            toast.error('Failed to create user account.');
            throw new Error("Register Failed: Error", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const fetchedUser = await fetchAuthDetails();
                setUser(fetchedUser);
                if (pathname.includes('/sign-in' || 'sign-up')) {
                    router.push("/")
                }


                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setIsLoading(false); // Set isLoading to false after fetching data
            }
        };

        fetchData();
    }, [pathname, router])

    return {
        user,
        isLoading,
        login,
        fetchUser,
        logout,
        createUserAccount
    };
};

export default useAuthStore;
