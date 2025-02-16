"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import { useRouter } from "next/navigation"; // Import useRouter hook
import animationData from "@/assets/animation/Animation - 1732218926437.json"; // Ensure the path is correct

const NotFoundPage: React.FC = () => {
    const [isClient, setIsClient] = useState(false); // State to track if it's client-side
    const router = useRouter(); // Initialize router

    // Check if it's client-side to avoid SSR issues with useRouter
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Function to navigate to homepage using Next.js router
    const goHome = () => {
        router.push("/"); // Navigate to the home page
    };

    if (!isClient) {
        return null; // Prevent rendering on the server-side
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
            {/* Lottie Animation */}
            <div className="mb-8 w-full max-w-lg">
                <Lottie animationData={animationData} loop={true} />
            </div>

            {/* 404 Message */}
            <h1 className="text-4xl font-semibold mb-4">Oops! Page Not Found</h1>
            <p className="text-lg mb-6">
                The page you are looking for might have been moved or doesn&apos;t exist.
            </p>

            {/* Go Back to Homepage Button */}
            <button
                onClick={goHome}
                className="px-6 py-3 border border-gray-500  rounded-lg hover:bg-gray-200 transition-all duration-300 ease-in-out"
            >
                Go Back to Homepage
            </button>
        </div>
    );
};

export default NotFoundPage;
