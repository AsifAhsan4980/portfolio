// import {Button} from "@/components/ui/button";
// import {FiDownload} from "react-icons/fi";
import PortfolioHeader from "@/components/home/PortfolioHeader";
import PartnerBox from "@/components/home/PartnerBox";
import ContentSection from "@/components/home/ContentSection";
// import ServicesSection from "@/components/home/ServicesSection";
// import FeaturedWork from "@/components/home/FeaturedWork";
// import BlogSection from "@/components/home/BlogSection";
// import TestimonialSection from "@/components/home/TestimonialSection";

export default function Home() {
  return (
      <section>
          <div>
              <PortfolioHeader/>
              <PartnerBox/>
              <ContentSection/>
              {/*<ServicesSection/>*/}
              {/*<FeaturedWork/>*/}
              {/*<BlogSection/>*/}
              {/*<TestimonialSection/>*/}
          </div>
      </section>

  );
}
