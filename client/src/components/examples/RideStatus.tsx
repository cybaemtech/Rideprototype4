import { useState, useEffect } from 'react';
import RideStatus from '../RideStatus';

export default function RideStatusExample() {
  const [status, setStatus] = useState<"searching" | "found" | "on-way" | "arrived">('searching');

  useEffect(() => {
    const statuses: ("searching" | "found" | "on-way" | "arrived")[] = ['searching', 'found', 'on-way', 'arrived'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % statuses.length;
      setStatus(statuses[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return <RideStatus currentStatus={status} />;
}
