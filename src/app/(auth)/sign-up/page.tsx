'use client'
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod'; // Import Zod

import useAuthStore from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
  // photo: File | null;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

// Define Zod schema for form validation
const schema = z.object({
  email: z.string().email(),
  // photo: z.instanceof(File).nullable(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(4),
  password: z.string().min(6),
});

const SigUp = () => {
  const { login, isLoading, createUserAccount } = useAuthStore();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    // photo: null,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate form data against schema
      schema.parse(formData);

      // Handle login or register logic here
      await createUserAccount(formData); // Pass formData to login function
      router.push('/')

      console.log(formData);
    } catch (error) {
      // If validation fails, display error message
      console.error('Form validation error:', error);
      toast.error('Invalid form data. Please check your inputs.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'photo' ? files?.[0] || null : value,
    }));
  };

  return (
    <div className="flex justify-center items-center h-auto ">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md w-full"
            />
          </div>

          <>
            {/* <div>
              <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">
                Photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md w-full"
              />
            </div> */}
            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md w-full"
              />
            </div>
          </>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Register
          </button>
          <h1 className='mx-auto text-center text-sm'>
            Or
          </h1>

          <Link href={`/sign-in`} className='w-full'>
            <button
              type="button"

              className="bg-gray-300 text-gray-700 w-full py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300"
            >
              Login

            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SigUp;
