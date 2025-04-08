
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

// Plant database
const PLANT_DATABASE = [
  {
    id: 1,
    type: "Ornamental",
    name: "Rose",
    waterNeeds: "Medium (1.5-2 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "20-30°C, 5-6 hours sunlight",
    seasonality: "Spring to Fall, prune in winter",
    icon: "🌹"
  },
  {
    id: 2,
    type: "Ornamental",
    name: "Tulip",
    waterNeeds: "Low (0.5-1 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "15-20°C, 6 hours sunlight",
    seasonality: "Spring flowering, plant bulbs in fall",
    icon: "🌷"
  },
  {
    id: 3,
    type: "Herbs",
    name: "Basil",
    waterNeeds: "Medium (1-1.5 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "20-25°C, 6-8 hours sunlight",
    seasonality: "Spring to Summer, harvest regularly",
    icon: "🌿"
  },
  {
    id: 4,
    type: "Vegetables",
    name: "Tomato",
    waterNeeds: "High (2-3 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "20-30°C, 6-8 hours sunlight",
    seasonality: "Summer harvest, plant in spring",
    icon: "🍅"
  },
  {
    id: 5,
    type: "Succulents",
    name: "Aloe",
    waterNeeds: "Low (0.2-0.5 liters/week)",
    irrigationMethod: "Spot",
    idealConditions: "18-24°C, bright indirect light",
    seasonality: "Year-round, water sparingly in winter",
    icon: "🌵"
  },
  {
    id: 6,
    type: "Trees",
    name: "Apple Tree",
    waterNeeds: "Medium-High (15-20 liters/week)",
    irrigationMethod: "Basin",
    idealConditions: "15-30°C, 6-8 hours sunlight",
    seasonality: "Spring blossoms, Fall harvest",
    icon: "🍎"
  },
  {
    id: 7,
    type: "Fruits",
    name: "Strawberry",
    waterNeeds: "Medium (1-2 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "15-26°C, 6 hours sunlight",
    seasonality: "Spring to Summer, renew plants every 3 years",
    icon: "🍓"
  },
  {
    id: 8,
    type: "Shrubs",
    name: "Lavender",
    waterNeeds: "Low (0.5-1 liters/week)",
    irrigationMethod: "Drip",
    idealConditions: "18-28°C, 6+ hours full sun",
    seasonality: "Summer flowering, prune in spring",
    icon: "💜"
  },
  {
    id: 9,
    type: "Cacti",
    name: "Barrel Cactus",
    waterNeeds: "Very Low (0.2 liters/2 weeks)",
    irrigationMethod: "Spot",
    idealConditions: "20-35°C, 6+ hours direct sunlight",
    seasonality: "Water in growing season, almost none in winter",
    icon: "🌵"
  },
  {
    id: 10,
    type: "Aquatic",
    name: "Water Lily",
    waterNeeds: "Very High (submerged)",
    irrigationMethod: "Pond/Container",
    idealConditions: "18-28°C, 6+ hours sunlight",
    seasonality: "Blooms summer, dormant in winter",
    icon: "🌊"
  },
  {
    id: 11,
    type: "Climbers",
    name: "Morning Glory",
    waterNeeds: "Medium (1-1.5 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "18-30°C, 6+ hours sunlight",
    seasonality: "Summer to Fall flowering, annual in cold climates",
    icon: "🌸"
  },
  {
    id: 12,
    type: "Herbs",
    name: "Mint",
    waterNeeds: "Medium-High (1.5-2 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "18-26°C, partial shade to full sun",
    seasonality: "Spring to Fall, can be invasive",
    icon: "🌱"
  },
  {
    id: 13,
    type: "Ferns",
    name: "Boston Fern",
    waterNeeds: "Medium-High (1.5-2 liters/day)",
    irrigationMethod: "Mist/Drip",
    idealConditions: "18-24°C, indirect light, high humidity",
    seasonality: "Year-round, indoor in cold climates",
    icon: "🌿"
  },
  {
    id: 14,
    type: "Vegetables",
    name: "Carrot",
    waterNeeds: "Medium (1-1.5 liters/day)",
    irrigationMethod: "Sprinkler/Drip",
    idealConditions: "15-25°C, 6 hours sunlight",
    seasonality: "Spring to Fall planting, 70-80 days to harvest",
    icon: "🥕"
  },
  {
    id: 15,
    type: "Grass",
    name: "Kentucky Bluegrass",
    waterNeeds: "High (25-40mm/week)",
    irrigationMethod: "Sprinkler",
    idealConditions: "15-24°C, full to partial sun",
    seasonality: "Cool season grass, plant in fall or spring",
    icon: "🌱"
  }
];

const PLANT_TYPES = [...new Set(PLANT_DATABASE.map(plant => plant.type))];

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div>
              <Select
                value={selectedType || ""}
                onValueChange={(value) => setSelectedType(value || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by plant type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {PLANT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlants.map((plant) => (
              <Card key={plant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 flex items-center justify-center text-4xl">
                  <span>{plant.icon}</span>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{plant.name}</CardTitle>
                  <CardDescription>{plant.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid grid-cols-[80px_1fr] gap-1">
                    <span className="font-medium">Water Needs:</span>
                    <span>{plant.waterNeeds}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-1">
                    <span className="font-medium">Irrigation:</span>
                    <span>{plant.irrigationMethod}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-1">
                    <span className="font-medium">Ideal:</span>
                    <span>{plant.idealConditions}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-1">
                    <span className="font-medium">Seasonality:</span>
                    <span>{plant.seasonality}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredPlants.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No plants found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantLibrary;
