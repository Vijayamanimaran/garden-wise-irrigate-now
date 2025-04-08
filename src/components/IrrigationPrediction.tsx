
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const PLANT_TYPES = [
  "Ornamental", "Shrubs", "Trees", "Herbs", "Climbers", 
  "Creepers", "Succulents", "Ferns", "Aquatic", "Cacti", 
  "Grass", "Bulbs", "Vegetables", "Fruits", "Vines"
];

// Mock plant names based on type
const PLANT_NAMES: Record<string, string[]> = {
  "Ornamental": ["Rose", "Tulip", "Hibiscus", "Lily", "Marigold"],
  "Shrubs": ["Boxwood", "Holly", "Azalea", "Hydrangea", "Lavender"],
  "Trees": ["Oak", "Maple", "Pine", "Apple", "Cherry"],
  "Herbs": ["Basil", "Mint", "Rosemary", "Thyme", "Sage"],
  "Climbers": ["Ivy", "Clematis", "Wisteria", "Morning Glory", "Jasmine"],
  "Creepers": ["Spider Plant", "Swedish Ivy", "Tradescantia", "Dichondra", "Creeping Jenny"],
  "Succulents": ["Aloe", "Echeveria", "Haworthia", "Jade Plant", "Sedum"],
  "Ferns": ["Boston Fern", "Bird's Nest Fern", "Staghorn Fern", "Maidenhair Fern", "Asparagus Fern"],
  "Aquatic": ["Water Lily", "Lotus", "Duckweed", "Cattail", "Water Hyacinth"],
  "Cacti": ["Barrel Cactus", "Prickly Pear", "Saguaro", "Christmas Cactus", "Opuntia"],
  "Grass": ["Kentucky Bluegrass", "Bermuda Grass", "Fescue", "Ryegrass", "Zoysia"],
  "Bulbs": ["Daffodil", "Tulip", "Hyacinth", "Crocus", "Amaryllis"],
  "Vegetables": ["Tomato", "Cucumber", "Carrot", "Spinach", "Broccoli"],
  "Fruits": ["Strawberry", "Blueberry", "Apple", "Grape", "Raspberry"],
  "Vines": ["Grape Vine", "Honeysuckle", "English Ivy", "Virginia Creeper", "Bougainvillea"]
};

// Feature importance data for chart
const FEATURE_IMPORTANCE = [
  { name: "Plant_Type", importance: 0.28 },
  { name: "Plant_Name", importance: 0.22 },
  { name: "Soil_Moisture", importance: 0.15 },
  { name: "Temperature", importance: 0.12 },
  { name: "Humidity", importance: 0.10 },
  { name: "Rainfall", importance: 0.08 },
  { name: "Sunlight_Hours", importance: 0.05 }
];

interface FormData {
  plantType: string;
  plantName: string;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  sunlightHours: number;
  daysSinceIrrigation: number;
}

interface PredictionResult {
  waterRequirement: number;
  evaporationRate: number;
  irrigationType: string;
  futureSoilMoisture: number;
  irrigationNeeded: boolean;
}

const IrrigationPrediction = () => {
  const [formData, setFormData] = useState<FormData>({
    plantType: "Ornamental",
    plantName: "Rose",
    soilMoisture: 45,
    temperature: 25,
    humidity: 60,
    rainfall: 5,
    sunlightHours: 6,
    daysSinceIrrigation: 2
  });

  const [availablePlants, setAvailablePlants] = useState<string[]>(PLANT_NAMES["Ornamental"]);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlantTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      plantType: value,
      plantName: PLANT_NAMES[value][0]
    }));
    setAvailablePlants(PLANT_NAMES[value]);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setFormData(prev => ({ ...prev, [field]: numValue }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This would normally call an API endpoint with ML models
    // For now, we'll mock the predictions based on the input
    setTimeout(() => {
      // Mock prediction logic
      const waterBase = Math.random() * 2 + 1; // 1-3 liters
      const multiplier = formData.temperature / 20 + formData.sunlightHours / 6;
      const soilDryness = (100 - formData.soilMoisture) / 100;
      
      const waterRequirement = waterBase * multiplier * soilDryness * (1 - formData.rainfall / 50);
      const evaporationRate = (formData.temperature * 0.05 + formData.sunlightHours * 0.1) * (1 - formData.humidity / 100);
      const futureSoilMoisture = Math.max(0, formData.soilMoisture - evaporationRate * 3);
      
      let irrigationType = "Drip";
      if (waterRequirement > 2.5) irrigationType = "Sprinkler";
      if (formData.plantType === "Aquatic") irrigationType = "Flood";
      
      setPredictionResult({
        waterRequirement: Number(waterRequirement.toFixed(2)),
        evaporationRate: Number(evaporationRate.toFixed(2)),
        irrigationType,
        futureSoilMoisture: Number(futureSoilMoisture.toFixed(2)),
        irrigationNeeded: futureSoilMoisture < 30
      });
      
      setIsLoading(false);
      toast({
        title: "Prediction Complete",
        description: "Your irrigation prediction is ready!"
      });
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Irrigation Prediction</CardTitle>
          <CardDescription>
            Enter plant and environmental details to receive irrigation recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="plantType">Plant Type</Label>
                <Select 
                  value={formData.plantType} 
                  onValueChange={handlePlantTypeChange}
                >
                  <SelectTrigger id="plantType">
                    <SelectValue placeholder="Select plant type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLANT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plantName">Plant Name</Label>
                <Select 
                  value={formData.plantName} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, plantName: value }))}
                >
                  <SelectTrigger id="plantName">
                    <SelectValue placeholder="Select plant name" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePlants.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilMoisture">Soil Moisture (%)</Label>
                <Input 
                  id="soilMoisture" 
                  type="number" 
                  value={formData.soilMoisture}
                  onChange={(e) => handleInputChange("soilMoisture", e.target.value)} 
                  min="0" 
                  max="100" 
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input 
                  id="temperature" 
                  type="number" 
                  value={formData.temperature}
                  onChange={(e) => handleInputChange("temperature", e.target.value)} 
                  min="-10" 
                  max="50" 
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input 
                  id="humidity" 
                  type="number" 
                  value={formData.humidity}
                  onChange={(e) => handleInputChange("humidity", e.target.value)} 
                  min="0" 
                  max="100" 
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rainfall">Rainfall (mm)</Label>
                <Input 
                  id="rainfall" 
                  type="number" 
                  value={formData.rainfall}
                  onChange={(e) => handleInputChange("rainfall", e.target.value)} 
                  min="0" 
                  max="500" 
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sunlightHours">Sunlight Hours</Label>
                <Input 
                  id="sunlightHours" 
                  type="number" 
                  value={formData.sunlightHours}
                  onChange={(e) => handleInputChange("sunlightHours", e.target.value)} 
                  min="0" 
                  max="24" 
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="daysSinceIrrigation">Days Since Last Irrigation</Label>
                <Input 
                  id="daysSinceIrrigation" 
                  type="number" 
                  value={formData.daysSinceIrrigation}
                  onChange={(e) => handleInputChange("daysSinceIrrigation", e.target.value)} 
                  min="0" 
                  max="30" 
                  step="0.1"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Calculating..." : "Calculate Irrigation Needs"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {predictionResult && (
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
              <CardDescription>Based on your input data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="font-medium">💧 Water Requirement</p>
                  <p className="text-2xl font-bold text-blue-700">{predictionResult.waterRequirement} liters/day</p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <p className="font-medium">☀️ Evaporation Rate</p>
                  <p className="text-2xl font-bold text-orange-700">{predictionResult.evaporationRate} liters/day</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <p className="font-medium">🚿 Recommended Irrigation Type</p>
                  <p className="text-2xl font-bold text-purple-700">{predictionResult.irrigationType}</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <p className="font-medium">🌱 Predicted Soil Moisture After 3 Days</p>
                  <p className="text-2xl font-bold text-green-700">{predictionResult.futureSoilMoisture}%</p>
                </div>
                
                <div className={`p-4 rounded-lg border ${
                  predictionResult.irrigationNeeded ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'
                }`}>
                  <p className="font-medium">🔔 Irrigation Recommendation</p>
                  <p className={`text-xl font-bold ${
                    predictionResult.irrigationNeeded ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {predictionResult.irrigationNeeded 
                      ? '🚨 Irrigation is recommended' 
                      : '✅ No irrigation needed'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Importance Chart */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Feature Importance</CardTitle>
              <CardDescription>What factors influence water requirements?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer config={{}} className="p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={FEATURE_IMPORTANCE} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white border p-2 shadow-md">
                                <p>{`${payload[0].payload.name}: ${(payload[0].value as number * 100).toFixed(1)}%`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="importance" fill="#4ade80" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default IrrigationPrediction;
