"use client";
import { FC } from "react";
import { FaPhone, FaEnvelope, FaUser } from "react-icons/fa"; // Icons will remain neutral

const MyContact: FC = () => {
    return (
        <div className="max-w-lg mx-auto p-4 space-y-4">
            <h2 className="text-2xl font-semibold">Contact Information</h2>

            {/* Name */}
            <div className="flex items-center space-x-3">
                <FaUser className="text-xl" />
                <p className="text-lg font-medium">Asif Ahsan</p>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-3">
                <FaPhone className="text-xl" />
                <p className="text-lg font-medium">+8801795870994</p>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3">
                <FaEnvelope className="text-xl" />
                <p className="text-lg font-medium">asifahsan727@gmail.com</p>
            </div>

            {/* Optional SVG Image */}
            <div className="mt-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-16 h-16 mx-auto"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default MyContact;
