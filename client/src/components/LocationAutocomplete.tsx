import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation2, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Location {
  lat: number;
  lng: number;
  name: string;
  address?: string;
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string, coords?: Location) => void;
  placeholder: string;
  icon?: "pickup" | "drop";
  locations: Location[];
  testId?: string;
}

export default function LocationAutocomplete({
  value,
  onChange,
  placeholder,
  icon = "pickup",
  locations,
  testId,
}: LocationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const filtered = locations.filter((loc) =>
        loc.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredLocations([]);
      setIsOpen(false);
    }
  }, [value, locations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (newValue: string) => {
    // Reset coordinates on every keystroke to ensure map stays in sync
    // Coordinates will only be set when user selects from dropdown
    onChange(newValue, undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredLocations.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredLocations.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredLocations.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredLocations[highlightedIndex]) {
          selectLocation(filteredLocations[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const selectLocation = (location: Location) => {
    onChange(location.name, location);
    setIsOpen(false);
    setHighlightedIndex(0);
  };

  const clearInput = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const IconComponent = icon === "pickup" ? MapPin : Navigation2;
  const iconColor = icon === "pickup" ? "text-primary" : "text-accent";

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <IconComponent className={cn("h-4 w-4", iconColor)} />
        </div>
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value && setIsOpen(filteredLocations.length > 0)}
          placeholder={placeholder}
          className="pl-10 pr-10 transition-all duration-200 focus:ring-2"
          data-testid={testId}
        />
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={clearInput}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover-elevate active-elevate-2 rounded-full"
              type="button"
              data-testid={`button-clear-${testId}`}
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && filteredLocations.length > 0 && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-card border border-card-border rounded-md shadow-lg overflow-hidden"
          >
            <div className="max-h-[300px] overflow-y-auto">
              {filteredLocations.map((location, index) => (
                <motion.div
                  key={location.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.03 }}
                  onClick={() => selectLocation(location)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    "px-4 py-3 cursor-pointer transition-colors duration-150 flex items-start gap-3",
                    highlightedIndex === index
                      ? "bg-muted"
                      : "hover:bg-muted/50"
                  )}
                  data-testid={`option-location-${index}`}
                >
                  <div className="mt-0.5">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{location.name}</p>
                    {location.address && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {location.address}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {value && filteredLocations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute z-50 w-full mt-2 bg-card border border-card-border rounded-md shadow-lg p-4 text-center"
        >
          <p className="text-sm text-muted-foreground">No locations found</p>
        </motion.div>
      )}
    </div>
  );
}
