import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/sections/Hero";
import SearchSection from "../../components/sections/SearchSection";
import FeaturedInternships from "../../components/sections/FeaturedInternships";
import HowItWorks from "../../components/sections/HowItWorks";
import WhyChooseUs from "../../components/sections/WhyChooseUs";
import Statistics from "../../components/sections/Statistics";
import CTASection from "../../components/sections/CTASection";
import Footer from "../../components/layout/Footer";

function Home() {

  return (
    <>
      <Navbar />
      <Hero />
      <SearchSection />
      <FeaturedInternships />
      <HowItWorks />
      <WhyChooseUs />
      <Statistics />
      <CTASection />
      <Footer />
    </>
  );

}

export default Home;