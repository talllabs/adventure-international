import Image from "next/image";
import { cn } from "@/lib/utils";

interface AspectImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
}

export function AspectImage({
  src,
  alt,
  aspectRatio = "aspect-video",
  className,
  priority = false,
}: AspectImageProps) {
  return (
    <div className={cn("relative overflow-hidden", aspectRatio, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
