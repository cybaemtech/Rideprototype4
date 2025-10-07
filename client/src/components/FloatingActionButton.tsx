import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  label?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  testId?: string;
}

export default function FloatingActionButton({
  icon: Icon,
  onClick,
  label,
  position = "bottom-right",
  variant = "default",
  testId,
}: FloatingActionButtonProps) {
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
      className={cn("fixed z-50", positionClasses[position])}
    >
      <Button
        size="lg"
        variant={variant}
        onClick={onClick}
        className={cn(
          "rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300",
          label ? "px-6 gap-2" : "h-14 w-14 p-0"
        )}
        data-testid={testId}
      >
        <Icon className="h-6 w-6" />
        {label && <span className="font-semibold">{label}</span>}
      </Button>
    </motion.div>
  );
}
