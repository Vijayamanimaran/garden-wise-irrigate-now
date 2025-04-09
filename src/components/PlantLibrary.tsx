
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANT_DATABASE } from "@/data/plantDatabase";
import PlantSearchControls from "./PlantSearchControls";
import PlantGrid from "./PlantGrid";

const PlantLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const filteredPlants = PLANT_DATABASE.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          plant.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? plant.type === selectedType : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Plant Irrigation Library</CardTitle>
          <CardDescription>
            Browse detailed irrigation information for various garden plants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PlantSearchControls 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />
          
          <PlantGrid plants={filteredPlants} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantLibrary;
