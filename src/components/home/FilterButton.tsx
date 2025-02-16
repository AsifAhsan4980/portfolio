"use client";
import React from "react";

interface FilterButtonProps {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
                                                              label,
                                                              isActive = false,
                                                              onClick,
                                                          }) => {
    return (
        <button
            onClick={onClick}
            className={`px-14 py-5 text-base font-semibold tracking-wide whitespace-nowrap  rounded-lg border border-gray-100 border-solid cursor-pointer max-md:px-8 max-md:py-4 max-md:text-sm max-sm:px-5 max-sm:py-3 max-sm:text-center ${
                isActive ? "bg-gray-50 text-black" : ""
            }`}
        >
            {label}
        </button>
    );
};
