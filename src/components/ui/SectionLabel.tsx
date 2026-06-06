import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function SectionLabel({ children, className, light = false }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className={cn("h-px w-12", light ? "bg-gold/50" : "bg-gold")} />
      <span
        className={cn(
          "text-xs tracking-widest uppercase font-sans",
          light ? "text-gold" : "text-gold"
        )}
      >
        {children}
      </span>
    </div>
  );
}
