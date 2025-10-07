import DriverDashboardCard from '../DriverDashboardCard';
import { DollarSign, Car, Star, TrendingUp } from 'lucide-react';

export default function DriverDashboardCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <DriverDashboardCard
        title="Total Earnings"
        value="$1,245.50"
        subtitle="This month"
        icon={DollarSign}
        trend={{ value: 12.5, isPositive: true }}
      />
      <DriverDashboardCard
        title="Rides Completed"
        value="47"
        subtitle="This month"
        icon={Car}
        trend={{ value: 8.2, isPositive: true }}
      />
      <DriverDashboardCard
        title="Average Rating"
        value="4.9"
        subtitle="Based on 120 reviews"
        icon={Star}
      />
      <DriverDashboardCard
        title="Acceptance Rate"
        value="95%"
        subtitle="Last 30 days"
        icon={TrendingUp}
        trend={{ value: 3.1, isPositive: true }}
      />
    </div>
  );
}
