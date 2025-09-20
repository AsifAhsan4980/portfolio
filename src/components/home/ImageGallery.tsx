import React from 'react';
import { motion } from 'framer-motion';

interface abc {
    number: string;
    text: string;
}

const images: abc[] = [
    { number: '5+', text: 'Years of Experience' },
    { number: '20+', text: 'Satisfied Customers' },
    { number: '10+', text: 'Delivered Project' },
    { number: '12+', text: 'Projects are Live' },
    { number: '15+', text: 'Success on Fiver' },
];

const ImageGallery: React.FC = () => {
    return (
        <div className="mt-10 max-w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {images.map((src, index) => (
                    <motion.div
                        key={index}
                        className="w-full max-w-[160px] mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-full h-[160px] bg-gray-100 dark:bg-[#1a1b1e] text-gray-800 dark:text-white flex flex-col justify-center rounded-lg p-4 shadow-md">
                            <h1 className="text-4xl sm:text-5xl font-bold text-[#469d89] m-0">
                                {src.number}
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
                                {src.text}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;