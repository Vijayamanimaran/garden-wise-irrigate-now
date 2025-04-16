
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
          <h1 className="text-2xl font-bold text-green-700">{translate("app.title")}</h1>
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
              <h2 className="text-3xl font-bold text-green-700 mb-4">{translate("home.welcome")}</h2>
              <p className="text-lg text-gray-700 mb-6">
                {translate("home.subtitle")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-green-600 mb-3">{translate("home.prediction.title")}</h3>
                <p className="text-gray-600 mb-4">
                  {translate("home.prediction.description")}
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                  <li>{translate("home.prediction.feature1")}</li>
                  <li>{translate("home.prediction.feature2")}</li>
                  <li>{translate("home.prediction.feature3")}</li>
                </ul>
                <Button onClick={() => setActiveTab("prediction")} className="bg-green-600 hover:bg-green-700">
                  {translate("home.prediction.button")}
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-green-600 mb-3">{translate("home.growth.title")}</h3>
                <p className="text-gray-600 mb-4">
                  {translate("home.growth.description")}
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                  <li>{translate("home.growth.feature1")}</li>
                  <li>{translate("home.growth.feature2")}</li>
                  <li>{translate("home.growth.feature3")}</li>
                  <li>{translate("home.growth.feature4")}</li>
                </ul>
                <Button onClick={() => setActiveTab("growth")} className="bg-green-600 hover:bg-green-700">
                  {translate("home.growth.button")}
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-green-600 mb-3">{translate("home.dna.title")}</h3>
                <p className="text-gray-600 mb-4">
                  {translate("home.dna.description")}
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                  <li>{translate("home.dna.feature1")}</li>
                  <li>{translate("home.dna.feature2")}</li>
                  <li>{translate("home.dna.feature3")}</li>
                  <li>{translate("home.dna.feature4")}</li>
                </ul>
                <Button onClick={() => setActiveTab("dna")} className="bg-green-600 hover:bg-green-700">
                  {translate("home.dna.button")}
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-green-600 mb-3">{translate("home.capture.title")}</h3>
                <p className="text-gray-600 mb-4">
                  {translate("home.capture.description")}
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                  <li>{translate("home.capture.feature1")}</li>
                  <li>{translate("home.capture.feature2")}</li>
                  <li>{translate("home.capture.feature3")}</li>
                  <li>{translate("home.capture.feature4")}</li>
                </ul>
                <Button onClick={() => setActiveTab("capture")} className="bg-green-600 hover:bg-green-700">
                  {translate("home.capture.button")}
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-green-600 mb-3">{translate("home.benefits.title")}</h3>
              <p className="text-gray-600 mb-4">
                {translate("home.benefits.description")}
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-md">
                  <p className="font-medium text-green-700">{translate("home.benefits.water.title")}</p>
                  <p className="text-sm text-gray-600">{translate("home.benefits.water.description")}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-md">
                  <p className="font-medium text-green-700">{translate("home.benefits.health.title")}</p>
                  <p className="text-sm text-gray-600">{translate("home.benefits.health.description")}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-md">
                  <p className="font-medium text-green-700">{translate("home.benefits.time.title")}</p>
                  <p className="text-sm text-gray-600">{translate("home.benefits.time.description")}</p>
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
          &copy; {new Date().getFullYear()} {translate("footer.copyright")}
        </div>
      </footer>
    </div>
  );
};

export default Index;
