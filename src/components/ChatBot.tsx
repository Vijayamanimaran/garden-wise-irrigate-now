
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, MessageCircle, Send } from "lucide-react";

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
  
  "how does soil type affect irrigation?": "Sandy soils drain quickly and need frequent, light watering. Clay soils hold water longer but need slow, infrequent watering to avoid waterlogging. Loamy soils have balanced drainage and are ideal for most plants."
};

// Quick question suggestions
const QUICK_QUESTIONS = [
  "What's the best irrigation method for roses?",
  "How much water do tomatoes need?",
  "Is irrigation needed if humidity is high?",
  "How to reduce evaporation loss?",
  "How often should I water succulents?",
  "Best time to water plants?"
];

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your garden irrigation assistant. How can I help you today?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = { text: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    // Find answer in database
    const lowerCaseInput = inputMessage.toLowerCase();
    let botResponse = "I don't have specific information on that. Perhaps try another gardening question about irrigation needs or methods?";
    
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
