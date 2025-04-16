
import React, { createContext, useContext, useState, useEffect } from "react";

// Define supported languages
export type Language = "english" | "hindi" | "tamil" | "telugu" | "kannada" | "malayalam" | "tulu";

// Language display names
export const languageNames: Record<Language, string> = {
  english: "English",
  hindi: "हिंदी (Hindi)",
  tamil: "தமிழ் (Tamil)",
  telugu: "తెలుగు (Telugu)",
  kannada: "ಕನ್ನಡ (Kannada)",
  malayalam: "മലയാളം (Malayalam)",
  tulu: "ತುಳು (Tulu)"
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Basic translations for demonstration
const translations: Record<Language, Record<string, string>> = {
  english: {
    "plant.library.title": "Plant Irrigation Library",
    "plant.library.description": "Browse detailed irrigation information for 500+ garden plants",
    "plant.library.showing": "Showing",
    "plant.library.of": "of",
    "plant.library.plants": "plants",
    "plant.library.noPlants": "No plants found matching your search criteria.",
    "plant.library.search": "Search plants...",
    "plant.library.type": "Plant Type",
    "plant.library.waterNeeds": "Water Needs",
    "nav.home": "Home",
    "nav.prediction": "Irrigation Prediction",
    "nav.growth": "Growth Tracker",
    "nav.dna": "Irrigation DNA",
    "nav.capture": "Plant Capture",
    "nav.library": "Plant Library",
    "language": "Language"
  },
  hindi: {
    "plant.library.title": "पौधा सिंचाई पुस्तकालय",
    "plant.library.description": "500+ से अधिक बगीचे के पौधों के लिए विस्तृत सिंचाई जानकारी ब्राउज़ करें",
    "plant.library.showing": "दिखा रहा है",
    "plant.library.of": "का",
    "plant.library.plants": "पौधे",
    "plant.library.noPlants": "आपके खोज मापदंडों से मेल खाने वाले कोई पौधे नहीं मिले।",
    "plant.library.search": "पौधे खोजें...",
    "plant.library.type": "पौधे का प्रकार",
    "plant.library.waterNeeds": "पानी की आवश्यकता",
    "nav.home": "होम",
    "nav.prediction": "सिंचाई भविष्यवाणी",
    "nav.growth": "विकास ट्रैकर",
    "nav.dna": "सिंचाई डीएनए",
    "nav.capture": "पौधा कैप्चर",
    "nav.library": "पौधा पुस्तकालय",
    "language": "भाषा"
  },
  tamil: {
    "plant.library.title": "தாவர நீர்ப்பாசன நூலகம்",
    "plant.library.description": "500+ தோட்டத் தாவரங்களுக்கான விரிவான நீர்ப்பாசனத் தகவல்களை உலாவுங்கள்",
    "plant.library.showing": "காட்டுகிறது",
    "plant.library.of": "இல்",
    "plant.library.plants": "தாவரங்கள்",
    "plant.library.noPlants": "உங்கள் தேடல் அளவுகோல்களுக்கு பொருந்தும் தாவரங்கள் எதுவும் இல்லை.",
    "plant.library.search": "தாவரங்களைத் தேடுங்கள்...",
    "plant.library.type": "தாவர வகை",
    "plant.library.waterNeeds": "நீர் தேவைகள்",
    "nav.home": "முகப்பு",
    "nav.prediction": "நீர்ப்பாசன முன்னறிவிப்பு",
    "nav.growth": "வளர்ச்சி கண்காணிப்பு",
    "nav.dna": "நீர்ப்பாசன டிஎன்ஏ",
    "nav.capture": "தாவர கேப்சர்",
    "nav.library": "தாவர நூலகம்",
    "language": "மொழி"
  },
  telugu: {
    "plant.library.title": "మొక్క నీటి పారుదల లైబ్రరీ",
    "plant.library.description": "500+ గార్డెన్ మొక్కల కోసం వివరణాత్మక నీటి పారుదల సమాచారాన్ని బ్రౌజ్ చేయండి",
    "plant.library.showing": "చూపిస్తోంది",
    "plant.library.of": "యొక్క",
    "plant.library.plants": "మొక్కలు",
    "plant.library.noPlants": "మీ శోధన ప్రమాణాలకు సరిపోలే మొక్కలు కనుగొనబడలేదు.",
    "plant.library.search": "మొక్కలను శోధించండి...",
    "plant.library.type": "మొక్క రకం",
    "plant.library.waterNeeds": "నీటి అవసరాలు",
    "nav.home": "హోమ్",
    "nav.prediction": "నీటి పారుదల అంచనా",
    "nav.growth": "పెరుగుదల ట్రాకర్",
    "nav.dna": "నీటి పారుదల డిఎన్ఏ",
    "nav.capture": "మొక్క కాప్చర్",
    "nav.library": "మొక్కల లైబ్రరీ",
    "language": "భాష"
  },
  kannada: {
    "plant.library.title": "ಸಸ್ಯ ನೀರಾವರಿ ಗ್ರಂಥಾಲಯ",
    "plant.library.description": "500+ ಉದ್ಯಾನ ಸಸ್ಯಗಳಿಗೆ ವಿವರವಾದ ನೀರಾವರಿ ಮಾಹಿತಿಯನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
    "plant.library.showing": "ತೋರಿಸುತ್ತಿದೆ",
    "plant.library.of": "ರಲ್ಲಿ",
    "plant.library.plants": "ಸಸ್ಯಗಳು",
    "plant.library.noPlants": "ನಿಮ್ಮ ಹುಡುಕಾಟ ಮಾನದಂಡಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ಸಸ್ಯಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    "plant.library.search": "ಸಸ್ಯಗಳನ್ನು ಹುಡುಕಿ...",
    "plant.library.type": "ಸಸ್ಯದ ಪ್ರಕಾರ",
    "plant.library.waterNeeds": "ನೀರಿನ ಅಗತ್ಯಗಳು",
    "nav.home": "ಮುಖಪುಟ",
    "nav.prediction": "ನೀರಾವರಿ ಮುನ್ಸೂಚನೆ",
    "nav.growth": "ಬೆಳವಣಿಗೆ ಟ್ರ್ಯಾಕರ್",
    "nav.dna": "ನೀರಾವರಿ ಡಿಎನ್ಎ",
    "nav.capture": "ಸಸ್ಯ ಕ್ಯಾಪ್ಚರ್",
    "nav.library": "ಸಸ್ಯ ಗ್ರಂಥಾಲಯ",
    "language": "ಭಾಷೆ"
  },
  malayalam: {
    "plant.library.title": "സസ്യ ജലസേചന ലൈബ്രറി",
    "plant.library.description": "500+ ഗാർഡൻ സസ്യങ്ങൾക്കായുള്ള വിശദമായ ജലസേചന വിവരങ്ങൾ ബ്രൗസ് ചെയ്യുക",
    "plant.library.showing": "കാണിക്കുന്നു",
    "plant.library.of": "ഓഫ്",
    "plant.library.plants": "സസ്യങ്ങൾ",
    "plant.library.noPlants": "നിങ്ങളുടെ തിരയൽ മാനദണ്ഡങ്ങളുമായി പൊരുത്തപ്പെടുന്ന സസ്യങ്ങളൊന്നും കണ്ടെത്തിയില്ല.",
    "plant.library.search": "സസ്യങ്ങൾ തിരയുക...",
    "plant.library.type": "സസ്യ തരം",
    "plant.library.waterNeeds": "ജലാവശ്യകത",
    "nav.home": "ഹോം",
    "nav.prediction": "ജലസേചന പ്രവചനം",
    "nav.growth": "വളർച്ചാ ട്രാക്കർ",
    "nav.dna": "ജലസേചന ഡിഎൻഎ",
    "nav.capture": "സസ്യ ക്യാപ്ച്ചർ",
    "nav.library": "സസ്യ ലൈബ്രറി",
    "language": "ഭാഷ"
  },
  tulu: {
    "plant.library.title": "ಗಿಡದ ನೀರಾವರಿ ಗ್ರಂಥಾಲಯ",
    "plant.library.description": "500+ ಗಿದಾವಾಡಿ ಗಿಡೊಲೆಗ್ ವಿವರವಾಯಿನ ನೀರಾವರಿ ಮಾಹಿತಿನ್ ಬ್ರೌಸ್ ಮಲ್ಪುಲೆ",
    "plant.library.showing": "ತೋಜಾವೊಂದುಂಡು",
    "plant.library.of": "ದ",
    "plant.library.plants": "ಗಿಡೊಲು",
    "plant.library.noPlants": "ಎರೆನ ಶೋಧನೆ ಮಾನದಂಡೊಲೆಗ್ ಹೊಂದುನ ಗಿಡೊಲು ಯಾವಯಾ ತಿಕ್ಕಂದಿಜ್ಜಿ.",
    "plant.library.search": "ಗಿಡೊಲೆನ್ ಶೋಧನೆ ಮಲ್ಪುಲೆ...",
    "plant.library.type": "ಗಿಡದ ವಿಧ",
    "plant.library.waterNeeds": "ನೀರಿನ ಅಗತ್ಯೊಲು",
    "nav.home": "ಮನೆಪುಟ",
    "nav.prediction": "ನೀರಾವರಿ ಪ್ರವಚನ",
    "nav.growth": "ಬೆಳೆವು ಟ್ರ್ಯಾಕರ್",
    "nav.dna": "ನೀರಾವರಿ ಡಿಎನ್ಎ",
    "nav.capture": "ಗಿಡ ಕ್ಯಾಪ್ಚರ್",
    "nav.library": "ಗಿಡದ ಗ್ರಂಥಾಲಯ",
    "language": "ಭಾಷೆ"
  }
};

type LanguageProviderProps = {
  children: React.ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("appLanguage");
    return (savedLanguage as Language) || "english";
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("appLanguage", language);
  }, [language]);

  // Function to set language
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  // Function to get translation
  const translate = (key: string): string => {
    return translations[language][key] || translations.english[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
