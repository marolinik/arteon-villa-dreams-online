
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
  return <div className={cn("mb-8 md:mb-12", centered && "text-center", className)}>
      <h2 className={cn("text-3xl md:text-4xl font-serif font-semibold mb-3 text-white relative inline-block", titleClassName)}>
        {title}
        <span className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-amber-500 to-villa-terracotta rounded-full"></span>
      </h2>
      {subtitle && <p className="max-w-3xl mt-5 leading-relaxed text-villa-cream">
          {subtitle}
        </p>}
    </div>;
};
