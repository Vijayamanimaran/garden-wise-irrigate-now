
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PLANT_TYPES } from "@/data/plantDatabase";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { translate } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder={translate("plant.library.search")}
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
            <SelectValue placeholder={translate("plant.library.type")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{translate("filters.allTypes")}</SelectItem>
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
                <h4 className="font-medium">{translate("filters.additionalFilters")}</h4>
                <div className="space-y-2">
                  <Label htmlFor="waterNeeds">{translate("plant.library.waterNeeds")}</Label>
                  <Select
                    value={waterNeedsFilter || "all"}
                    onValueChange={(value) => {
                      onWaterNeedsChange(value === "all" ? null : value);
                      setIsFiltersOpen(false);
                    }}
                  >
                    <SelectTrigger id="waterNeeds">
                      <SelectValue placeholder={translate("filters.allWaterNeeds")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{translate("filters.allWaterNeeds")}</SelectItem>
                      <SelectItem value="Low">{translate("filters.waterNeeds.low")}</SelectItem>
                      <SelectItem value="Medium">{translate("filters.waterNeeds.medium")}</SelectItem>
                      <SelectItem value="High">{translate("filters.waterNeeds.high")}</SelectItem>
                      <SelectItem value="Very Low">{translate("filters.waterNeeds.veryLow")}</SelectItem>
                      <SelectItem value="Very High">{translate("filters.waterNeeds.veryHigh")}</SelectItem>
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
