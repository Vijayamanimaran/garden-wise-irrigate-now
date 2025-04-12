
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PLANT_NAMES } from "@/data/plantDatabase";
import { Dna, Cloud, Thermometer, Droplet } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface IrrigationProfile {
  plantName: string;
  soilType: string;
  containerSize: string;
  waterFrequency: string;
  waterAmount: string;
  seasonalAdjustments: {
    spring: string;
    summer: string;
    fall: string;
    winter: string;
  };
  radarData: {
    category: string;
    value: number;
    fullMark: number;
  }[];
  weatherSensitivity: {
    drought: number;
    heatwave: number;
    flooding: number;
    frost: number;
  };
}

// Mock data generator
const generateIrrigationProfile = (plantName: string, plantType: string): IrrigationProfile => {
  // Seed random generation based on plant name for consistent results
  const seed = plantName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (min: number, max: number) => min + ((seed % 100) / 100) * (max - min);
  
  // Characteristics based on plant type
  const typeCharacteristics: Record<string, any> = {
    "Ornamental": {
      soilPreference: ["Loamy", "Sandy loam", "Clay loam"],
      waterLevel: [5, 8],
      droughtResistance: [3, 6]
    },
    "Shrubs": {
      soilPreference: ["Loamy", "Sandy", "Rocky"],
      waterLevel: [4, 7],
      droughtResistance: [5, 8]
    },
    "Trees": {
      soilPreference: ["Loamy", "Sandy loam", "Clay"],
      waterLevel: [6, 9],
      droughtResistance: [6, 9]
    },
    "Herbs": {
      soilPreference: ["Sandy", "Loamy", "Rich"],
      waterLevel: [5, 8],
      droughtResistance: [3, 6]
    },
    "Climbers": {
      soilPreference: ["Loamy", "Rich", "Well-drained"],
      waterLevel: [5, 8],
      droughtResistance: [4, 7]
    },
    "Succulents": {
      soilPreference: ["Sandy", "Gritty", "Well-drained"],
      waterLevel: [1, 3],
      droughtResistance: [8, 10]
    },
    "Cacti": {
      soilPreference: ["Sandy", "Gritty", "Well-drained"],
      waterLevel: [1, 2],
      droughtResistance: [9, 10]
    },
    "Aquatic": {
      soilPreference: ["Aquatic soil", "Clay", "Loamy"],
      waterLevel: [10, 10],
      droughtResistance: [1, 2]
    },
    "Vegetables": {
      soilPreference: ["Rich", "Loamy", "Well-drained"],
      waterLevel: [6, 9],
      droughtResistance: [3, 5]
    },
    "Fruits": {
      soilPreference: ["Loamy", "Rich", "Well-drained"],
      waterLevel: [6, 9],
      droughtResistance: [4, 7]
    }
  };
  
  // Default characteristics if plant type not found
  const defaultCharacteristics = {
    soilPreference: ["Loamy", "Well-drained"],
    waterLevel: [5, 7],
    droughtResistance: [5, 7]
  };
  
  const characteristics = typeCharacteristics[plantType] || defaultCharacteristics;
  
  // Select a soil type based on plant type
  const soilTypes = characteristics.soilPreference;
  const soilType = soilTypes[Math.floor(random(0, soilTypes.length))];
  
  // Water needs based on plant type with randomness
  const waterLevel = random(characteristics.waterLevel[0], characteristics.waterLevel[1]);
  const droughtResistance = random(characteristics.droughtResistance[0], characteristics.droughtResistance[1]);
  
  // Container size suggestion
  const containerSizes = ["Small pot (15-20cm)", "Medium pot (25-30cm)", "Large pot (35-45cm)", "XL container (50cm+)", "Garden bed"];
  let containerIndex;
  
  if (plantType === "Trees" || plantType === "Shrubs" || waterLevel > 8) {
    containerIndex = Math.min(4, Math.floor(random(3, 5)));
  } else if (plantType === "Succulents" || plantType === "Cacti") {
    containerIndex = Math.floor(random(0, 2));
  } else {
    containerIndex = Math.floor(random(1, 4));
  }
  
  const containerSize = containerSizes[containerIndex];
  
  // Water frequency
  let frequency;
  if (waterLevel < 3) {
    frequency = "Once every 2-3 weeks";
  } else if (waterLevel < 5) {
    frequency = "Once a week";
  } else if (waterLevel < 7) {
    frequency = "Twice a week";
  } else if (waterLevel < 9) {
    frequency = "Every 2-3 days";
  } else {
    frequency = "Daily";
  }
  
  // Water amount
  let amount;
  if (waterLevel < 3) {
    amount = "Minimal (0.2-0.5 liters)";
  } else if (waterLevel < 5) {
    amount = "Light (0.5-1 liters)";
  } else if (waterLevel < 7) {
    amount = "Moderate (1-2 liters)";
  } else if (waterLevel < 9) {
    amount = "Generous (2-3 liters)";
  } else {
    amount = "Abundant (3+ liters)";
  }
  
  // Seasonal adjustments
  const seasonalAdjustments = {
    spring: waterLevel > 5 ? "Increase watering as growth accelerates" : "Standard watering as growth begins",
    summer: waterLevel > 7 ? "Water daily during hot periods" : "Increase frequency during heat waves",
    fall: "Reduce watering as dormancy approaches",
    winter: plantType === "Succulents" || plantType === "Cacti" ? "Minimal water, only when soil is completely dry" : "Reduce to 1/3 of normal frequency"
  };
  
  // Radar chart data
  const radarData = [
    {
      category: "Water Needs",
      value: waterLevel,
      fullMark: 10,
    },
    {
      category: "Drought Resistance",
      value: droughtResistance,
      fullMark: 10,
    },
    {
      category: "Humidity Preference",
      value: Math.max(1, 10 - droughtResistance + (random(-2, 2))),
      fullMark: 10,
    },
    {
      category: "Root Depth",
      value: plantType === "Trees" || plantType === "Shrubs" ? random(7, 10) : random(3, 7),
      fullMark: 10,
    },
    {
      category: "Growth Rate",
      value: random(3, 8),
      fullMark: 10,
    },
  ];
  
  // Weather sensitivity
  const weatherSensitivity = {
    drought: 10 - droughtResistance,
    heatwave: Math.max(1, 10 - droughtResistance + (random(-2, 2))),
    flooding: plantType === "Aquatic" ? 1 : random(5, 9),
    frost: plantType === "Cacti" || plantType === "Succulents" ? random(7, 9) : random(4, 7),
  };
  
  return {
    plantName,
    soilType,
    containerSize,
    waterFrequency: frequency,
    waterAmount: amount,
    seasonalAdjustments,
    radarData,
    weatherSensitivity
  };
};

const IrrigationDNA = () => {
  const [selectedPlantType, setSelectedPlantType] = useState<string>("Ornamental");
  const [selectedPlantName, setSelectedPlantName] = useState<string>("Rose");
  const [availablePlants, setAvailablePlants] = useState<string[]>(PLANT_NAMES["Ornamental"] || []);
  const [irrigationProfile, setIrrigationProfile] = useState<IrrigationProfile | null>(null);
  
  useEffect(() => {
    // When plant type changes, update available plants and select the first one
    if (PLANT_NAMES[selectedPlantType]) {
      setAvailablePlants(PLANT_NAMES[selectedPlantType]);
      setSelectedPlantName(PLANT_NAMES[selectedPlantType][0]);
    }
  }, [selectedPlantType]);
  
  useEffect(() => {
    // Update irrigation profile when plant selection changes
    if (selectedPlantName) {
      setIrrigationProfile(generateIrrigationProfile(selectedPlantName, selectedPlantType));
    }
  }, [selectedPlantName, selectedPlantType]);
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Dna className="h-5 w-5 text-blue-600" />
          <CardTitle>Irrigation DNA</CardTitle>
        </div>
        <CardDescription>Custom watering profile based on plant genetics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dnaPlantType">Plant Type</Label>
            <Select 
              value={selectedPlantType} 
              onValueChange={setSelectedPlantType}
            >
              <SelectTrigger id="dnaPlantType">
                <SelectValue placeholder="Select plant type" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(PLANT_NAMES).map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dnaPlantName">Plant Name</Label>
            <Select 
              value={selectedPlantName} 
              onValueChange={setSelectedPlantName}
            >
              <SelectTrigger id="dnaPlantName">
                <SelectValue placeholder="Select plant name" />
              </SelectTrigger>
              <SelectContent>
                {availablePlants.map((name) => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {irrigationProfile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                  <Droplet className="h-4 w-4" /> 
                  Watering Pattern
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                  <div className="text-sm font-medium text-blue-700">Frequency:</div>
                  <div className="text-sm">{irrigationProfile.waterFrequency}</div>
                  
                  <div className="text-sm font-medium text-blue-700">Amount:</div>
                  <div className="text-sm">{irrigationProfile.waterAmount}</div>
                  
                  <div className="text-sm font-medium text-blue-700">Ideal Soil:</div>
                  <div className="text-sm">{irrigationProfile.soilType}</div>
                  
                  <div className="text-sm font-medium text-blue-700">Container:</div>
                  <div className="text-sm">{irrigationProfile.containerSize}</div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <h3 className="font-semibold text-purple-800 flex items-center gap-2">
                  <Cloud className="h-4 w-4" /> 
                  Weather Sensitivity
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Drought Risk:</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-amber-500 h-2.5 rounded-full" 
                        style={{ width: `${irrigationProfile.weatherSensitivity.drought * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Heatwave Risk:</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-red-500 h-2.5 rounded-full" 
                        style={{ width: `${irrigationProfile.weatherSensitivity.heatwave * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Flooding Risk:</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${irrigationProfile.weatherSensitivity.flooding * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Frost Risk:</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-500 h-2.5 rounded-full" 
                        style={{ width: `${irrigationProfile.weatherSensitivity.frost * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <h3 className="font-semibold text-green-800 flex items-center gap-2">
                  <Thermometer className="h-4 w-4" /> 
                  Seasonal Adjustments
                </h3>
                <div className="space-y-2 mt-2">
                  <div>
                    <span className="text-sm font-medium text-green-700">Spring:</span>
                    <p className="text-sm">{irrigationProfile.seasonalAdjustments.spring}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-700">Summer:</span>
                    <p className="text-sm">{irrigationProfile.seasonalAdjustments.summer}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-700">Fall:</span>
                    <p className="text-sm">{irrigationProfile.seasonalAdjustments.fall}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-700">Winter:</span>
                    <p className="text-sm">{irrigationProfile.seasonalAdjustments.winter}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-72">
              <p className="text-center text-sm font-medium mb-2">{selectedPlantName} Water Characteristics</p>
              <ChartContainer config={{}} className="p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart 
                    outerRadius="70%" 
                    data={irrigationProfile.radarData}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 10 }} />
                    <Radar
                      name={selectedPlantName}
                      dataKey="value"
                      stroke="#2563eb"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IrrigationDNA;
