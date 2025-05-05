
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
    <section className={`relative ${height} min-h-[600px] flex items-center justify-center overflow-hidden`}>
      {/* Background - either image or plain color */}
      {backgroundImage ? (
        <>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }} />
          <div className="absolute inset-0 bg-[#0F1524]/30" /> {/* Reduced overlay opacity from 70% to 30% */}
        </>
      ) : (
        <div className="absolute inset-0 bg-[#07091A]" />
      )}
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        {title && (
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-white leading-tight tracking-wide">
            {title}
          </h1>
        )}
        {subtitle && (
          <h2 className="text-2xl md:text-3xl text-amber-400 max-w-3xl mx-auto font-light">
            {subtitle}
          </h2>
        )}
        {description && (
          <p className="max-w-2xl mx-auto mb-8 text-white/80">
            {description}
          </p>
        )}
        {children && <div className="mt-8 flex justify-center">{children}</div>}
      </div>
    </section>
  );
};

export default HeroSection;
