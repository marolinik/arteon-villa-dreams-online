
import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  height?: string;
  backgroundImage?: string;
  children?: ReactNode;
}

const HeroSection = ({ 
  title, 
  subtitle, 
  height = "h-[100vh]",
  backgroundImage,
  children 
}: HeroSectionProps) => {
  return (
    <section className={`relative ${height} min-h-[600px] flex items-center justify-center overflow-hidden`}>
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
      
      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-[#07091A]/60 z-10"></div>
      
      {/* Content */}
      <div className="container relative z-20 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-3xl text-amber-400 font-serif mb-16 max-w-3xl">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

export default HeroSection;
