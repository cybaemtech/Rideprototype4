import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface SurgePricingIndicatorProps {
  surgeMultiplier: number;
}

export default function SurgePricingIndicator({ surgeMultiplier }: SurgePricingIndicatorProps) {
  if (surgeMultiplier <= 1) return null;

  const getSurgeColor = (multiplier: number) => {
    if (multiplier >= 2) return "destructive";
    if (multiplier >= 1.5) return "default";
    return "secondary";
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex items-center gap-2"
    >
      <Badge variant={getSurgeColor(surgeMultiplier)} className="flex items-center gap-1">
        <TrendingUp className="h-3 w-3" />
        <span>{surgeMultiplier}x Surge Pricing</span>
      </Badge>
    </motion.div>
  );
}
