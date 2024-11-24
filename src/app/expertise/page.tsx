"use client"
import React from "react";
import { motion } from "framer-motion"; // Import framer-motion
import ExpertiseCard from "@/components/expertise/ExpertiseCard";

const expertiseData = [
    {
        title: "Frontend",
        skills: ["React.js", "Next.js", "Angular"],
    },
    {
        title: "Backend",
        skills: ["Node.js", "Express"],
    },

    {
        title: "CSS Frameworks",
        skills: ["Material UI", "Ant Design", "Bootstrap", "Tailwind", "Shadcn"],
    },
    {
        title: "Databases",
        skills: ["MongoDB", "Firebase", "DynamoDB", "MySQL"],
    },
    {
        title: "Languages",
        skills: ["TypeScript", "JavaScript", "Java", "C++"],
    },
    {
        title: "DevOps",
        skills: ["AWS", "DigitalOcean"],
    },{
        title: "AWS",
        skills: [
            "Lambda",
            "Cognito",
            "OpenSearch",
            "AppSync",
            "API Gateway",
            "GraphQL",
            "Cloud9",
            "EC2",
            "DynamoDB",
            "Amplify",
            "S3",
            "AWS Glue",
            "AWS MediaConvert",
            "Route53",
        ],
    },
];

const Expertise: React.FC = () => {
    return (
        <div className={"container"}>

            <motion.div
                className="min-h-screen  p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }} // Smooth page fade-in transition
            >
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.h1
                        className="text-4xl font-extrabold "
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        My Expertise
                    </motion.h1>
                    <p className="text-xl mt-2">
                        Technologies I specialize in
                    </p>
                </div>

                {/* Expertise Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {expertiseData.map((category, index) => (
                        <ExpertiseCard
                            key={index}
                            title={category.title}
                            skills={category.skills}
                        />
                    ))}
                </div>
            </motion.div>


        </div>

    );
};

export default Expertise