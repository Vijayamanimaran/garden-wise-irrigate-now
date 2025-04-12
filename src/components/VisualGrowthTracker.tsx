
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PLANT_NAMES } from "@/data/plantDatabase";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Leaf, ArrowUp, ArrowDown } from "lucide-react";

interface GrowthData {
  id: number;
  date: string;
  height: number;
  leaves: number;
  health: number;
}

const generateMockGrowthData = (plantName: string, days: number = 30): GrowthData[] => {
  // Generate data with a growth curve, starting from 30 days ago
  const data: GrowthData[] = [];
  const today = new Date();
  const baseHeight = 5 + Math.random() * 10;
  const baseLeaves = 3 + Math.random() * 5;
  
  // Generate some randomness for this plant
  const heightIncrease = 0.2 + Math.random() * 0.5;
  const seedValue = plantName.charCodeAt(0) % 10;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Add some seasonality and randomness
    const growthFactor = 1 + Math.sin((date.getDate() + seedValue) / 10) * 0.3;
    const randomFactor = 0.8 + Math.random() * 0.4;
    
    // Health starts high and might dip in the middle, then recover
    const healthCurve = 70 + 20 * Math.sin((i / days) * Math.PI) + Math.random() * 10;
    
    data.push({
      id: days - i,
      date: date.toISOString().split('T')[0],
      height: baseHeight + (days - i) * heightIncrease * growthFactor * randomFactor,
      leaves: Math.floor(baseLeaves + (days - i) * 0.15 * randomFactor),
      health: healthCurve,
    });
  }
  
  return data;
};

const VisualGrowthTracker = () => {
  const [selectedPlantType, setSelectedPlantType] = useState<string>("Ornamental");
  const [selectedPlantName, setSelectedPlantName] = useState<string>("Rose");
  const [growthData, setGrowthData] = useState<GrowthData[]>([]);
  const [availablePlants, setAvailablePlants] = useState<string[]>(PLANT_NAMES["Ornamental"] || []);
  
  useEffect(() => {
    // When plant type changes, update available plants and select the first one
    if (PLANT_NAMES[selectedPlantType]) {
      setAvailablePlants(PLANT_NAMES[selectedPlantType]);
      setSelectedPlantName(PLANT_NAMES[selectedPlantType][0]);
    }
  }, [selectedPlantType]);
  
  useEffect(() => {
    // Generate new data when plant name changes
    setGrowthData(generateMockGrowthData(selectedPlantName));
  }, [selectedPlantName]);
  
  // Calculate growth metrics
  const calculateGrowthPercentage = () => {
    if (growthData.length < 2) return 0;
    const startHeight = growthData[0].height;
    const currentHeight = growthData[growthData.length - 1].height;
    return Math.round(((currentHeight - startHeight) / startHeight) * 100);
  };
  
  const recentGrowthTrend = () => {
    if (growthData.length < 7) return 'neutral';
    const recent = growthData.slice(-7);
    const weekAgoHeight = recent[0].height;
    const currentHeight = recent[recent.length - 1].height;
    return currentHeight > weekAgoHeight * 1.05 ? 'up' : 
           currentHeight < weekAgoHeight * 0.98 ? 'down' : 'neutral';
  };
  
  const growthPercentage = calculateGrowthPercentage();
  const trend = recentGrowthTrend();
  const latestHeight = growthData.length ? growthData[growthData.length - 1].height.toFixed(1) : '0';
  const latestLeaves = growthData.length ? growthData[growthData.length - 1].leaves : 0;
  const healthScore = growthData.length ? Math.round(growthData[growthData.length - 1].health) : 0;
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Visual Growth Tracker</CardTitle>
        <CardDescription>Monitor your plant's growth and health over time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="plantType">Plant Type</Label>
            <Select 
              value={selectedPlantType} 
              onValueChange={setSelectedPlantType}
            >
              <SelectTrigger id="plantType">
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
            <Label htmlFor="plantName">Plant Name</Label>
            <Select 
              value={selectedPlantName} 
              onValueChange={setSelectedPlantName}
            >
              <SelectTrigger id="plantName">
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
        
        <div className="rounded-lg overflow-hidden border">
          <img 
            src={`https://source.unsplash.com/300x200/?${selectedPlantName.toLowerCase()},plant`} 
            alt={selectedPlantName}
            className="w-full h-48 object-cover"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-500" />
          <span className="text-lg font-medium">
            The {selectedPlantName.toLowerCase()} has grown {growthPercentage}% in the last 30 days
          </span>
          {trend === 'up' && <ArrowUp className="h-4 w-4 text-green-600" />}
          {trend === 'down' && <ArrowDown className="h-4 w-4 text-amber-600" />}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="text-sm text-gray-500">Current Height</div>
            <div className="text-2xl font-bold text-green-700">{latestHeight} cm</div>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="text-sm text-gray-500">Leaf Count</div>
            <div className="text-2xl font-bold text-green-700">{latestLeaves}</div>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="text-sm text-gray-500">Health Score</div>
            <div className="text-2xl font-bold text-green-700">{healthScore}/100</div>
            <Progress value={healthScore} className="h-2 mt-1" />
          </div>
        </div>
        
        <div className="h-64">
          <ChartContainer config={{}} className="p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={growthData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return `${d.getMonth()+1}/${d.getDate()}`;
                  }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="height" 
                  name="Height (cm)" 
                  stroke="#4ade80" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="health" 
                  name="Health (%)" 
                  stroke="#f97316" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualGrowthTracker;
