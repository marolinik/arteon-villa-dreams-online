import { ReactNode } from "react";
interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  height?: string;
  backgroundImage?: string;
  children?: ReactNode;
}
const HeroSection = ({
  title,
  subtitle,
  description,
  height = "h-[100vh]",
  backgroundImage,
  children
}: HeroSectionProps) => {
  return <section className={`relative ${height} min-h-[600px] flex items-center justify-center overflow-hidden`}>
      {/* Plain background color fallback */}
      <div className="absolute inset-0 bg-[#07091A]" />
      
      {/* Image behind text (if provided) */}
      {backgroundImage && <img src={backgroundImage} alt="Villa backdrop" className="absolute inset-0 w-full h-full object-cover z-0" />}
      
      {/* Semi-transparent overlay for better text readability */}
      
      
      {/* Content */}
      
    </section>;
};
export default HeroSection;