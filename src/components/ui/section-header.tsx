
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
}

export const SectionHeader = ({ 
  title, 
  subtitle, 
  centered = false, 
  className,
  titleClassName
}: SectionHeaderProps) => {
  return (
    <div className={cn(
      "mb-8 md:mb-12",
      centered && "text-center",
      className
    )}>
      <h2 className={cn(
        "text-3xl md:text-4xl font-serif font-semibold mb-3 text-villa-navy relative inline-block",
        titleClassName
      )}>
        {title}
        <span className="absolute -bottom-1 left-0 w-16 h-1 bg-villa-teal rounded-full"></span>
      </h2>
      {subtitle && (
        <p className="text-gray-600 max-w-3xl mx-auto mt-5">
          {subtitle}
        </p>
      )}
    </div>
  );
};
