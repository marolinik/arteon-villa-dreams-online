
import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  height?: string;
  backgroundClass?: string;
  children?: ReactNode;
}

const PageHero = ({ 
  title, 
  subtitle, 
  height = "h-[50vh]", 
  backgroundClass = "bg-[#172B4D]",
  children 
}: PageHeroProps) => {
  return (
    <section className={`relative ${height} min-h-[400px] ${backgroundClass} flex items-center justify-center`}>
      <div className="absolute inset-0 bg-[#0F1524]/60" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-amber-400 max-w-2xl mx-auto fade-in">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

export default PageHero;
