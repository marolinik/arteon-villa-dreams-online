
import { ReactNode } from "react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  height?: string;
  children?: ReactNode;
}

const HeroSection = ({
  title,
  subtitle,
  description,
  height = "h-[100vh]",
  children
}: HeroSectionProps) => {
  return <section className={`relative ${height} min-h-[600px] flex items-center justify-center overflow-hidden`}>
      {/* Plain background color */}
      <div className="absolute inset-0 bg-[#07091A]" />
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        {title && (
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-4 text-white">
            {title}
          </h1>
        )}
        {subtitle && (
          <h2 className="text-xl md:text-2xl lg:text-2xl font-light mb-8 text-white/90">
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
    </section>;
};

export default HeroSection;
