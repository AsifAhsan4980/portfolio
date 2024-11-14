"use client"
import {motion} from "framer-motion";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface Project {
    name: string;
    type: string;
    image: string;
    description: string;
    id: string;
    timeLine: string;
    technologies: string[];
    responsibilities: string;
    status: string;
    website: string;
}

// Array of projects with complete data
const project: Project[] = [
    {
        name: "Ticket Tomorrow",
        type: "Ticketing Ecommerce",
        image: "https://s3.ap-southeast-1.amazonaws.com/www.cdntickettomorrow.com/public/meta/metaTickettomorrow.jpg.jpeg",
        description: "An online ticketing platform that facilitates easy purchase and management of event tickets. The project includes both frontend and backend development, providing secure payment options and managing user authentication.",
        id: "1",
        timeLine: "September 2023 - Present",
        technologies: ["Next.js", "React", "Redux", "AWS (Lambda, AppSync, DynamoDB)", "GraphQL", "TypeScript"],
        responsibilities: "Developed the frontend using Next.js and React, implemented AWS services for a serverless backend, integrated multiple payment gateways like Bkash and SSL for user convenience.",
        status: "Ongoing",
        website: "https://tickettomorrow.com"
    },
    {
        name: "Tribel",
        type: "Social Media",
        image: "https://cdntribel.com/public/uploads/post_images/Tribel_logo.png",
        description: "A hybrid social media platform that combines features of Facebook and Twitter, targeted primarily towards the US audience. The platform focuses on user engagement, content sharing, and community building.",
        id: "2",
        timeLine: "June 2022 - Present",
        technologies: ["React", "Node.js", "MongoDB", "Express", "AWS (S3, Amplify)", "JavaScript"],
        responsibilities: "Led the development of interactive social media features, managed data storage on MongoDB, and optimized performance for large-scale user interactions.",
        status: "Active",
        website: "https://tribel.com"
    },
    {
        name: "Wozaif",
        type: "Job Recruitment",
        image: "https://www.wozaif.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FcommonHero.ec0c1a1d.png&w=1920&q=75",
        description: "A job recruitment platform designed to connect job seekers and employers across Asia. The platform includes advanced search, filtering, and application management features, focusing on a user-friendly experience for both job seekers and recruiters.",
        id: "3",
        timeLine: "January 2024 - Present",
        technologies: ["Next.js", "React", "i18n for localization", "AWS (Lambda, AppSync, S3, Cognito)", "GraphQL", "TypeScript"],
        responsibilities: "Developed and optimized the job search and application modules, integrated multilingual support for a diverse audience in Asia, and managed backend APIs with AWS AppSync and Lambda for seamless functionality.",
        status: "Ongoing",
        website: "https://dev.djxlw0btr3uzt.amplifyapp.com/"
    },
    {
        name: "Pipo Bazar",
        type: "E-commerce Marketplace",
        image: "https://api.pipobazar.com/images/images-1688135566889.jpg",
        description: "An e-commerce platform designed to connect small vendors and customers in emerging markets. The platform offers product listings, advanced search and filter options, and secure payment methods, creating a user-friendly online marketplace experience.",
        id: "4",
        timeLine: "March 2024 - October 2024",
        technologies: ["React", "Redux", "Node.js", "AWS (Lambda, S3, DynamoDB, Cognito)", "Stripe API", "TypeScript"],
        responsibilities: "Developed the core e-commerce functionalities, integrated a secure payment system using Stripe, and optimized the user interface to improve user engagement and ease of navigation for product discovery.",
        status: "Finished",
        website: "https://pipobazar.com"
    },
    {
        name: "Azan Backend and Dashboard",
        type: "Islamic Services Platform",
        image: "data:image/jpeg;base64,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",
        description: "A backend system and admin dashboard for managing prayer times, notifications, and user data for an Islamic services platform. The dashboard includes tools for monitoring user activity, managing content, and scheduling Azan notifications based on location.",
        id: "5",
        timeLine: "January 2022 - March 2022",
        technologies: ["Node.js", "Express", "MongoDB", "AWS (Lambda, S3, DynamoDB)", "React", "TypeScript"],
        responsibilities: "Developed a RESTful API to handle user data and prayer time calculations, designed a responsive admin dashboard for managing schedules and notifications, and implemented location-based Azan time updates.",
        status: "Finished",
        website: "" // Placeholder URL
    },
    {
        name: "Doodle Odoo",
        type: "Company Portfolio",
        image: "https://s3.ap-southeast-1.amazonaws.com/www.thedoodleinc.com/other_doodle_images/OG-Home.png",
        description: "A portfolio website for Doodle, showcasing company achievements, services, and project highlights. Designed to represent the company's brand and provide information on its mission and work.",
        id: "6",
        timeLine: "May 2024 - August 2024",
        technologies: ["Next.js", "React", "i18n for localization", "AWS Amplify", "TypeScript"],
        responsibilities: "Implemented the company portfolio site with multilingual support using i18n, focusing on responsiveness and optimized performance with AWS Amplify.",
        status: "Finished",
        website: "https://main.d366eb4x13z3cz.amplifyapp.com"
    }
];

const Projects = () => {
    return (
        <div className="container mt-10">
            <div>
                <h1 className="text-center text-2xl font-semibold mb-8 sm:text-3xl xs:text-4xl">
                    Projects
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-10">
                {project.map((item) => (
                    <motion.div
                        key={item.id}
                        className="cursor-pointer"
                        initial={{opacity: 0.8}}
                        whileHover={{scale: 1.01, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)"}}
                        whileTap={{scale: 0.98}}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                        onClick={() => window.open(item.website, "_blank")}
                    >
                        <Card className="relative shadow-lg hover:shadow-2xl transition-all rounded-lg">
                            <CardHeader>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="object-cover w-full h-48 rounded-t-lg"
                                />
                                <CardTitle className="text-xl font-semibold mt-4 ">{item.name}</CardTitle>
                                <div className="flex justify-between mt-2">
                                    <CardDescription className="text-sm ">{item.type}</CardDescription>
                                    <p className=" text-xs mt-2">{item.timeLine}</p>
                                </div>
                            </CardHeader>

                            <CardContent className="min-h-[12rem] p-4 pt-0">
                                <p className=" text-base leading-relaxed">{item.description}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>


            {/*<div className="container mt-10">*/}
            {/*    <h2 className="text-center text-4xl font-semibold mb-8 text-gray-900">Project Timeline</h2>*/}
            {/*    <div className="relative">*/}
            {/*        <div*/}
            {/*            className="border-l-4 border-gray-300 absolute h-full left-1/2 transform -translate-x-1/2"></div>*/}
            {/*        <div className="space-y-8">*/}
            {/*            {project.map((item, index) => (*/}
            {/*                <motion.div*/}
            {/*                    key={item.id}*/}
            {/*                    className="relative flex items-center space-x-4"*/}
            {/*                    initial={{opacity: 0}}*/}
            {/*                    whileInView={{opacity: 1}}*/}
            {/*                    transition={{duration: 0.5, delay: index * 0.2}}*/}
            {/*                >*/}
            {/*                    <div*/}
            {/*                        className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">*/}
            {/*                        <span className="text-xl font-semibold">{index + 1}</span>*/}
            {/*                    </div>*/}
            {/*                    <div className="flex-1">*/}
            {/*                        <div className="bg-white p-4 shadow-lg rounded-lg">*/}
            {/*                            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>*/}
            {/*                            <p className="text-sm text-gray-500">{item.timeLine}</p>*/}
            {/*                            <p className="text-gray-700 mt-2">{item.description}</p>*/}
            {/*                            <a*/}
            {/*                                href={item.website}*/}
            {/*                                target="_blank"*/}
            {/*                                rel="noopener noreferrer"*/}
            {/*                                className="text-blue-500 mt-3 inline-block"*/}
            {/*                            >*/}
            {/*                                Visit Website*/}
            {/*                            </a>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </motion.div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default Projects;
