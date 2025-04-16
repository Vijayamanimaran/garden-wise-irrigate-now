
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PLANT_DATABASE } from "@/data/plantDatabase";
import { Camera, ImageIcon, Info, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PlantCapture = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [identifiedPlant, setIdentifiedPlant] = useState<typeof PLANT_DATABASE[0] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Start camera stream
  const startCamera = async () => {
    if (videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        videoRef.current.srcObject = stream;
        setCapturedImage(null);
        setIdentifiedPlant(null);
      } catch (err) {
        toast({
          title: "Camera Error",
          description: "Could not access camera. Please ensure you've granted camera permissions.",
          variant: "destructive"
        });
        console.error("Error accessing camera:", err);
      }
    }
  };

  // Take a photo from the video stream
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        const imageDataUrl = canvasRef.current.toDataURL('image/png');
        setCapturedImage(imageDataUrl);
        
        // Stop video stream
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
          videoRef.current.srcObject = null;
        }
        
        // Analyze the image
        identifyPlant(imageDataUrl);
      }
    }
  };

  // Upload an image from device
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string;
      setCapturedImage(imageDataUrl);
      identifyPlant(imageDataUrl);
    };
    
    reader.readAsDataURL(file);
    // Reset input value for future uploads
    e.target.value = '';
  };

  // Trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Start over - clear image and identification
  const handleReset = () => {
    setCapturedImage(null);
    setIdentifiedPlant(null);
  };

  // Simulate plant identification (in a real app, this would connect to an API)
  const identifyPlant = (imageUrl: string) => {
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Randomly select a plant from the database to simulate identification
      const randomIndex = Math.floor(Math.random() * PLANT_DATABASE.length);
      const plant = PLANT_DATABASE[randomIndex];
      
      setIdentifiedPlant(plant);
      setIsAnalyzing(false);
      
      toast({
        title: "Plant Identified",
        description: `This appears to be a ${plant.name}!`,
      });
    }, 2000); // 2 second delay to simulate processing
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Plant Capture & Identify</CardTitle>
        <CardDescription>
          Capture or upload a photo of your plant to get detailed irrigation information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Camera/Image Capture Area */}
        <div className="bg-gray-50 border rounded-lg overflow-hidden relative aspect-video">
          {!capturedImage ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={capturedImage} 
              alt="Captured plant" 
              className="w-full h-full object-contain" 
            />
          )}
          
          {/* Canvas for processing (invisible) */}
          <canvas ref={canvasRef} className="hidden" />
          
          {/* File input (hidden) */}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileUpload}
          />
          
          {/* Analyzing indicator */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center space-y-2">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto" />
                <p>Analyzing plant...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {!capturedImage ? (
            <>
              {!videoRef.current?.srcObject ? (
                <Button onClick={startCamera} className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  <span>Start Camera</span>
                </Button>
              ) : (
                <Button onClick={capturePhoto} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  <span>Capture</span>
                </Button>
              )}
              <Button onClick={handleUploadClick} variant="outline" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span>Upload Image</span>
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </Button>
            </>
          )}
        </div>
        
        {/* Identified Plant Information */}
        {identifiedPlant && (
          <div className="animate-in fade-in duration-300 mt-4 space-y-4">
            <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
              <div className="text-3xl">{identifiedPlant.icon || '🌱'}</div>
              <div>
                <h3 className="text-lg font-medium text-green-800">{identifiedPlant.name}</h3>
                <p className="text-sm text-green-600">{identifiedPlant.type}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  <span>Plant Details</span>
                </h4>
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <p className="text-sm">{identifiedPlant.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Water Needs:</span>
                      <p className="font-medium">{identifiedPlant.waterNeeds}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Sunlight:</span>
                      <p className="font-medium">{identifiedPlant.sunlight}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  <span>Irrigation Plan</span>
                </h4>
                <div className="bg-green-50 p-3 rounded-lg border border-green-100 space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500">Method:</span>
                    <p className="font-medium">{identifiedPlant.irrigationMethod}</p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Ideal Conditions:</span>
                    <p className="font-medium">{identifiedPlant.idealConditions}</p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Season:</span>
                    <p className="font-medium">{identifiedPlant.seasonality}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-green-200">
                    <p className="text-sm font-medium text-green-700">Watering Recommendation:</p>
                    <p className="text-sm">
                      {identifiedPlant.waterNeeds === "Low" 
                        ? "Water sparingly, allowing soil to dry completely between waterings."
                        : identifiedPlant.waterNeeds === "Medium"
                          ? "Keep soil moderately moist, watering when the top inch of soil feels dry."
                          : "Maintain consistent moisture, never allowing the soil to dry out completely."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-500 border-t pt-4">
        Note: For best results, ensure good lighting and capture a clear image of the plant.
      </CardFooter>
    </Card>
  );
};

export default PlantCapture;
