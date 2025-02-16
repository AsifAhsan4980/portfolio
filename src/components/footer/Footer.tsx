"use client";
import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="py-4 mt-10">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Asif Ahsan. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
