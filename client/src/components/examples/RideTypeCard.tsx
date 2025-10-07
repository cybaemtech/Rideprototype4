import { useState } from 'react';
import RideTypeCard from '../RideTypeCard';

export default function RideTypeCardExample() {
  const [selected, setSelected] = useState<string>('mini');

  return (
    <div className="space-y-4 p-4">
      <RideTypeCard
        type="mini"
        name="RideNow Mini"
        description="Affordable rides for solo travelers"
        pricePerKm={0.5}
        eta="3 min"
        isSelected={selected === 'mini'}
        onSelect={() => setSelected('mini')}
      />
      <RideTypeCard
        type="prime"
        name="RideNow Prime"
        description="Premium comfort for your journey"
        pricePerKm={0.8}
        eta="5 min"
        isSelected={selected === 'prime'}
        onSelect={() => setSelected('prime')}
      />
      <RideTypeCard
        type="suv"
        name="RideNow SUV"
        description="Spacious rides for groups"
        pricePerKm={1.2}
        eta="7 min"
        isSelected={selected === 'suv'}
        onSelect={() => setSelected('suv')}
      />
    </div>
  );
}
