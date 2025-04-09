
import { Plant } from "@/data/plantDatabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PlantCardProps {
  plant: Plant;
}

const PlantCard = ({ plant }: PlantCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
  );
};

export default PlantCard;
