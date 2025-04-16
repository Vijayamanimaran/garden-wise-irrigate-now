import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, MessageCircle, Send, Upload, LineChart, Sprout, Camera } from "lucide-react";

// Mock Q&A database for the chatbot
const QA_DATABASE = {
  "what's the best irrigation method for roses?": "Roses generally do best with drip irrigation, which delivers water directly to the root zone. This helps prevent fungal diseases by keeping the foliage dry.",
  
  "how much water do tomatoes need?": "Tomatoes require consistent moisture, typically 1-2 inches of water per week (about 2-3 liters per day). Water deeply a few times a week rather than frequent shallow watering.",
  
  "is irrigation needed if humidity is high?": "Even in high humidity, plants still need irrigation, though perhaps less. While evaporation slows in humid conditions, soil can still dry out. Monitor soil moisture rather than relying solely on humidity levels.",
  
  "how to reduce evaporation loss?": "To reduce evaporation: 1) Use mulch around plants (2-3 inches), 2) Water in the early morning or evening, 3) Use drip irrigation instead of sprinklers, 4) Add organic matter to soil to improve water retention.",
  
  "how often should I water succulents?": "Most succulents should be watered deeply but infrequently - typically every 2-3 weeks. Always allow the soil to dry completely between waterings to prevent root rot.",
  
  "best time to water plants?": "The best time to water plants is early morning, ideally between 5-9 AM. This allows water to reach the roots before evaporation becomes significant and gives foliage time to dry, reducing disease risk.",
  
  "signs of overwatering?": "Signs of overwatering include yellowing leaves, soft or mushy stems, wilting despite wet soil, fungus or mold growth, and a rotting smell from the soil. Allow soil to dry between waterings if you notice these symptoms.",
  
  "drought resistant plants?": "Good drought-resistant plants include lavender, rosemary, sage, succulents, cacti, yarrow, Russian sage, and ornamental grasses like blue fescue and feather reed grass.",
  
  "how does soil type affect irrigation?": "Sandy soils drain quickly and need frequent, light watering. Clay soils hold water longer but need slow, infrequent watering to avoid waterlogging. Loamy soils have balanced drainage and are ideal for most plants.",
  
  "how to track plant growth?": "You can use our Visual Growth Tracker feature to upload photos of your plants over time. Our AI will analyze the images and track your plant's growth progress, providing visual reports and insights.",
  
  "what is growth tracking?": "Growth tracking is a feature that lets you monitor your plant's development over time. Upload photos regularly, and our system will calculate growth percentages, health scores, and provide visual charts of your plant's progress.",
  
  "how often should I take plant photos?": "For optimal growth tracking, we recommend taking photos once a week for fast-growing plants like herbs and vegetables, and once every 2-4 weeks for slower growing plants like succulents and indoor plants.",
  
  "what metrics does growth tracking measure?": "Our Visual Growth Tracker measures height changes, leaf count, overall plant volume, color vibrancy, and calculates a health score based on these factors combined with seasonal expectations.",
  
  "how do I use growth tracker?": "To use the Visual Growth Tracker, navigate to the Growth Tracker tab, select your plant type, upload a clear photo of your plant, and add a measurement reference if possible. Continue adding photos over time to see your plant's growth journey.",
  
  "can I see growth stats?": "Yes! The Visual Growth Tracker provides growth percentage over time, health score trends, and comparative analysis with typical growth rates for your specific plant type. You'll receive encouraging updates like 'Your Basil grew 20% in 30 days!'",
  
  "what if my plant isn't growing?": "If your plant shows minimal growth, our system will analyze possible causes based on your inputs about watering, sunlight, and season. We'll provide targeted recommendations to help improve your plant's growth rate.",
  
  "what is plant capture?": "Plant Capture is a feature that lets you take or upload a photo of any plant to get instant identification and detailed irrigation recommendations tailored to that specific plant.",
  
  "how to identify a plant?": "To identify a plant, navigate to the Plant Capture tab and either use your camera to take a photo or upload an existing image. Our system will analyze the image and provide identification along with care recommendations.",
  
  "plant identification not working?": "For best plant identification results, ensure good lighting, clear focus, and capture a photo that includes distinct features like leaves, flowers, or overall plant structure. Try again with a clearer image if you're having issues.",
  
  "are plant care recommendations accurate?": "Our plant care recommendations are based on general best practices for each plant type. For specialized care, consider consulting with a local garden center or extension service for advice specific to your climate and growing conditions."
};

// Add new plant capture questions to quick suggestions
const QUICK_QUESTIONS = [
  "What's the best irrigation method for roses?",
  "How much water do tomatoes need?",
  "How to track plant growth?",
  "Can I see growth stats?",
  "What is plant capture?",
  "How to identify a plant?"
];

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your garden irrigation and growth tracking assistant. How can I help you today?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = { text: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    // Find answer in database
    const lowerCaseInput = inputMessage.toLowerCase();
    let botResponse = "I don't have specific information on that. Perhaps try asking about irrigation needs, methods, plant growth tracking, or plant identification?";
    
    // Check for matching questions in our database
    for (const [question, answer] of Object.entries(QA_DATABASE)) {
      if (lowerCaseInput.includes(question) || 
          question.includes(lowerCaseInput) ||
          lowerCaseInput.split(' ').some(word => 
            word.length > 3 && question.includes(word))) {
        botResponse = answer;
        break;
      }
    }
    
    // Add special responses for plant capture keywords
    if (
      lowerCaseInput.includes("identify plant") || 
      lowerCaseInput.includes("plant photo") ||
      lowerCaseInput.includes("capture plant")
    ) {
      botResponse = "You can identify plants by taking a photo using our Plant Capture feature. Go to the Plant Capture tab and use your camera or upload a photo. We'll identify the plant and provide tailored irrigation recommendations.";
    }
    
    // Add bot response with a small delay
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    }, 600);
    
    setInputMessage("");
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    
    // Auto-send after a brief delay
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg bg-green-600 hover:bg-green-700"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      {/* Chat dialog */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 shadow-xl z-50 animate-in fade-in zoom-in duration-200">
          <Card>
            <CardHeader className="py-3 px-4 border-b flex flex-row items-center justify-between bg-green-600 text-white rounded-t-lg">
              <CardTitle className="text-base">Garden Assistant</CardTitle>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 text-white hover:text-white hover:bg-green-700 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages container */}
              <div className="h-96 overflow-y-auto p-4 flex flex-col space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? "ml-auto bg-green-100 text-green-900"
                        : "mr-auto bg-gray-100"
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
              
              {/* Feature icons */}
              <div className="px-3 pt-2 pb-1 border-t flex justify-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex flex-col items-center text-xs text-green-700 hover:bg-green-50"
                  onClick={() => handleQuickQuestion("How to track plant growth?")}
                >
                  <Upload className="h-4 w-4 mb-1" />
                  <span>Upload</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex flex-col items-center text-xs text-green-700 hover:bg-green-50"
                  onClick={() => handleQuickQuestion("Can I see growth stats?")}
                >
                  <LineChart className="h-4 w-4 mb-1" />
                  <span>Stats</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex flex-col items-center text-xs text-green-700 hover:bg-green-50"
                  onClick={() => handleQuickQuestion("What metrics does growth tracking measure?")}
                >
                  <Sprout className="h-4 w-4 mb-1" />
                  <span>Metrics</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex flex-col items-center text-xs text-green-700 hover:bg-green-50"
                  onClick={() => handleQuickQuestion("What is plant capture?")}
                >
                  <Camera className="h-4 w-4 mb-1" />
                  <span>Identify</span>
                </Button>
              </div>
              
              {/* Quick questions */}
              <div className="p-2 border-t overflow-x-auto whitespace-nowrap">
                <div className="flex space-x-2">
                  {QUICK_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="px-3 py-1 text-xs bg-green-50 border border-green-100 rounded-full hover:bg-green-100 whitespace-nowrap"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Input area */}
              <div className="p-3 border-t flex items-center gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask a question..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                <Button 
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;
