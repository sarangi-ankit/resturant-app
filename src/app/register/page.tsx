"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const Register = () => {
    const route = useRouter()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleFormSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                route.push("/login")

            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }


    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
            <div className="w-full max-w-md p-8 space-y-8 bg-custom-background rounded shadow-md">
                <div>
                    <h2 className="text-3xl font-extrabold text-center text-customColor">
                        Sign up to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-customColor">
                        Or{' '}
                        <a href="/login" className="font-medium text-white hover:text-blue-500">
                            login existing account
                        </a>
                    </p>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <div className="rounded-md shadow-sm">
                        <div>

                            <input
                                id="email-address"
                                name="name"
                                type="text"
                                required
                                className="bg-custom-gradient relative block w-full px-3 py-2 text-customColor rounded-b-md focus:z-10 sm:text-sm"
                                onChange={(e: any) => setName(e.target.value)}
                                placeholder="Full Name*"

                            />
                        </div>
                        <div>

                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="mt-7 bg-custom-gradient relative block w-full px-3 py-2 text-customColor rounded-b-md  focus:z-10 sm:text-sm"
                                onChange={(e: any) => setEmail(e.target.value)}
                                placeholder="Email address*"
                            />
                        </div>
                        <div>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-7 bg-custom-gradient relative block w-full px-3 py-2 text-customColor  rounded-b-md focus:z-10 sm:text-sm"
                                onChange={(e: any) => setPassword(e.target.value)}
                                placeholder="Password*"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-secondaryColor hover:bg-customColor border border-transparent rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2"
                            onClick={handleFormSubmit}
                        >
                            {loading ? "Processing..." : "Register"}
                        </button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-customColor"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-customColor bg-custom-gradient">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 mt-6">
                        <div>
                            <button
                                type="button"
                                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-custom-gradient border border-transparent rounded-md group hover:bg-custom-background focus:outline-none focus:ring-2 focus:ring-offset-2"
                                onClick={() => signIn('google', { callbackUrl: '/' })}
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg
                                        className="w-5 h-5 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        width="800px"
                                        height="800px"
                                    >
                                        <path
                                            fill="#4285F4"
                                            d="M24 9.5c3.19 0 5.55 1.23 7.19 2.62L34.54 8C31.25 5.07 27.06 3 21.99 3 13.53 3 6.73 7.65 4.02 14.64l6.84 5.28C12.18 16.19 17.72 9.5 24 9.5z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M46.4 24.52c0-1.72-.15-3.35-.42-4.95H24v9.41h12.9c-.57 3.02-2.28 5.58-4.88 7.31l6.45 5.28c3.77-3.46 6.03-8.58 6.03-15.05z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M4.02 14.64C2.61 18.26 2 22.02 2 26s.61 7.74 2.02 11.36l6.84-5.28C7.43 29.22 6 27.21 6 26s1.43-3.22 4.86-6.08L4.02 14.64z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M24 46c6.06 0 11.17-2.01 14.88-5.5l-6.45-5.28c-2.05 1.39-4.72 2.22-7.43 2.22-6.31 0-11.68-4.08-13.59-9.79l-6.84 5.28C6.73 40.35 13.53 45 21.99 45 27.06 45 31.25 42.93 34.54 40l-3.35-2.88c-1.64 1.39-3.99 2.62-7.19 2.62z"
                                        />
                                    </svg>
                                </span>
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
