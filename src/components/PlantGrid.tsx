
import { Plant } from "@/data/plantDatabase";
import PlantCard from "./PlantCard";

interface PlantGridProps {
  plants: Plant[];
}

const PlantGrid = ({ plants }: PlantGridProps) => {
  if (plants.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No plants found matching your search criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
};

export default PlantGrid;
