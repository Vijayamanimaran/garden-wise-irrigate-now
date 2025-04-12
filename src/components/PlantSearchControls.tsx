
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PLANT_TYPES } from "@/data/plantDatabase";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface PlantSearchControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedType: string | null;
  onTypeChange: (value: string | null) => void;
  waterNeedsFilter?: string | null;
  onWaterNeedsChange?: (value: string | null) => void;
}

const PlantSearchControls = ({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  waterNeedsFilter,
  onWaterNeedsChange
}: PlantSearchControlsProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search plants..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <div className="flex gap-2">
        <Select
          value={selectedType || "all"}
          onValueChange={(value) => onTypeChange(value === "all" ? null : value)}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Filter by plant type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {PLANT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {onWaterNeedsChange && (
          <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="flex-shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Additional Filters</h4>
                <div className="space-y-2">
                  <Label htmlFor="waterNeeds">Water Needs</Label>
                  <Select
                    value={waterNeedsFilter || "all"}
                    onValueChange={(value) => {
                      onWaterNeedsChange(value === "all" ? null : value);
                      setIsFiltersOpen(false);
                    }}
                  >
                    <SelectTrigger id="waterNeeds">
                      <SelectValue placeholder="All water needs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All water needs</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Very Low">Very Low</SelectItem>
                      <SelectItem value="Very High">Very High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default PlantSearchControls;
