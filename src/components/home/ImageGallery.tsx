import React from "react";

type abc = {
    number: string,
    text:string
}

 function ImageGallery() {
    const images: abc[] = [
        {
            number: "5+",
            text: "Years of Experience"
        },
        {
            number: "20+",
            text: "Satisfied Customers"
        },
        {
            number: "10+",
            text: "Delivered Project"
        },
        {
            number: "12+",
            text: "Projects are  Live"
        },
        {
            number: "15+",
            text: "Success on Fiver"
        }
    ];

    return (
        <div className="mt-10 max-w-full w-[447px]">
            <div className="flex gap-5 max-md:flex-col">
                {images.map((src, index) => (
                    <div key={index} className="w-[33%] max-md:ml-0 max-md:w-full">
                        <div
                            className="w-[130px] h-[160px] bg-gray-100 dark:bg-[#1a1b1e] text-gray-800 dark:text-white flex flex-col justify-center rounded-lg p-2"
                        >
                            <h1 className="text-[48px] font-bold text-[#469d89] m-0">
                                {src?.number}
                            </h1>
                            <p className="text-[14px] text-gray-600 dark:text-gray-400 mt-1">
                                {src.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
 }

export default ImageGallery
