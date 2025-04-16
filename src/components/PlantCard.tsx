
import { Plant } from "@/data/plantDatabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface PlantCardProps {
  plant: Plant;
}

const PlantCard = ({ plant }: PlantCardProps) => {
  const { translate } = useLanguage();
  
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
          <span className="font-medium">{translate("plant.card.waterNeeds")}:</span>
          <span>{plant.waterNeeds}</span>
        </div>
        <div className="grid grid-cols-[80px_1fr] gap-1">
          <span className="font-medium">{translate("plant.card.irrigation")}:</span>
          <span>{plant.irrigationMethod}</span>
        </div>
        <div className="grid grid-cols-[80px_1fr] gap-1">
          <span className="font-medium">{translate("plant.card.ideal")}:</span>
          <span>{plant.idealConditions}</span>
        </div>
        <div className="grid grid-cols-[80px_1fr] gap-1">
          <span className="font-medium">{translate("plant.card.seasonality")}:</span>
          <span>{plant.seasonality}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantCard;
