
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PLANT_TYPES } from "@/data/plantDatabase";

interface PlantSearchControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedType: string | null;
  onTypeChange: (value: string | null) => void;
}

const PlantSearchControls = ({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange
}: PlantSearchControlsProps) => {
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
      
      <div>
        <Select
          value={selectedType || "all"}
          onValueChange={(value) => onTypeChange(value === "all" ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by plant type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {PLANT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PlantSearchControls;
