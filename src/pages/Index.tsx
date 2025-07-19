import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceCategories from "@/components/ServiceCategories";
import TechnicianList from "@/components/TechnicianList";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ServiceCategories />
      <HowItWorks />
      <TechnicianList />
      <Footer />
    </div>
  );
};

export default Index;
