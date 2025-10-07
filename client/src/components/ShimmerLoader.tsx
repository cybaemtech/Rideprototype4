import { cn } from "@/lib/utils";

interface ShimmerLoaderProps {
  className?: string;
}

export default function ShimmerLoader({ className }: ShimmerLoaderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted rounded-md",
        "before:absolute before:inset-0",
        "before:-translate-x-full",
        "before:animate-[shimmer_2s_infinite]",
        "before:bg-gradient-to-r",
        "before:from-transparent before:via-white/10 before:to-transparent",
        className
      )}
      data-testid="shimmer-loader"
    />
  );
}
