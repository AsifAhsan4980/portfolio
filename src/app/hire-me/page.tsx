import EmailSentOption from "@/components/hire-me/emailSentOption";
import MyContact from "@/components/hire-me/myContact";
import Head from "next/head";

const HireME = () => {
    return (
        <div className="container mx-auto mt-10 p-4 lg:p-8">
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
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
                {/* Left Side - Email Sent Option */}
                <div className="space-y-6">
                    <EmailSentOption />
                </div>

                {/* Divider Line */}
                <div
                    className="
            absolute inset-0
            lg:h-full lg:w-px lg:top-0 lg:left-1/2
            bg-gray-300 dark:bg-gray-600
            w-full h-px lg:my-0 my-6
          "
                    aria-hidden="true"
                />

                {/* Right Side - My Contact */}
                <div className="space-y-6">
                    <MyContact />
                </div>
            </div>
        </div>
    );
};

export default HireME;
