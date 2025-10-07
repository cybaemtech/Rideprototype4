import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, Star } from "lucide-react";

interface DriverInfoProps {
  name: string;
  rating: number;
  vehicleModel: string;
  vehicleNumber: string;
  avatar?: string;
}

export default function DriverInfo({
  name,
  rating,
  vehicleModel,
  vehicleNumber,
  avatar,
}: DriverInfoProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatar} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="font-semibold text-lg" data-testid="text-driver-name">{name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span data-testid="text-driver-rating">{rating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {vehicleModel} • <span data-testid="text-vehicle-number">{vehicleNumber}</span>
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              data-testid="button-call-driver"
              onClick={() => console.log('Call driver')}
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              data-testid="button-message-driver"
              onClick={() => console.log('Message driver')}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
