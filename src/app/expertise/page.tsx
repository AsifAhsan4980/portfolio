"use client"
import React from "react";
import { motion } from "framer-motion"; // Import framer-motion
import ExpertiseCard from "@/components/expertise/ExpertiseCard";
import Head from "next/head";

const expertiseData = [
    {
        title: "Frontend",
        skills: ["React.js", "Next.js", "Angular"],
    },
    {
        title: "Backend",
        skills: ["Node.js", "Express", "AWS AppSync", "AWS Amplify"],
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
        skills: ["TypeScript", "JavaScript", "Java"],
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
            <Head>
                <title>Asif Ahsan | Senior Software Engineer | JavaScript, React, Next.js, AWS</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="UTF-8"/>

                <meta name="description"
                      content="🚀 Senior Software Engineer with expertise in JavaScript, TypeScript, React, Next.js, Angular, and AWS serverless technologies. Passionate about building scalable and high-performance web applications."/>
                <meta name="keywords"
                      content="Software Engineer, JavaScript, TypeScript, React, Next.js, AWS, Serverless, Web Development"/>
                <meta name="author" content="Asif Ahsan"/>

                {/* Open Graph (Facebook, LinkedIn, etc.) */}
                <meta property="og:title" content="Asif Ahsan | Senior Software Engineer | JavaScript, React, Next.js, AWS"/>
                <meta property="og:description"
                      content="E🚀 Senior Software Engineer with expertise in JavaScript, TypeScript, React, Next.js, Angular, and AWS serverless technologies. Passionate about building scalable and high-performance web applications."/>
                <meta property="og:image" content="/assets/images/asifahsan.jpg"/>
                <meta property="og:url" content="https://asifahsan.com/"/>
                <meta property="og:type" content="website"/>

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content="Asif Ahsan | Senior Software Engineer | JavaScript, React, Next.js, AWS."/>
                <meta name="twitter:description"
                      content="🚀 Senior Software Engineer with expertise in JavaScript, TypeScript, React, Next.js, Angular, and AWS serverless technologies. Passionate about building scalable and high-performance web applications."/>
                <meta name="twitter:image" content="/assets/images/asifahsan.jpg"/>

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico"/>
            </Head>

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