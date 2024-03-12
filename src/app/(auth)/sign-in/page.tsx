'use client'
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod'; // Import Zod

import useAuthStore from '@/hooks/useAuth';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
  password: string;
};

// Define Zod schema for form validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const SigIn = () => {
  const { login, isLoading } = useAuthStore();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate form data against schema
      schema.parse(formData);

      // Handle login or register logic here
      const res = await login(formData); // Pass formData to login function
      router.push('/')
      console.log(formData);
    } catch (error) {
      // If validation fails, display error message
      console.error('error', error);
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
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              disabled={isLoading}
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              disabled={isLoading}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 flex items-center text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >

            {
              isLoading ? <Loader className='animate-spin' /> : <span className='text-center'>
                Login
              </span>

            }



          </button>

          <h1 className='mx-auto text-center text-sm'>
            Or
          </h1>

          <Link href={`/sign-up`} className='w-full'>
            <button
              type="button"
              disabled={isLoading}
              className="bg-gray-300 text-gray-700 w-full py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300"
            >
              Register

            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SigIn;
