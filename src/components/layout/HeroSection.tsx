
import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  height?: string;
  children?: ReactNode;
}

const HeroSection = ({ 
  title, 
  subtitle, 
  height = "h-[100vh]",
  children 
}: HeroSectionProps) => {
  return (
    <section className={`relative ${height} min-h-[600px] bg-[#07091A] flex items-center justify-center`}>
      <div className="absolute inset-0 bg-[#07091A]" />
      <div className="container relative flex flex-col justify-center items-center text-white text-center px-4">
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
