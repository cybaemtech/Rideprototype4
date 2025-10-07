import { Card, CardContent } from "@/components/ui/card";
import ShimmerLoader from "./ShimmerLoader";

export default function RideCardSkeleton() {
  return (
    <Card data-testid="skeleton-ride-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <ShimmerLoader className="h-5 w-16" />
              <ShimmerLoader className="h-5 w-12" />
            </div>
            <div className="space-y-2">
              <ShimmerLoader className="h-4 w-3/4" />
              <ShimmerLoader className="h-4 w-2/3" />
            </div>
          </div>
          <div className="space-y-2">
            <ShimmerLoader className="h-8 w-20" />
            <ShimmerLoader className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
