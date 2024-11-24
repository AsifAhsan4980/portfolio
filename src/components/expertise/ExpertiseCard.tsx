import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import React from "react";
import {Card} from "@/components/ui/card";

interface ExpertiseCardProps {
    title: string;
    skills: string[];
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ title, skills }) => {
    return (
        <motion.div
            className="w-full max-w-sm mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }} // Hover scale
            whileTap={{ scale: 0.98 }} // Slight tap effect
        >
            <Card className=" shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>
                <ul className="list-none">
                    {skills.map((skill, index) => (
                        <li key={index} className="flex items-center space-x-2 mb-2">
                            <FaCheckCircle className="text-green-500" />
                            <span >{skill}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        </motion.div>
    );
};

export default ExpertiseCard;
