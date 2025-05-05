
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
  return (
    <section className={`relative ${height} min-h-[600px] flex items-center overflow-hidden`}>
      {/* Plain background color fallback */}
      <div className="absolute inset-0 bg-[#07091A]" />
      
      {/* Image behind text (if provided) */}
      {backgroundImage && (
        <img 
          src={backgroundImage} 
          alt="Villa backdrop" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Content */}
      <div className="container relative z-20 flex flex-col justify-end items-start text-white px-4 pb-32">
        {title && (
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-white">
            {title}
          </h1>
        )}
        {subtitle && (
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-white">
            {subtitle}
          </h2>
        )}
        {description && (
          <p className="text-xl md:text-2xl text-[#9fd580] font-normal mb-16 max-w-3xl">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

export default HeroSection;
