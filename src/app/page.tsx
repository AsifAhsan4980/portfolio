import PortfolioHeader from "@/components/home/PortfolioHeader";
import PartnerBox from "@/components/home/PartnerBox";
import ContentSection from "@/components/home/ContentSection";
import Head from "next/head";
// import ServicesSection from "@/components/home/ServicesSection";
// import FeaturedWork from "@/components/home/FeaturedWork";
// import BlogSection from "@/components/home/BlogSection";
// import TestimonialSection from "@/components/home/TestimonialSection";


export default function Home() {
  return (
      <>
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
          <div>
              <PortfolioHeader/>
              <PartnerBox/>
              <ContentSection/>
              {/*<ServicesSection/>*/}
              {/*<FeaturedWork/>*/}
              {/*<BlogSection/>*/}
              {/*<TestimonialSection/>*/}
          </div>
      </>

  );
}
