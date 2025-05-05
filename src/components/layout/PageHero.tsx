
import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  height?: string;
  backgroundImage?: string;
  children?: ReactNode;
}

const PageHero = ({ 
  title, 
  subtitle, 
  height = "h-[50vh]", 
  backgroundImage,
  children 
}: PageHeroProps) => {
  return (
    <section className={`relative ${height} min-h-[400px] flex items-center justify-center`}>
      {/* Background - either image or plain color */}
      {backgroundImage ? (
        <>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }} />
          <div className="absolute inset-0 bg-[#0F1524]/70" /> {/* Overlay for better text visibility */}
        </>
      ) : (
        <div className="absolute inset-0 bg-[#0F1524]" />
      )}
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-white leading-tight tracking-wide">
          {title}
        </h1>
        {subtitle && (
          <p className="text-2xl md:text-3xl text-amber-400 max-w-3xl mx-auto font-light">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
};

export default PageHero;
