
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Cloud, CloudRain, Umbrella, Thermometer, AlertTriangle } from "lucide-react";

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
  location: string;
}

interface PredictionResult {
  waterRequirement: number;
  evaporationRate: number;
  irrigationType: string;
  futureSoilMoisture: number;
  irrigationNeeded: boolean;
  weatherAdjustment: string | null;
  forecastRain: boolean;
  extremeWeather: "none" | "heatwave" | "cold";
}

interface WeatherData {
  current: {
    temp_c: number;
    humidity: number;
    condition: {
      text: string;
      code: number;
    };
  };
  forecast: {
    forecastday: Array<{
      day: {
        daily_chance_of_rain: number;
        avgtemp_c: number;
        condition: {
          text: string;
          code: number;
        }
      };
    }>;
  };
  location: {
    name: string;
    region: string;
  };
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
    daysSinceIrrigation: 2,
    location: "London"
  });

  const [availablePlants, setAvailablePlants] = useState<string[]>(PLANT_NAMES["Ornamental"]);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

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
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const fetchWeatherData = async () => {
    if (!formData.location) return;
    
    setIsLoadingWeather(true);
    
    try {
      // In a real implementation, you would use an actual weather API
      // This is a mock implementation that simulates API call timing
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock weather data based on the location string
      // (in a real implementation, this would be from the API)
      const mockWeatherData: WeatherData = {
        current: {
          temp_c: Math.round(15 + Math.random() * 20), // 15-35°C
          humidity: Math.round(40 + Math.random() * 40), // 40-80%
          condition: {
            text: Math.random() > 0.7 ? "Rainy" : "Sunny",
            code: Math.random() > 0.7 ? 1063 : 1000
          }
        },
        forecast: {
          forecastday: Array(3).fill(null).map(() => ({
            day: {
              daily_chance_of_rain: Math.round(Math.random() * 100),
              avgtemp_c: Math.round(15 + Math.random() * 20),
              condition: {
                text: Math.random() > 0.7 ? "Rainy" : "Partly cloudy",
                code: Math.random() > 0.7 ? 1063 : 1003
              }
            }
          }))
        },
        location: {
          name: formData.location,
          region: "Region"
        }
      };
      
      setWeatherData(mockWeatherData);
      
      // Update temperature and humidity from weather
      setFormData(prev => ({
        ...prev,
        temperature: mockWeatherData.current.temp_c,
        humidity: mockWeatherData.current.humidity
      }));
      
      toast({
        title: "Weather data updated",
        description: `Current conditions for ${mockWeatherData.location.name}: ${mockWeatherData.current.condition.text}, ${mockWeatherData.current.temp_c}°C`
      });
      
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast({
        title: "Error fetching weather data",
        description: "Could not retrieve weather information. Using manual inputs.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingWeather(false);
    }
  };

  useEffect(() => {
    if (formData.location) {
      fetchWeatherData();
    }
  }, []);

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
      
      let waterRequirement = waterBase * multiplier * soilDryness * (1 - formData.rainfall / 50);
      let irrigationNeeded = true;
      let weatherAdjustment: string | null = null;
      let forecastRain = false;
      let extremeWeather: "none" | "heatwave" | "cold" = "none";
      
      // Weather-based adjustments
      if (weatherData) {
        // Check for forecasted rain
        const rainChance = weatherData.forecast.forecastday[0].day.daily_chance_of_rain;
        forecastRain = rainChance > 60;
        
        if (forecastRain) {
          waterRequirement = 0;
          irrigationNeeded = false;
          weatherAdjustment = `Skipping irrigation: ${rainChance}% chance of rain in the forecast`;
        }
        
        // Check for extreme weather conditions
        const avgTemp = weatherData.forecast.forecastday[0].day.avgtemp_c;
        if (avgTemp > 30) {
          extremeWeather = "heatwave";
          waterRequirement *= 1.5;
          weatherAdjustment = weatherAdjustment || "Increasing water due to high temperatures";
        } else if (avgTemp < 5) {
          extremeWeather = "cold";
          waterRequirement *= 0.7;
          weatherAdjustment = weatherAdjustment || "Reducing water due to cold conditions";
        }
      }
      
      const evaporationRate = (formData.temperature * 0.05 + formData.sunlightHours * 0.1) * (1 - formData.humidity / 100);
      const futureSoilMoisture = Math.max(0, formData.soilMoisture - evaporationRate * 3);
      
      let irrigationType = "Drip";
      if (waterRequirement > 2.5) irrigationType = "Sprinkler";
      if (formData.plantType === "Aquatic") irrigationType = "Flood";
      
      // Final check - if soil moisture will stay above 30%, no need to irrigate
      if (futureSoilMoisture >= 30 && !extremeWeather) {
        irrigationNeeded = false;
        weatherAdjustment = weatherAdjustment || "Soil moisture sufficient for the next few days";
      }
      
      setPredictionResult({
        waterRequirement: Number(waterRequirement.toFixed(2)),
        evaporationRate: Number(evaporationRate.toFixed(2)),
        irrigationType,
        futureSoilMoisture: Number(futureSoilMoisture.toFixed(2)),
        irrigationNeeded,
        weatherAdjustment,
        forecastRain,
        extremeWeather
      });
      
      setIsLoading(false);
      toast({
        title: "Prediction Complete",
        description: "Your weather-adjusted irrigation prediction is ready!"
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
              {/* Weather Location Input */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location">Location for Weather Data</Label>
                <div className="flex gap-2">
                  <Input 
                    id="location" 
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))} 
                    placeholder="Enter city name"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={fetchWeatherData} 
                    disabled={isLoadingWeather}
                    className="flex-shrink-0"
                  >
                    {isLoadingWeather ? "Loading..." : "Get Weather"}
                  </Button>
                </div>
              </div>

              {/* Current Weather Display */}
              {weatherData && (
                <div className="md:col-span-2 p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-center gap-3">
                  {weatherData.current.condition.text.toLowerCase().includes("rain") ? (
                    <CloudRain className="h-6 w-6 text-blue-500" />
                  ) : (
                    <Cloud className="h-6 w-6 text-blue-500" />
                  )}
                  <div>
                    <p className="font-medium">Current Weather in {weatherData.location.name}</p>
                    <p className="text-sm text-gray-700">
                      {weatherData.current.condition.text}, {weatherData.current.temp_c}°C, {weatherData.current.humidity}% humidity
                    </p>
                    <p className="text-sm text-gray-700">
                      Forecast: {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}% chance of rain
                    </p>
                  </div>
                </div>
              )}

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

              {/* Temperature with weather sync indicator */}
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
                  className={weatherData ? "border-blue-300" : ""}
                />
                {weatherData && (
                  <p className="text-xs text-blue-600">Auto-updated from weather data</p>
                )}
              </div>

              {/* Humidity with weather sync indicator */}
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
                  className={weatherData ? "border-blue-300" : ""}
                />
                {weatherData && (
                  <p className="text-xs text-blue-600">Auto-updated from weather data</p>
                )}
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
              {isLoading ? "Calculating..." : "Calculate Weather-Smart Irrigation Needs"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {predictionResult && (
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Weather-Smart Prediction</CardTitle>
              <CardDescription>Based on your input and weather data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {/* Weather Adjustment Alert */}
                {predictionResult.weatherAdjustment && (
                  <div className={`p-4 rounded-lg border flex items-center gap-3 ${
                    predictionResult.forecastRain ? 'bg-blue-50 border-blue-100' :
                    predictionResult.extremeWeather === "heatwave" ? 'bg-orange-50 border-orange-100' :
                    predictionResult.extremeWeather === "cold" ? 'bg-indigo-50 border-indigo-100' :
                    'bg-gray-50 border-gray-100'
                  }`}>
                    {predictionResult.forecastRain ? (
                      <Umbrella className="h-5 w-5 text-blue-600" />
                    ) : predictionResult.extremeWeather === "heatwave" ? (
                      <Thermometer className="h-5 w-5 text-orange-600" />
                    ) : predictionResult.extremeWeather === "cold" ? (
                      <Thermometer className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-gray-600" />
                    )}
                    <p className="font-medium">
                      {predictionResult.weatherAdjustment}
                    </p>
                  </div>
                )}
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="font-medium">💧 Water Requirement</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {predictionResult.waterRequirement} liters/day
                    {predictionResult.forecastRain && " (Skipped due to rain forecast)"}
                  </p>
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
