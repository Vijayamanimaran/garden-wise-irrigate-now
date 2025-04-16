
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANT_DATABASE } from "@/data/plantDatabase";
import PlantSearchControls from "./PlantSearchControls";
import PlantGrid from "./PlantGrid";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useLanguage } from "@/contexts/LanguageContext";

const ITEMS_PER_PAGE = 12;

const PlantLibrary = () => {
  const { translate } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [waterNeedsFilter, setWaterNeedsFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredPlants = PLANT_DATABASE.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          plant.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? plant.type === selectedType : true;
    const matchesWaterNeeds = waterNeedsFilter ? plant.waterNeeds === waterNeedsFilter : true;
    return matchesSearch && matchesType && matchesWaterNeeds;
  });

  const totalPages = Math.ceil(filteredPlants.length / ITEMS_PER_PAGE);
  const paginatedPlants = filteredPlants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>{translate("plant.library.title")}</CardTitle>
          <CardDescription>
            {translate("plant.library.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PlantSearchControls 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            waterNeedsFilter={waterNeedsFilter}
            onWaterNeedsChange={setWaterNeedsFilter}
          />
          
          <div className="mb-4 text-sm text-gray-500">
            {translate("plant.library.showing")} {paginatedPlants.length} {translate("plant.library.of")} {filteredPlants.length} {translate("plant.library.plants")}
          </div>
          
          <PlantGrid plants={paginatedPlants} />
          
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink 
                          isActive={currentPage === pageNum}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantLibrary;
