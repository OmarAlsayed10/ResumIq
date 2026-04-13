import { useAuth } from "../../hooks/useAuth";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import PricingSection from "./PricingSection";

const Home = () => {
  const { user } = useAuth();
  const isPro = user?.role === "pro user";
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </>
  );
};
export default Home;
