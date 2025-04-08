
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import IrrigationPrediction from "@/components/IrrigationPrediction";
import PlantLibrary from "@/components/PlantLibrary";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"prediction" | "library">("prediction");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">Smart Garden Irrigation Advisor</h1>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button 
                  variant="ghost"
                  onClick={() => setActiveTab("prediction")}
                  className={activeTab === "prediction" ? "bg-green-100" : ""}
                >
                  Irrigation Prediction
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button 
                  variant="ghost"
                  onClick={() => setActiveTab("library")}
                  className={activeTab === "library" ? "bg-green-100" : ""}
                >
                  Plant Library
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {activeTab === "prediction" ? (
          <IrrigationPrediction />
        ) : (
          <PlantLibrary />
        )}
      </main>

      {/* ChatBot */}
      <ChatBot />

      {/* Footer */}
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Smart Garden Irrigation Advisor. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
