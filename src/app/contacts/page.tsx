"use client";
import { motion } from "framer-motion";
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect } from "react";
import {useTheme} from "next-themes";

interface ContactInfo {
    email: string;
    phone: { number: string; isWhatsApp: boolean }[];
    address: string;
    socialLinks: {
        platform: string;
        url: string;
        icon: JSX.Element;
    }[];
}

const ContactPage: React.FC = () => {

    const { theme } = useTheme()

    console.log(theme)

    const contactInfo: ContactInfo = {
        email: "asifahhsan727@gmail.com",
        phone: [
            { number: "+8801795870994", isWhatsApp: false },
            { number: "+8801685436578", isWhatsApp: true },
        ],
        address: "35/c Shah Alibag, Mirpur 1, Dhaka, Bangladesh",
        socialLinks: [
            {
                platform: "Facebook",
                url: "https://www.facebook.com/asif.ahsan727/",
                icon: <FaFacebook size={30} color="#469D89" />,
            },
            {
                platform: "Instagram",
                url: "https://www.instagram.com/aragorn_isildurr/",
                icon: <FaInstagram size={30} color="#469D89" />,
            },
            {
                platform: "LinkedIn",
                url: "https://www.linkedin.com/in/asif-ahsan-27832012b/",
                icon: <FaLinkedin size={30} color="#469D89" />,
            },
            {
                platform: "GitHub",
                url: "https://github.com/AsifAhsan4980",
                icon: <FaGithub size={30} color="#469D89" />,
            },
        ],
    };

    useEffect(() => {
        const latitude = 23.7956785;
        const longitude = 90.3597853;

        // Replace with your Mapbox access token
        mapboxgl.accessToken = "pk.eyJ1IjoiZG9vZGxlZm9ydHQiLCJhIjoiY2xvcGNiczRwMGFkMDJxcDU0c3g2dTA2MyJ9.fZI7Sl23QkIDT56_dIkNBQ";

        // Initialize map
        const map = new mapboxgl.Map({
            container: "mapbox-map",
            // style: "mapbox://styles/mapbox/streets-v12",
            style: theme === "dark" ? "mapbox://styles/mapbox/dark-v10" : "mapbox://styles/mapbox/streets-v12",
            center: [longitude, latitude],
            zoom: 13,
        });

        // Add a marker to the map
        new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

        // Cleanup function to remove the map on unmount
        return () => {
            map.remove();
        };
    }, [theme]); // The empty dependency array ensures this runs only once on mount

    return (
        <main className="min-h-screen p-6 flex flex-col items-center">
            {/* Header */}
            <motion.div
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                className="text-center"
            >
                <h1 className="text-3xl font-bold">Contact Me</h1>
                <p className="mt-2">Let’s get connected!</p>
            </motion.div>

            {/* Social Links Section */}
            <motion.div
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.2}}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8 w-full max-w-4xl"
            >
                {contactInfo.socialLinks.map((link, index) => (
                    <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center border border-gray-300 rounded-lg p-4 hover:shadow-lg"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        <div className="flex flex-col items-center">
                            {link.icon}
                            <span className="mt-2 text-sm">{link.platform}</span>
                        </div>
                    </motion.a>
                ))}
            </motion.div>

            {/* Contact Info Section */}
            <motion.div
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.4}}
                className="mt-12 w-full max-w-4xl"
            >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 text-center">
                    {/* Email */}
                    <div className="flex flex-col items-center">
                        <FaEnvelope size={30}/>
                        <h2 className="font-semibold text-lg mt-2">Email</h2>
                        <p>{contactInfo.email}</p>
                    </div>

                    {/* Phone Numbers */}
                    <div className="flex flex-col items-center">
                        <FaPhone size={30}/>
                        <h2 className="font-semibold text-lg mt-2">Phone</h2>
                        {contactInfo.phone.map((phone, index) => (
                            <p key={index}>
                                {phone.isWhatsApp ? (
                                    <a
                                        href={`https://wa.me/${phone.number.replace("+", "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline"
                                    >
                                        {phone.number} (WhatsApp)
                                    </a>
                                ) : (
                                    phone.number
                                )}
                            </p>
                        ))}
                    </div>

                    {/* Address */}
                    <div className="flex flex-col items-center">
                        <FaMapMarkerAlt size={30}/>
                        <h2 className="font-semibold text-lg mt-2">Address</h2>
                        <p>{contactInfo.address}</p>
                    </div>
                </div>
            </motion.div>

            {/* Map */}
            <div
                id="mapbox-map"
                className="w-full lg:w-3/4 xl:w-1/2 h-72 lg:h-96 mt-12 rounded-lg shadow-lg"
            ></div>

        </main>
    );
};

export default ContactPage;
