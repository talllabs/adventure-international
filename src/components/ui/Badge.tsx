import { cn } from "@/lib/utils";

type BadgeVariant = "gold" | "forest" | "ivory";

const variants: Record<BadgeVariant, string> = {
  gold: "bg-gold/20 text-gold border border-gold/30",
  forest: "bg-[#111111] text-white border border-[#1a1a1a]",
  ivory: "bg-white text-[#2a2a2a] border border-[#f0f0f0]",
};

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "gold", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs tracking-widest uppercase font-sans",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
