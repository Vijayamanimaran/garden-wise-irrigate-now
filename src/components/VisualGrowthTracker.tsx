
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PLANT_NAMES } from "@/data/plantDatabase";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Leaf, ArrowUp, ArrowDown, Upload, Camera, UploadCloud, CalendarDays, TrendingUp } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface GrowthData {
  id: number;
  date: string;
  height: number;
  leaves: number;
  health: number;
}

interface ImageData {
  id: number;
  date: string;
  url: string;
  healthScore: number;
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

// Generate example image data
const generateMockImageData = (plantName: string, growthData: GrowthData[]): ImageData[] => {
  // Generate sparse image history (not for every day)
  const images: ImageData[] = [];
  
  // Add 4-6 photos distributed over the time period
  const photoCount = 4 + Math.floor(Math.random() * 3);
  const dataLength = growthData.length;
  
  for (let i = 0; i < photoCount; i++) {
    // Distribute evenly across the time period
    const index = Math.floor((i * (dataLength-1)) / (photoCount-1));
    const entry = growthData[index];
    
    images.push({
      id: i,
      date: entry.date,
      url: `https://source.unsplash.com/300x300/?${plantName.toLowerCase()},plant,growth&random=${i}`,
      healthScore: entry.health
    });
  }
  
  return images;
};

// Helper function to format dates
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Simulates an AI analysis of the plant growth
const simulateAIAnalysis = (plantName: string, growthData: GrowthData[], imageData: ImageData[]) => {
  if (growthData.length < 2 || imageData.length < 2) return null;
  
  const firstEntry = growthData[0];
  const lastEntry = growthData[growthData.length - 1];
  const heightGrowth = ((lastEntry.height - firstEntry.height) / firstEntry.height) * 100;
  const leafGrowth = lastEntry.leaves - firstEntry.leaves;
  
  // Simulate health assessment
  let healthStatus = "healthy";
  const recentHealth = lastEntry.health;
  if (recentHealth < 70) healthStatus = "struggling";
  else if (recentHealth < 85) healthStatus = "good";
  
  // Simulate care recommendations
  const recommendations = [];
  if (recentHealth < 80) {
    recommendations.push("Consider increasing watering frequency");
  }
  if (heightGrowth < 10) {
    recommendations.push("Check light conditions for optimal growth");
  }
  if (leafGrowth < 3) {
    recommendations.push("Add balanced fertilizer to promote leaf growth");
  }
  
  return {
    growthPercentage: Math.round(heightGrowth),
    leafGrowth,
    healthStatus,
    recommendations,
    timePeriod: `${formatDate(firstEntry.date)} - ${formatDate(lastEntry.date)}`,
  };
};

const VisualGrowthTracker = () => {
  const [selectedPlantType, setSelectedPlantType] = useState<string>("Ornamental");
  const [selectedPlantName, setSelectedPlantName] = useState<string>("Rose");
  const [growthData, setGrowthData] = useState<GrowthData[]>([]);
  const [availablePlants, setAvailablePlants] = useState<string[]>(PLANT_NAMES["Ornamental"] || []);
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // When plant type changes, update available plants and select the first one
    if (PLANT_NAMES[selectedPlantType]) {
      setAvailablePlants(PLANT_NAMES[selectedPlantType]);
      setSelectedPlantName(PLANT_NAMES[selectedPlantType][0]);
    }
  }, [selectedPlantType]);
  
  useEffect(() => {
    // Generate new data when plant name changes
    const newGrowthData = generateMockGrowthData(selectedPlantName);
    setGrowthData(newGrowthData);
    
    // Generate image data
    const newImageData = generateMockImageData(selectedPlantName, newGrowthData);
    setImageData(newImageData);
    
    // Run AI analysis
    setTimeout(() => {
      setAnalysisResult(simulateAIAnalysis(selectedPlantName, newGrowthData, newImageData));
    }, 500);
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
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // In a real app, we'd upload the file to a server
    // Here we'll simulate a successful upload
    toast({
      title: "Photo uploaded successfully!",
      description: "Your plant photo is being analyzed for growth tracking.",
    });
    
    // Clear the input for future uploads
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Simulate adding a new entry with the current date
    const today = new Date().toISOString().split('T')[0];
    const newId = imageData.length > 0 ? Math.max(...imageData.map(img => img.id)) + 1 : 0;
    
    // Generate a health score based on previous trend
    const newHealthScore = growthData.length > 0 
      ? growthData[growthData.length - 1].health + (Math.random() * 10 - 5)
      : 85 + (Math.random() * 10 - 5);
      
    const newImage: ImageData = {
      id: newId,
      date: today,
      url: `https://source.unsplash.com/300x300/?${selectedPlantName.toLowerCase()},plant,growth&random=${newId}`,
      healthScore: Math.min(100, Math.max(0, newHealthScore))
    };
    
    // In a real app, we'd get this data from the server after analysis
    const updatedImageData = [...imageData, newImage];
    setImageData(updatedImageData);
    
    // Wait for "analysis" to complete
    setTimeout(() => {
      toast({
        title: "Analysis complete!",
        description: `Your ${selectedPlantName} looks ${newHealthScore > 80 ? 'healthy!' : 'like it needs attention.'}`,
      });
      
      // Update analysis results
      setAnalysisResult(simulateAIAnalysis(selectedPlantName, growthData, updatedImageData));
    }, 2000);
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
        <CardDescription>Monitor your plant's growth and health over time with AI-powered analysis</CardDescription>
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
        
        {/* AI Analysis Summary */}
        {analysisResult && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-100 animate-in fade-in">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-medium text-green-800">Growth Summary</h3>
            </div>
            <p className="text-green-700 font-medium mb-2">
              Your {selectedPlantName.toLowerCase()} has grown {analysisResult.growthPercentage}% over the past 30 days!
            </p>
            <p className="text-green-600 text-sm mb-1">
              {analysisResult.leafGrowth > 0 ? `Added ${analysisResult.leafGrowth} new leaves` : "Leaf count stable"}
            </p>
            <p className="text-green-600 text-sm mb-3">
              Overall health: <span className="font-medium">{analysisResult.healthStatus}</span>
            </p>
            
            {analysisResult.recommendations.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-amber-700">Recommendations:</p>
                <ul className="text-sm text-amber-700 list-disc list-inside">
                  {analysisResult.recommendations.map((rec: string, i: number) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {/* Photo Gallery */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Growth Photo Gallery</h3>
            <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button onClick={handleUploadClick} size="sm" className="flex items-center gap-1">
                <UploadCloud className="h-4 w-4" />
                <span>Upload New Photo</span>
              </Button>
            </div>
          </div>
          
          {imageData.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imageData.map((image) => (
                <div key={image.id} className="space-y-1">
                  <div className="relative aspect-square rounded-md overflow-hidden border border-gray-200">
                    <img 
                      src={image.url} 
                      alt={`${selectedPlantName} on ${formatDate(image.date)}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                      {formatDate(image.date)}
                    </div>
                    <div className={`absolute top-2 right-2 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ${
                      image.healthScore > 85 ? 'bg-green-500' : 
                      image.healthScore > 70 ? 'bg-yellow-500' : 'bg-red-500'
                    } text-white`}>
                      {Math.round(image.healthScore)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border border-dashed rounded-lg">
              <Camera className="mx-auto h-10 w-10 text-gray-400 mb-2" />
              <p className="text-gray-500">No photos yet. Upload your first plant photo!</p>
            </div>
          )}
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
      <CardFooter className="border-t pt-6">
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <CalendarDays className="h-4 w-4" />
          <span>Tracking started {growthData.length > 0 ? formatDate(growthData[0].date) : 'today'}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VisualGrowthTracker;
