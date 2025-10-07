import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, CarFront, Crown } from "lucide-react";
import { motion } from "framer-motion";

const rideIcons = {
  mini: Users,
  prime: Briefcase,
  suv: CarFront,
  luxury: Crown,
};

interface RideTypeCardProps {
  type: "mini" | "prime" | "suv" | "luxury";
  name: string;
  description: string;
  pricePerKm: number;
  eta: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function RideTypeCard({
  type,
  name,
  description,
  pricePerKm,
  eta,
  isSelected,
  onSelect,
}: RideTypeCardProps) {
  const Icon = rideIcons[type];

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        className={`cursor-pointer transition-all ${
          isSelected
            ? "border-primary border-2 bg-primary/5"
            : "border-2 border-transparent hover-elevate"
        }`}
        onClick={onSelect}
        data-testid={`card-ride-type-${type}`}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${isSelected ? "bg-primary/20" : "bg-muted"}`}>
                <Icon className={`h-6 w-6 ${isSelected ? "text-primary" : ""}`} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
                <p className="text-xs text-muted-foreground mt-1">ETA: {eta}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">₹{pricePerKm}</p>
              <p className="text-xs text-muted-foreground">per km</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
