
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import IrrigationPrediction from "@/components/IrrigationPrediction";
import PlantLibrary from "@/components/PlantLibrary";
import ChatBot from "@/components/ChatBot";
import VisualGrowthTracker from "@/components/VisualGrowthTracker";
import IrrigationDNA from "@/components/IrrigationDNA";
import PlantCapture from "@/components/PlantCapture";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"home" | "prediction" | "library" | "growth" | "dna" | "capture">("home");
  const { translate } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">Smart Garden Irrigation Advisor</h1>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button 
                    variant="ghost"
                    onClick={() => setActiveTab("home")}
                    className={activeTab === "home" ? "bg-green-100" : ""}
                  >
                    {translate("nav.home")}
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button 
                    variant="ghost"
                    onClick={() => setActiveTab("prediction")}
                    className={activeTab === "prediction" ? "bg-green-100" : ""}
                  >
                    {translate("nav.prediction")}
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button 
                    variant="ghost"
                    onClick={() => setActiveTab("growth")}
                    className={activeTab === "growth" ? "bg-green-100" : ""}
                  >
                    {translate("nav.growth")}
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button 
                    variant="ghost"
                    onClick={() => setActiveTab("dna")}
                    className={activeTab === "dna" ? "bg-green-100" : ""}
                  >
                    {translate("nav.dna")}
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button 
                    variant="ghost"
                    onClick={() => setActiveTab("capture")}
                    className={activeTab === "capture" ? "bg-green-100" : ""}
                  >
                    {translate("nav.capture")}
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button 
                    variant="ghost"
                    onClick={() => setActiveTab("library")}
                    className={activeTab === "library" ? "bg-green-100" : ""}
                  >
                    {translate("nav.library")}
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {activeTab === "home" ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-green-700 mb-4">Welcome to Smart Garden Irrigation Advisor</h2>
              <p className="text-lg text-gray-700 mb-6">
                Your intelligent companion for precision gardening and optimal plant irrigation
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-green-600 mb-3">Smart Irrigation Prediction</h3>
                <p className="text-gray-600 mb-4">
                  Our advanced machine learning model analyzes your garden's conditions to provide precise irrigation 
                  recommendations with real-time weather integration.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                  <li>Weather-adjusted recommendations</li>
                  <li>Rain forecast integration</li>
                  <li>Heatwave & cold snap adjustments</li>
                </ul>
                <Button onClick={() => setActiveTab("prediction")} className="bg-green-600 hover:bg-green-700">
                  Try Irrigation Prediction
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-green-600 mb-3">Visual Growth Tracker</h3>
                <p className="text-gray-600 mb-4">
                  Monitor your plants' development with our visual growth tracking tools:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                  <li>Height and leaf count tracking</li>
                  <li>Health score monitoring</li>
                  <li>Growth trend visualization</li>
                  <li>Seasonal progress tracking</li>
                </ul>
                <Button onClick={() => setActiveTab("growth")} className="bg-green-600 hover:bg-green-700">
                  Track Plant Growth
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-green-600 mb-3">Irrigation DNA</h3>
                <p className="text-gray-600 mb-4">
                  Discover your plants' unique watering needs with customized profiles:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                  <li>Detailed watering patterns</li>
                  <li>Soil and container recommendations</li>
                  <li>Seasonal adjustment schedules</li>
                  <li>Weather sensitivity analysis</li>
                </ul>
                <Button onClick={() => setActiveTab("dna")} className="bg-green-600 hover:bg-green-700">
                  View Irrigation DNA
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-green-600 mb-3">Plant Capture &amp; Identify</h3>
                <p className="text-gray-600 mb-4">
                  Take a photo of any plant in your garden and get instant identification and care recommendations:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                  <li>Instant plant identification</li>
                  <li>Detailed watering instructions</li>
                  <li>Custom irrigation plans</li>
                  <li>Seasonal care advice</li>
                </ul>
                <Button onClick={() => setActiveTab("capture")} className="bg-green-600 hover:bg-green-700">
                  Capture a Plant
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-green-600 mb-3">Why Use Smart Irrigation?</h3>
              <p className="text-gray-600 mb-4">
                Our data-driven approach helps you:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-md">
                  <p className="font-medium text-green-700">Save Water</p>
                  <p className="text-sm text-gray-600">Reduce waste with precise irrigation</p>
                </div>
                <div className="p-3 bg-green-50 rounded-md">
                  <p className="font-medium text-green-700">Healthier Plants</p>
                  <p className="text-sm text-gray-600">Optimal moisture for growth</p>
                </div>
                <div className="p-3 bg-green-50 rounded-md">
                  <p className="font-medium text-green-700">Save Time</p>
                  <p className="text-sm text-gray-600">Know exactly when to water</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === "prediction" ? (
          <IrrigationPrediction />
        ) : activeTab === "growth" ? (
          <VisualGrowthTracker />
        ) : activeTab === "dna" ? (
          <IrrigationDNA />
        ) : activeTab === "capture" ? (
          <PlantCapture />
        ) : activeTab === "library" ? (
          <PlantLibrary />
        ) : null}
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
