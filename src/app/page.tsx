import PortfolioHeader from "@/components/home/PortfolioHeader";
import PartnerBox from "@/components/home/PartnerBox";
import TechStack from "@/components/home/TechStack";
import ContentSection from "@/components/home/ContentSection";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import CareerTimeline from "@/components/home/CareerTimeline";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
      <div>
          <PortfolioHeader/>
          <PartnerBox/>
          <StatsSection/>
          <TechStack/>
          <ContentSection/>
          <ServicesSection/>
          <CareerTimeline/>
          <CtaSection/>
      </div>
  );
}
