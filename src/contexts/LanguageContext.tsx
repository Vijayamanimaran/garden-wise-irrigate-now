
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
    // App-wide
    "app.title": "Smart Garden Irrigation Advisor",
    "language": "Language",
    "footer.copyright": "Smart Garden Irrigation Advisor. All rights reserved.",
    
    // Navigation
    "nav.home": "Home",
    "nav.prediction": "Irrigation Prediction",
    "nav.growth": "Growth Tracker",
    "nav.dna": "Irrigation DNA",
    "nav.capture": "Plant Capture",
    "nav.library": "Plant Library",
    
    // Home page
    "home.welcome": "Welcome to Smart Garden Irrigation Advisor",
    "home.subtitle": "Your intelligent companion for precision gardening and optimal plant irrigation",
    
    // Prediction section
    "home.prediction.title": "Smart Irrigation Prediction",
    "home.prediction.description": "Our advanced machine learning model analyzes your garden's conditions to provide precise irrigation recommendations with real-time weather integration.",
    "home.prediction.feature1": "Weather-adjusted recommendations",
    "home.prediction.feature2": "Rain forecast integration",
    "home.prediction.feature3": "Heatwave & cold snap adjustments",
    "home.prediction.button": "Try Irrigation Prediction",
    
    // Growth section
    "home.growth.title": "Visual Growth Tracker",
    "home.growth.description": "Monitor your plants' development with our visual growth tracking tools:",
    "home.growth.feature1": "Height and leaf count tracking",
    "home.growth.feature2": "Health score monitoring",
    "home.growth.feature3": "Growth trend visualization",
    "home.growth.feature4": "Seasonal progress tracking",
    "home.growth.button": "Track Plant Growth",
    
    // DNA section
    "home.dna.title": "Irrigation DNA",
    "home.dna.description": "Discover your plants' unique watering needs with customized profiles:",
    "home.dna.feature1": "Detailed watering patterns",
    "home.dna.feature2": "Soil and container recommendations",
    "home.dna.feature3": "Seasonal adjustment schedules",
    "home.dna.feature4": "Weather sensitivity analysis",
    "home.dna.button": "View Irrigation DNA",
    
    // Capture section
    "home.capture.title": "Plant Capture & Identify",
    "home.capture.description": "Take a photo of any plant in your garden and get instant identification and care recommendations:",
    "home.capture.feature1": "Instant plant identification",
    "home.capture.feature2": "Detailed watering instructions",
    "home.capture.feature3": "Custom irrigation plans",
    "home.capture.feature4": "Seasonal care advice",
    "home.capture.button": "Capture a Plant",
    
    // Benefits section
    "home.benefits.title": "Why Use Smart Irrigation?",
    "home.benefits.description": "Our data-driven approach helps you:",
    "home.benefits.water.title": "Save Water",
    "home.benefits.water.description": "Reduce waste with precise irrigation",
    "home.benefits.health.title": "Healthier Plants",
    "home.benefits.health.description": "Optimal moisture for growth",
    "home.benefits.time.title": "Save Time",
    "home.benefits.time.description": "Know exactly when to water",
    
    // Plant library
    "plant.library.title": "Plant Irrigation Library",
    "plant.library.description": "Browse detailed irrigation information for 500+ garden plants",
    "plant.library.showing": "Showing",
    "plant.library.of": "of",
    "plant.library.plants": "plants",
    "plant.library.noPlants": "No plants found matching your search criteria.",
    "plant.library.search": "Search plants...",
    "plant.library.type": "Plant Type",
    "plant.library.waterNeeds": "Water Needs",
    
    // Plant card
    "plant.card.waterNeeds": "Water Needs",
    "plant.card.irrigation": "Irrigation",
    "plant.card.ideal": "Ideal",
    "plant.card.seasonality": "Seasonality",
    
    // Filters
    "filters.allTypes": "All Types",
    "filters.additionalFilters": "Additional Filters",
    "filters.allWaterNeeds": "All water needs",
    "filters.waterNeeds.low": "Low",
    "filters.waterNeeds.medium": "Medium",
    "filters.waterNeeds.high": "High",
    "filters.waterNeeds.veryLow": "Very Low",
    "filters.waterNeeds.veryHigh": "Very High"
  },
  hindi: {
    // App-wide
    "app.title": "स्मार्ट गार्डन सिंचाई सलाहकार",
    "language": "भाषा",
    "footer.copyright": "स्मार्ट गार्डन सिंचाई सलाहकार। सर्वाधिकार सुरक्षित।",
    
    // Navigation
    "nav.home": "होम",
    "nav.prediction": "सिंचाई भविष्यवाणी",
    "nav.growth": "विकास ट्रैकर",
    "nav.dna": "सिंचाई डीएनए",
    "nav.capture": "पौधा कैप्चर",
    "nav.library": "पौधा पुस्तकालय",
    
    // Home page
    "home.welcome": "स्मार्ट गार्डन सिंचाई सलाहकार में आपका स्वागत है",
    "home.subtitle": "सटीक बागवानी और इष्टतम पौधों की सिंचाई के लिए आपका बुद्धिमान साथी",
    
    // Prediction section
    "home.prediction.title": "स्मार्ट सिंचाई भविष्यवाणी",
    "home.prediction.description": "हमारा उन्नत मशीन लर्निंग मॉडल वास्तविक समय के मौसम एकीकरण के साथ सटीक सिंचाई सिफारिशें प्रदान करने के लिए आपके बगीचे की स्थितियों का विश्लेषण करता है।",
    "home.prediction.feature1": "मौसम-समायोजित सिफारिशें",
    "home.prediction.feature2": "वर्षा पूर्वानुमान एकीकरण",
    "home.prediction.feature3": "हीटवेव और कोल्ड स्नैप समायोजन",
    "home.prediction.button": "सिंचाई भविष्यवाणी आज़माएं",
    
    // Growth section
    "home.growth.title": "दृश्य विकास ट्रैकर",
    "home.growth.description": "हमारे दृश्य विकास ट्रैकिंग उपकरणों के साथ अपने पौधों के विकास की निगरानी करें:",
    "home.growth.feature1": "ऊंचाई और पत्ती गणना ट्रैकिंग",
    "home.growth.feature2": "स्वास्थ्य स्कोर निगरानी",
    "home.growth.feature3": "विकास रुझान विज़ुअलाइज़ेशन",
    "home.growth.feature4": "मौसमी प्रगति ट्रैकिंग",
    "home.growth.button": "पौधों की वृद्धि ट्रैक करें",
    
    // DNA section
    "home.dna.title": "सिंचाई डीएनए",
    "home.dna.description": "अनुकूलित प्रोफाइल के साथ अपने पौधों की अनूठी पानी की जरूरतों की खोज करें:",
    "home.dna.feature1": "विस्तृत पानी देने के पैटर्न",
    "home.dna.feature2": "मिट्टी और कंटेनर की सिफारिशें",
    "home.dna.feature3": "मौसमी समायोजन कार्यक्रम",
    "home.dna.feature4": "मौसम संवेदनशीलता विश्लेषण",
    "home.dna.button": "सिंचाई डीएनए देखें",
    
    // Capture section
    "home.capture.title": "पौधा कैप्चर और पहचान",
    "home.capture.description": "अपने बगीचे में किसी भी पौधे की फोटो लें और तुरंत पहचान और देखभाल की सिफारिशें प्राप्त करें:",
    "home.capture.feature1": "तत्काल पौधों की पहचान",
    "home.capture.feature2": "विस्तृत सिंचाई निर्देश",
    "home.capture.feature3": "कस्टम सिंचाई योजनाएं",
    "home.capture.feature4": "मौसमी देखभाल सलाह",
    "home.capture.button": "एक पौधा कैप्चर करें",
    
    // Benefits section
    "home.benefits.title": "स्मार्ट सिंचाई का उपयोग क्यों करें?",
    "home.benefits.description": "हमारा डेटा-संचालित दृष्टिकोण आपकी मदद करता है:",
    "home.benefits.water.title": "पानी बचाएं",
    "home.benefits.water.description": "सटीक सिंचाई के साथ अपव्यय कम करें",
    "home.benefits.health.title": "स्वस्थ पौधे",
    "home.benefits.health.description": "विकास के लिए इष्टतम नमी",
    "home.benefits.time.title": "समय बचाएं",
    "home.benefits.time.description": "जानें कि पानी कब देना है",
    
    // Plant library
    "plant.library.title": "पौधा सिंचाई पुस्तकालय",
    "plant.library.description": "500+ से अधिक बगीचे के पौधों के लिए विस्तृत सिंचाई जानकारी ब्राउज़ करें",
    "plant.library.showing": "दिखा रहा है",
    "plant.library.of": "का",
    "plant.library.plants": "पौधे",
    "plant.library.noPlants": "आपके खोज मापदंडों से मेल खाने वाले कोई पौधे नहीं मिले।",
    "plant.library.search": "पौधे खोजें...",
    "plant.library.type": "पौधे का प्रकार",
    "plant.library.waterNeeds": "पानी की आवश्यकता",
    
    // Plant card
    "plant.card.waterNeeds": "पानी की आवश्यकता",
    "plant.card.irrigation": "सिंचाई",
    "plant.card.ideal": "आदर्श",
    "plant.card.seasonality": "मौसमी",
    
    // Filters
    "filters.allTypes": "सभी प्रकार",
    "filters.additionalFilters": "अतिरिक्त फिल्टर",
    "filters.allWaterNeeds": "सभी जल आवश्यकताएँ",
    "filters.waterNeeds.low": "कम",
    "filters.waterNeeds.medium": "मध्यम",
    "filters.waterNeeds.high": "उच्च",
    "filters.waterNeeds.veryLow": "बहुत कम",
    "filters.waterNeeds.veryHigh": "बहुत अधिक"
  },
  tamil: {
    // App-wide
    "app.title": "ஸ்மார்ட் தோட்ட நீர்ப்பாசன ஆலோசகர்",
    "language": "மொழி",
    "footer.copyright": "ஸ்மார்ட் தோட்ட நீர்ப்பாசன ஆலோசகர். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    
    // Navigation
    "nav.home": "முகப்பு",
    "nav.prediction": "நீர்ப்பாசன முன்னறிவிப்பு",
    "nav.growth": "வளர்ச்சி கண்காணிப்பு",
    "nav.dna": "நீர்ப்பாசன டிஎன்ஏ",
    "nav.capture": "தாவர கேப்சர்",
    "nav.library": "தாவர நூலகம்",
    
    // Home page
    "home.welcome": "ஸ்மார்ட் தோட்ட நீர்ப்பாசன ஆலோசகருக்கு வரவேற்கிறோம்",
    "home.subtitle": "துல்லியமான தோட்டக்கலை மற்றும் சிறந்த தாவர நீர்ப்பாசனத்திற்கான உங்கள் அறிவார்ந்த துணை",
    
    // Prediction section
    "home.prediction.title": "ஸ்மார்ட் நீர்ப்பாசன முன்னறிவிப்பு",
    "home.prediction.description": "எங்களின் மேம்பட்ட மெஷின் லெர்னிங் மாடல் உங்கள் தோட்டத்தின் நிலைமைகளை ஆராய்ந்து, உண்மையான நேர வானிலை ஒருங்கிணைப்புடன் துல்லியமான நீர்ப்பாசன பரிந்துரைகளை வழங்குகிறது.",
    "home.prediction.feature1": "வானிலை சரிசெய்யப்பட்ட பரிந்துரைகள்",
    "home.prediction.feature2": "மழை முன்னறிவிப்பு ஒருங்கிணைப்பு",
    "home.prediction.feature3": "வெப்ப அலை & குளிர் அதிர்ச்சி சரிசெய்தல்கள்",
    "home.prediction.button": "நீர்ப்பாசன முன்னறிவிப்பை முயற்சிக்கவும்",
    
    // Growth section
    "home.growth.title": "காட்சி வளர்ச்சி கண்காணிப்பி",
    "home.growth.description": "எங்கள் காட்சி வளர்ச்சி கண்காணிப்பு கருவிகளுடன் உங்கள் தாவரங்களின் வளர்ச்சியைக் கண்காணிக்கவும்:",
    "home.growth.feature1": "உயரம் மற்றும் இலை எண்ணிக்கை கண்காணிப்பு",
    "home.growth.feature2": "ஆரோக்கிய மதிப்பெண் கண்காணிப்பு",
    "home.growth.feature3": "வளர்ச்சி போக்கு காட்சிப்படுத்தல்",
    "home.growth.feature4": "பருவகால முன்னேற்ற கண்காணிப்பு",
    "home.growth.button": "தாவர வளர்ச்சியை கண்காணிக்கவும்",
    
    // DNA section
    "home.dna.title": "நீர்ப்பாசன டிஎன்ஏ",
    "home.dna.description": "தனிப்பயனாக்கப்பட்ட சுயவிவரங்களுடன் உங்கள் தாவரங்களின் தனித்துவமான நீர் தேவைகளைக் கண்டறியவும்:",
    "home.dna.feature1": "விரிவான நீர் பாய்ச்சும் முறைகள்",
    "home.dna.feature2": "மண் மற்றும் கொள்கலன் பரிந்துரைகள்",
    "home.dna.feature3": "பருவகால சரிசெய்தல் அட்டவணைகள்",
    "home.dna.feature4": "வானிலை உணர்திறன் பகுப்பாய்வு",
    "home.dna.button": "நீர்ப்பாசன டிஎன்ஏவைக் காண்க",
    
    // Capture section
    "home.capture.title": "தாவரத்தைப் பிடித்து அடையாளம் காணுங்கள்",
    "home.capture.description": "உங்கள் தோட்டத்தில் உள்ள எந்த தாவரத்தின் புகைப்படத்தையும் எடுத்து உடனடி அடையாளம் மற்றும் பராமரிப்பு பரிந்துரைகளைப் பெறுங்கள்:",
    "home.capture.feature1": "உடனடி தாவர அடையாளம்",
    "home.capture.feature2": "விரிவான நீர்ப்பாசன வழிமுறைகள்",
    "home.capture.feature3": "தனிப்பயன் நீர்ப்பாசன திட்டங்கள்",
    "home.capture.feature4": "பருவகால பராமரிப்பு ஆலோசனை",
    "home.capture.button": "ஒரு தாவரத்தைப் பிடிக்கவும்",
    
    // Benefits section
    "home.benefits.title": "ஸ்மார்ட் நீர்ப்பாசனத்தை ஏன் பயன்படுத்த வேண்டும்?",
    "home.benefits.description": "எங்களின் தரவு சார்ந்த அணுகுமுறை உங்களுக்கு உதவுகிறது:",
    "home.benefits.water.title": "நீரை சேமிக்கவும்",
    "home.benefits.water.description": "துல்லியமான நீர்ப்பாசனத்துடன் வீணாவதைக் குறைக்கவும்",
    "home.benefits.health.title": "ஆரோக்கியமான தாவரங்கள்",
    "home.benefits.health.description": "வளர்ச்சிக்கு சிறந்த ஈரப்பதம்",
    "home.benefits.time.title": "நேரத்தை சேமிக்கவும்",
    "home.benefits.time.description": "தண்ணீர் எப்போது ஊற்ற வேண்டும் என்பதை சரியாக அறிந்து கொள்ளுங்கள்",
    
    // Plant library
    "plant.library.title": "தாவர நீர்ப்பாசன நூலகம்",
    "plant.library.description": "500+ தோட்டத் தாவரங்களுக்கான விரிவான நீர்ப்பாசனத் தகவல்களை உலாவுங்கள்",
    "plant.library.showing": "காட்டுகிறது",
    "plant.library.of": "இல்",
    "plant.library.plants": "தாவரங்கள்",
    "plant.library.noPlants": "உங்கள் தேடல் அளவுகோல்களுக்கு பொருந்தும் தாவரங்கள் எதுவும் இல்லை.",
    "plant.library.search": "தாவரங்களைத் தேடுங்கள்...",
    "plant.library.type": "தாவர வகை",
    "plant.library.waterNeeds": "நீர் தேவைகள்",
    
    // Plant card
    "plant.card.waterNeeds": "நீர் தேவைகள்",
    "plant.card.irrigation": "நீர்ப்பாசனம்",
    "plant.card.ideal": "சிறந்த",
    "plant.card.seasonality": "பருவத்தன்மை",
    
    // Filters
    "filters.allTypes": "அனைத்து வகைகளும்",
    "filters.additionalFilters": "கூடுதல் வடிகட்டிகள்",
    "filters.allWaterNeeds": "அனைத்து நீர் தேவைகளும்",
    "filters.waterNeeds.low": "குறைவு",
    "filters.waterNeeds.medium": "நடுத்தரம்",
    "filters.waterNeeds.high": "அதிகம்",
    "filters.waterNeeds.veryLow": "மிகக் குறைவு",
    "filters.waterNeeds.veryHigh": "மிக அதிகம்"
  },
  telugu: {
    // App-wide
    "app.title": "స్మార్ట్ గార్డెన్ నీటి పారుదల సలహాదారు",
    "language": "భాష",
    "footer.copyright": "స్మార్ట్ గార్డెన్ నీటి పారుదల సలహాదారు. సర్వ హక్కులు ప్రత్యేకించబడ్డాయి.",
    
    // Navigation
    "nav.home": "హోమ్",
    "nav.prediction": "నీటి పారుదల అంచనా",
    "nav.growth": "పెరుగుదల ట్రాకర్",
    "nav.dna": "నీటి పారుదల డిఎన్ఏ",
    "nav.capture": "మొక్క కాప్చర్",
    "nav.library": "మొక్కల లైబ్రరీ",
    
    // Home page
    "home.welcome": "స్మార్ట్ గార్డెన్ నీటి పారుదల సలహాదారుకి స్వాగతం",
    "home.subtitle": "ఖచ్చితమైన తోటపని మరియు అనుకూలమైన మొక్క నీటి పారుదల కోసం మీ తెలివైన తోడు",
    
    // Prediction section
    "home.prediction.title": "స్మార్ట్ నీటి పారుదల అంచనా",
    "home.prediction.description": "మా అధునాతన మెషిన్ లెర్నింగ్ మోడల్ మీ తోట పరిస్థితులను విశ్లేషించి, రియల్-టైమ్ వాతావరణ ఇంటిగ్రేషన్‌తో ఖచ్చితమైన నీటి పారుదల సిఫార్సులను అందిస్తుంది.",
    "home.prediction.feature1": "వాతావరణం-సర్దుబాటు చేసిన సిఫార్సులు",
    "home.prediction.feature2": "వర్షపాత అంచనా ఏకీకరణ",
    "home.prediction.feature3": "హీట్‌వేవ్ & చల్లని స్నాప్ సర్దుబాట్లు",
    "home.prediction.button": "నీటి పారుదల అంచనాను ప్రయత్నించండి",
    
    // Growth section
    "home.growth.title": "విజువల్ గ్రోత్ ట్రాకర్",
    "home.growth.description": "మా విజువల్ గ్రోత్ ట్రాకింగ్ సాధనాలతో మీ మొక్కల అభివృద్ధిని పర్యవేక్షించండి:",
    "home.growth.feature1": "ఎత్తు మరియు ఆకు లెక్కింపు ట్రాకింగ్",
    "home.growth.feature2": "ఆరోగ్య స్కోర్ పర్యవేక్షణ",
    "home.growth.feature3": "వృద్ధి ధోరణి విజువలైజేషన్",
    "home.growth.feature4": "సీజనల్ ప్రోగ్రెస్ ట్రాకింగ్",
    "home.growth.button": "మొక్క పెరుగుదలను ట్రాక్ చేయండి",
    
    // DNA section
    "home.dna.title": "నీటి పారుదల డిఎన్ఏ",
    "home.dna.description": "కస్టమైజ్ చేయబడిన ప్రొఫైల్‌లతో మీ మొక్కల ప్రత్యేక నీటి అవసరాలను కనుగొనండి:",
    "home.dna.feature1": "వివరణాత్మక నీటిపారుదల నమూనాలు",
    "home.dna.feature2": "నేల మరియు కంటైనర్ సిఫార్సులు",
    "home.dna.feature3": "సీజనల్ అడ్జస్ట్‌మెంట్ షెడ్యూల్‌లు",
    "home.dna.feature4": "వాతావరణ సున్నితత్వ విశ్లేషణ",
    "home.dna.button": "నీటి పారుదల డిఎన్ఏను వీక్షించండి",
    
    // Capture section
    "home.capture.title": "మొక్క కాప్చర్ & గుర్తించండి",
    "home.capture.description": "మీ తోటలో ఏదైనా మొక్క ఫోటోను తీసుకొని, తక్షణ గుర్తింపు మరియు సంరక్షణ సిఫార్సులను పొందండి:",
    "home.capture.feature1": "తక్షణ మొక్క గుర్తింపు",
    "home.capture.feature2": "వివరణాత్మక నీటి పారుదల సూచనలు",
    "home.capture.feature3": "కస్టమ్ నీటి పారుదల ప్లాన్‌లు",
    "home.capture.feature4": "సీజనల్ కేర్ సలహా",
    "home.capture.button": "ఒక మొక్కను కాప్చర్ చేయండి",
    
    // Benefits section
    "home.benefits.title": "స్మార్ట్ నీటి పారుదలను ఎందుకు ఉపయోగించాలి?",
    "home.benefits.description": "మా డేటా-ఆధారిత విధానం మీకు సహాయపడుతుంది:",
    "home.benefits.water.title": "నీటిని ఆదా చేయండి",
    "home.benefits.water.description": "ఖచ్చితమైన నీటి పారుదలతో వృధాను తగ్గించండి",
    "home.benefits.health.title": "ఆరోగ్యకరమైన మొక్కలు",
    "home.benefits.health.description": "పెరుగుదలకు అనువైన తేమ",
    "home.benefits.time.title": "సమయాన్ని ఆదా చేయండి",
    "home.benefits.time.description": "ఎప్పుడు నీరు పోయాలో ఖచ్చితంగా తెలుసుకోండి",
    
    // Plant library
    "plant.library.title": "మొక్క నీటి పారుదల లైబ్రరీ",
    "plant.library.description": "500+ గార్డెన్ మొక్కల కోసం వివరణాత్మక నీటి పారుదల సమాచారాన్ని బ్రౌజ్ చేయండి",
    "plant.library.showing": "చూపిస్తోంది",
    "plant.library.of": "యొక్క",
    "plant.library.plants": "మొక్కలు",
    "plant.library.noPlants": "మీ శోధన ప్రమాణాలకు సరిపోలే మొక్కలు కనుగొనబడలేదు.",
    "plant.library.search": "మొక్కలను శోధించండి...",
    "plant.library.type": "మొక్క రకం",
    "plant.library.waterNeeds": "నీటి అవసరాలు",
    
    // Plant card
    "plant.card.waterNeeds": "నీటి అవసరాలు",
    "plant.card.irrigation": "నీటి పారుదల",
    "plant.card.ideal": "ఆదర్శం",
    "plant.card.seasonality": "ఋతుబద్ధత",
    
    // Filters
    "filters.allTypes": "అన్ని రకాలు",
    "filters.additionalFilters": "అదనపు ఫిల్టర్లు",
    "filters.allWaterNeeds": "అన్ని నీటి అవసరాలు",
    "filters.waterNeeds.low": "తక్కువ",
    "filters.waterNeeds.medium": "మధ్యస్థం",
    "filters.waterNeeds.high": "ఎక్కువ",
    "filters.waterNeeds.veryLow": "చాలా తక్కువ",
    "filters.waterNeeds.veryHigh": "చాలా ఎక్కువ"
  },
  kannada: {
    // App-wide
    "app.title": "ಸ್ಮಾರ್ಟ್ ಗಾರ್ಡನ್ ನೀರಾವರಿ ಸಲಹೆಗಾರ",
    "language": "ಭಾಷೆ",
    "footer.copyright": "ಸ್ಮಾರ್ಟ್ ಗಾರ್ಡನ್ ನೀರಾವರಿ ಸಲಹೆಗಾರ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    
    // Navigation
    "nav.home": "ಮುಖಪುಟ",
    "nav.prediction": "ನೀರಾವರಿ ಮುನ್ಸೂಚನೆ",
    "nav.growth": "ಬೆಳವಣಿಗೆ ಟ್ರ್ಯಾಕರ್",
    "nav.dna": "ನೀರಾವರಿ ಡಿಎನ್ಎ",
    "nav.capture": "ಸಸ್ಯ ಕ್ಯಾಪ್ಚರ್",
    "nav.library": "ಸಸ್ಯ ಗ್ರಂಥಾಲಯ",
    
    // Home page
    "home.welcome": "ಸ್ಮಾರ್ಟ್ ಗಾರ್ಡನ್ ನೀರಾವರಿ ಸಲಹೆಗಾರಕ್ಕೆ ಸುಸ್ವಾಗತ",
    "home.subtitle": "ನಿಖರವಾದ ತೋಟಗಾರಿಕೆ ಮತ್ತು ಅನುಕೂಲಕರ ಸಸ್ಯ ನೀರಾವರಿಗಾಗಿ ನಿಮ್ಮ ಬುದ್ಧಿವಂತ ಸಂಗಾತಿ",
    
    // Prediction section
    "home.prediction.title": "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ ಮುನ್ಸೂಚನೆ",
    "home.prediction.description": "ನಮ್ಮ ಸುಧಾರಿತ ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ಮಾದರಿಯು ನಿಮ್ಮ ತೋಟದ ಸ್ಥಿತಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ ಮತ್ತು ರಿಯಲ್-ಟೈಮ್ ಹವಾಮಾನ ಸಂಯೋಜನೆಯೊಂದಿಗೆ ನಿಖರವಾದ ನೀರಾವರಿ ಶಿಫಾರಸುಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.",
    "home.prediction.feature1": "ಹವಾಮಾನ-ಹೊಂದಿಸಿದ ಶಿಫಾರಸುಗಳು",
    "home.prediction.feature2": "ಮಳೆ ಮುನ್ಸೂಚನೆ ಸಂಯೋಜನೆ",
    "home.prediction.feature3": "ಹೀಟ್‌ವೇವ್ & ಚಳಿ ಸ್ನ್ಯಾಪ್ ಹೊಂದಾಣಿಕೆಗಳು",
    "home.prediction.button": "ನೀರಾವರಿ ಮುನ್ಸೂಚನೆಯನ್ನು ಪ್ರಯತ್ನಿಸಿ",
    
    // Growth section
    "home.growth.title": "ದೃಶ್ಯ ಬೆಳವಣಿಗೆ ಟ್ರ್ಯಾಕರ್",
    "home.growth.description": "ನಮ್ಮ ದೃಶ್ಯ ಬೆಳವಣಿಗೆ ಟ್ರ್ಯಾಕಿಂಗ್ ಸಾಧನಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಸಸ್ಯಗಳ ಬೆಳವಣಿಗೆಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ:",
    "home.growth.feature1": "ಎತ್ತರ ಮತ್ತು ಎಲೆ ಎಣಿಕೆ ಟ್ರ್ಯಾಕಿಂಗ್",
    "home.growth.feature2": "ಆರೋಗ್ಯ ಸ್ಕೋರ್ ಮೇಲ್ವಿಚಾರಣೆ",
    "home.growth.feature3": "ಬೆಳವಣಿಗೆ ಪ್ರವೃತ್ತಿ ವಿಶ್ಲೇಷಣೆ",
    "home.growth.feature4": "ಋತುಮಾನದ ಪ್ರಗತಿ ಟ್ರ್ಯಾಕಿಂಗ್",
    "home.growth.button": "ಸಸ್ಯದ ಬೆಳವಣಿಗೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    
    // DNA section
    "home.dna.title": "ನೀರಾವರಿ ಡಿಎನ್ಎ",
    "home.dna.description": "ಕಸ್ಟಮೈಸ್ ಮಾಡಿದ ಪ್ರೊಫೈಲ್‌ಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಸಸ್ಯಗಳ ವಿಶಿಷ್ಟ ನೀರಿನ ಅಗತ್ಯತೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ:",
    "home.dna.feature1": "ವಿವರವಾದ ನೀರುಣಿಸುವ ಮಾದರಿಗಳು",
    "home.dna.feature2": "ಮಣ್ಣು ಮತ್ತು ಕಂಟೇನರ್ ಶಿಫಾರಸುಗಳು",
    "home.dna.feature3": "ಋತುಮಾನದ ಹೊಂದಾಣಿಕೆ ವೇಳಾಪಟ್ಟಿಗಳು",
    "home.dna.feature4": "ಹವಾಮಾನ ಸಂವೇದನಾಶೀಲತೆ ವಿಶ್ಲೇಷಣೆ",
    "home.dna.button": "ನೀರಾವರಿ ಡಿಎನ್ಎ ವೀಕ್ಷಿಸಿ",
    
    // Capture section
    "home.capture.title": "ಸಸ್ಯ ಕ್ಯಾಪ್ಚರ್ & ಗುರುತಿಸಿ",
    "home.capture.description": "ನಿಮ್ಮ ತೋಟದಲ್ಲಿರುವ ಯಾವುದೇ ಸಸ್ಯದ ಫೋಟೊ ತೆಗೆದುಕೊಂಡು ತಕ್ಷಣದ ಗುರುತಿಸುವಿಕೆ ಮತ್ತು ಆರೈಕೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ:",
    "home.capture.feature1": "ತಕ್ಷಣದ ಸಸ್ಯ ಗುರುತಿಸುವಿಕೆ",
    "home.capture.feature2": "ವಿವರವಾದ ನೀರುಣಿಸುವ ಸೂಚನೆಗಳು",
    "home.capture.feature3": "ಕಸ್ಟಮ್ ನೀರಾವರಿ ಯೋಜನೆಗಳು",
    "home.capture.feature4": "ಋತುಮಾನದ ಆರೈಕೆ ಸಲಹೆ",
    "home.capture.button": "ಸಸ್ಯವನ್ನು ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ",
    
    // Benefits section
    "home.benefits.title": "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿಯನ್ನು ಏಕೆ ಬಳಸಬೇಕು?",
    "home.benefits.description": "ನಮ್ಮ ಡೇಟಾ-ಆಧಾರಿತ ವಿಧಾನವು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ:",
    "home.benefits.water.title": "ನೀರನ್ನು ಉಳಿಸಿ",
    "home.benefits.water.description": "ನಿಖರವಾದ ನೀರಾವರಿಯೊಂದಿಗೆ ತ್ಯಾಜ್ಯವನ್ನು ಕಡಿಮೆ ಮಾಡಿ",
    "home.benefits.health.title": "ಆರೋಗ್ಯಕರ ಸಸ್ಯಗಳು",
    "home.benefits.health.description": "ಬೆಳವಣಿಗೆಗೆ ಅನುಕೂಲಕರವಾದ ತೇವಾಂಶ",
    "home.benefits.time.title": "ಸಮಯವನ್ನು ಉಳಿಸಿ",
    "home.benefits.time.description": "ನೀರು ಹಾಕಬೇಕಾದ ಸಮಯವನ್ನು ನಿಖರವಾಗಿ ತಿಳಿದುಕೊಳ್ಳಿ",
    
    // Plant library
    "plant.library.title": "ಸಸ್ಯ ನೀರಾವರಿ ಗ್ರಂಥಾಲಯ",
    "plant.library.description": "500+ ಉದ್ಯಾನ ಸಸ್ಯಗಳಿಗೆ ವಿವರವಾದ ನೀರಾವರಿ ಮಾಹಿತಿಯನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
    "plant.library.showing": "ತೋರಿಸುತ್ತಿದೆ",
    "plant.library.of": "ರಲ್ಲಿ",
    "plant.library.plants": "ಸಸ್ಯಗಳು",
    "plant.library.noPlants": "ನಿಮ್ಮ ಹುಡುಕಾಟ ಮಾನದಂಡಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ಸಸ್ಯಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    "plant.library.search": "ಸಸ್ಯಗಳನ್ನು ಹುಡುಕಿ...",
    "plant.library.type": "ಸಸ್ಯದ ಪ್ರಕಾರ",
    "plant.library.waterNeeds": "ನೀರಿನ ಅಗತ್ಯಗಳು",
    
    // Plant card
    "plant.card.waterNeeds": "ನೀರಿನ ಅಗತ್ಯಗಳು",
    "plant.card.irrigation": "ನೀರಾವರಿ",
    "plant.card.ideal": "ಆದರ್ಶ",
    "plant.card.seasonality": "ಋತುಮಾನತೆ",
    
    // Filters
    "filters.allTypes": "ಎಲ್ಲಾ ಪ್ರಕಾರಗಳು",
    "filters.additionalFilters": "ಹೆಚ್ಚುವರಿ ಫಿಲ್ಟರ್‌ಗಳು",
    "filters.allWaterNeeds": "ಎಲ್ಲಾ ನೀರಿನ ಅಗತ್ಯಗಳು",
    "filters.waterNeeds.low": "ಕಡಿಮೆ",
    "filters.waterNeeds.medium": "ಮಧ್ಯಮ",
    "filters.waterNeeds.high": "ಹೆಚ್ಚು",
    "filters.waterNeeds.veryLow": "ತುಂಬಾ ಕಡಿಮೆ",
    "filters.waterNeeds.veryHigh": "ತುಂಬಾ ಹೆಚ್ಚು"
  },
  malayalam: {
    // App-wide
    "app.title": "സ്മാർട്ട് ഗാർഡൻ ജലസേചന ഉപദേശകൻ",
    "language": "ഭാഷ",
    "footer.copyright": "സ്മാർട്ട് ഗാർഡൻ ജലസേചന ഉപദേശകൻ. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തമാണ്.",
    
    // Navigation
    "nav.home": "ഹോം",
    "nav.prediction": "ജലസേചന പ്രവചനം",
    "nav.growth": "വളർച്ചാ ട്രാക്കർ",
    "nav.dna": "ജലസേചന ഡിഎൻഎ",
    "nav.capture": "സസ്യ ക്യാപ്ച്ചർ",
    "nav.library": "സസ്യ ലൈബ്രറി",
    
    // Home page
    "home.welcome": "സ്മാർട്ട് ഗാർഡൻ ജലസേചന ഉപദേശകനിലേക്ക് സ്വാഗതം",
    "home.subtitle": "കൃത്യമായ തോട്ടക്കൃഷിക്കും ഉചിതമായ സസ്യ ജലസേചനത്തിനുമുള്ള നിങ്ങളുടെ ബുദ്ധിപരമായ സഹചാരി",
    
    // Prediction section
    "home.prediction.title": "സ്മാർട്ട് ജലസേചന പ്രവചനം",
    "home.prediction.description": "ഞങ്ങളുടെ വിപുലമായ മെഷീൻ ലേണിംഗ് മോഡൽ നിങ്ങളുടെ തോട്ടത്തിന്റെ അവസ്ഥ വിശകലനം ചെയ്ത് റിയൽ-ടൈം കാലാവസ്ഥാ സംയോജനത്തോടെ കൃത്യമായ ജലസേചന ശുപാർശകൾ നൽകുന്നു.",
    "home.prediction.feature1": "കാലാവസ്ഥാ-ക്രമീകരിച്ച ശുപാർശകൾ",
    "home.prediction.feature2": "മഴ പ്രവചന സംയോജനം",
    "home.prediction.feature3": "ചൂടുതരംഗവും തണുപ്പുകാലവും ക്രമീകരണങ്ങൾ",
    "home.prediction.button": "ജലസേചന പ്രവചനം പരീക്ഷിക്കുക",
    
    // Growth section
    "home.growth.title": "വിഷ്വൽ വളർച്ചാ ട്രാക്കർ",
    "home.growth.description": "ഞങ്ങളുടെ വിഷ്വൽ വളർച്ചാ ട്രാക്കിംഗ് ഉപകരണങ്ങളുപയോഗിച്ച് നിങ്ങളുടെ സസ്യങ്ങളുടെ വികാസം നിരീക്ഷിക്കുക:",
    "home.growth.feature1": "ഉയരവും ഇലകളുടെ എണ്ണവും ട്രാക്കിംഗ്",
    "home.growth.feature2": "ആരോഗ്യ സ്കോർ നിരീക്ഷണം",
    "home.growth.feature3": "വളർച്ചാ പ്രവണത ദൃശ്യവൽക്കരണം",
    "home.growth.feature4": "സീസണൽ പുരോഗതി ട്രാക്കിംഗ്",
    "home.growth.button": "സസ്യ വളർച്ച ട്രാക്ക് ചെയ്യുക",
    
    // DNA section
    "home.dna.title": "ജലസേചന ഡിഎൻഎ",
    "home.dna.description": "കസ്റ്റമൈസ് ചെയ്ത പ്രൊഫൈലുകളുമായി നിങ്ങളുടെ സസ്യങ്ങളുടെ അനന്യമായ ജലാവശ്യകത കണ്ടെത്തുക:",
    "home.dna.feature1": "വിശദമായ ജലസേചന രീതികൾ",
    "home.dna.feature2": "മണ്ണ്, കണ്ടെയ്നർ ശുപാർശകൾ",
    "home.dna.feature3": "സീസണൽ ക്രമീകരണ ഷെഡ്യൂളുകൾ",
    "home.dna.feature4": "കാലാവസ്ഥാ സെൻസിറ്റിവിറ്റി വിശകലനം",
    "home.dna.button": "ജലസേചന ഡിഎൻഎ കാണുക",
    
    // Capture section
    "home.capture.title": "സസ്യം ക്യാപ്ച്ചർ & തിരിച്ചറിയുക",
    "home.capture.description": "നിങ്ങളുടെ തോട്ടത്തിലെ ഏതെങ്കിലും സസ്യത്തിന്റെ ഫോട്ടോ എടുത്ത് ഉടൻ തിരിച്ചറിയലും പരിപാലന ശുപാർശകളും നേടുക:",
    "home.capture.feature1": "ഉടൻ സസ്യ തിരിച്ചറിയൽ",
    "home.capture.feature2": "വിശദമായ ജലസേചന നിർദ്ദേശങ്ങൾ",
    "home.capture.feature3": "കസ്റ്റം ജലസേചന പദ്ധതികൾ",
    "home.capture.feature4": "സീസണൽ പരിപാലന ഉപദേശം",
    "home.capture.button": "ഒരു സസ്യം ക്യാപ്ച്ചർ ചെയ്യുക",
    
    // Benefits section
    "home.benefits.title": "സ്മാർട്ട് ജലസേചനം എന്തിന് ഉപയോഗിക്കണം?",
    "home.benefits.description": "ഞങ്ങളുടെ ഡാറ്റ-അധിഷ്ഠിത സമീപനം നിങ്ങളെ സഹായിക്കുന്നു:",
    "home.benefits.water.title": "വെള്ളം സംരക്ഷിക്കുക",
    "home.benefits.water.description": "കൃത്യമായ ജലസേചനത്തിലൂടെ പാഴാക്കൽ കുറയ്ക്കുക",
    "home.benefits.health.title": "ആരോഗ്യകരമായ സസ്യങ്ങൾ",
    "home.benefits.health.description": "വളർച്ചയ്ക്ക് ഉചിതമായ ഈർപ്പം",
    "home.benefits.time.title": "സമയം ലാഭിക്കുക",
    "home.benefits.time.description": "എപ്പോൾ വെള്ളമൊഴിക്കണമെന്ന് കൃത്യമായി അറിയുക",
    
    // Plant library
    "plant.library.title": "സസ്യ ജലസേചന ലൈബ്രറി",
    "plant.library.description": "500+ ഗാർഡൻ സസ്യങ്ങൾക്കായുള്ള വിശദമായ ജലസേചന വിവരങ്ങൾ ബ്രൗസ് ചെയ്യുക",
    "plant.library.showing": "കാണിക്കുന്നു",
    "plant.library.of": "ഓഫ്",
    "plant.library.plants": "സസ്യങ്ങൾ",
    "plant.library.noPlants": "നിങ്ങളുടെ തിരയൽ മാനദണ്ഡങ്ങളുമായി പൊരുത്തപ്പെടുന്ന സസ്യങ്ങളൊന്നും കണ്ടെത്തിയില്ല.",
    "plant.library.search": "സസ്യങ്ങൾ തിരയുക...",
    "plant.library.type": "സസ്യ തരം",
    "plant.library.waterNeeds": "ജലാവശ്യകത",
    
    // Plant card
    "plant.card.waterNeeds": "ജലാവശ്യകത",
    "plant.card.irrigation": "ജലസേചനം",
    "plant.card.ideal": "ആദർശം",
    "plant.card.seasonality": "സീസണാലിറ്റി",
    
    // Filters
    "filters.allTypes": "എല്ലാ തരങ്ങളും",
    "filters.additionalFilters": "അധിക ഫിൽട്ടറുകൾ",
    "filters.allWaterNeeds": "എല്ലാ ജലാവശ്യകതകളും",
    "filters.waterNeeds.low": "കുറഞ്ഞത്",
    "filters.waterNeeds.medium": "ഇടത്തരം",
    "filters.waterNeeds.high": "ഉയർന്നത്",
    "filters.waterNeeds.veryLow": "വളരെ കുറഞ്ഞത്",
    "filters.waterNeeds.veryHigh": "വളരെ ഉയർന്നത്"
  },
  tulu: {
    // App-wide
    "app.title": "ಸ್ಮಾರ್ಟ್ ಗಿದಾವಾಡಿ ನೀರಾವರಿ ಸಲಹೆಗಾರೊ",
    "language": "ಭಾಷೆ",
    "footer.copyright": "ಸ್ಮಾರ್ಟ್ ಗಿದಾವಾಡಿ ನೀರಾವರಿ ಸಲಹೆಗಾರೊ. ಎಲ್ಲಾ ಹಕ್ಕುಲು ಕಾಪಾಡಯಿನಂಚಿವೆ.",
    
    // Navigation
    "nav.home": "ಮನೆಪುಟ",
    "nav.prediction": "ನೀರಾವರಿ ಪ್ರವಚನ",
    "nav.growth": "ಬೆಳೆವು ಟ್ರ್ಯಾಕರ್",
    "nav.dna": "ನೀರಾವರಿ ಡಿಎನ್ಎ",
    "nav.capture": "ಗಿಡ ಕ್ಯಾಪ್ಚರ್",
    "nav.library": "ಗಿಡದ ಗ್ರಂಥಾಲಯ",
    
    // Home page
    "home.welcome": "ಸ್ಮಾರ್ಟ್ ಗಿದಾವಾಡಿ ನೀರಾವರಿ ಸಲಹೆಗಾರೊಗು ಸುಸ್ವಾಗತೊ",
    "home.subtitle": "ನಿಖರವಾಯಿನ ಗಿದಾವಾಡಿ ಕೆಲಸ ಬೊಕ್ಕ ಶ್ರೇಷ್ಠವಾಯಿನ ಗಿಡದ ನೀರಾವರಿಗಾಯಿ ಎರೆನ ಬುದ್ಧಿವಂತ ಸಂಗಾತಿ",
    
    // Prediction section
    "home.prediction.title": "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ ಪ್ರವಚನ",
    "home.prediction.description": "ಎಂಕುಲೆನ ಉನ್ನತವಾಯಿನ ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ಮಾದರಿ ಎರೆನ ಗಿದಾವಾಡಿದ ಪರಿಸ್ಥಿತಿಲೆನ್ ವಿಶ್ಲೇಷಣೆ ಮಲ್ಪುಂಡು ನಿಜವಾಯಿನ ಸಮಯದ ಹವಾಮಾನ ಒಟ್ಟಿಗೆನ ಸಂಯೋಜನೆದೊಟ್ಟುಗು ಖಚಿತವಾಯಿನ ನೀರಾವರಿ ಸಲಹೆಲೆನ್ ಕೊರುಂಡು.",
    "home.prediction.feature1": "ಹವಾಮಾನ-ಹೊಂದಿಸಾಯಿನ ಸಲಹೆಲು",
    "home.prediction.feature2": "ಮಳೆ ಮುನ್ಸೂಚನೆ ಸಂಯೋಜನೆ",
    "home.prediction.feature3": "ಬಿಸಿಲು & ಚಳಿ ಹೊಂದಾಣಿಕೆಲು",
    "home.prediction.button": "ನೀರಾವರಿ ಪ್ರವಚನನ್ ಪ್ರಯತ್ನ ಮಲ್ಪುಲೆ",
    
    // Growth section
    "home.growth.title": "ದೃಶ್ಯ ಬೆಳೆವು ಟ್ರ್ಯಾಕರ್",
    "home.growth.description": "ಎಂಕುಲೆನ ದೃಶ್ಯ ಬೆಳೆವು ಟ್ರ್ಯಾಕಿಂಗ್ ಸಾಧನೊಲೆನ್ ಬಳಸಿತ್ತ್ ಎರೆನ ಗಿಡೊಲೆನ ಬೆಳೆವುನ್ ಮೇಲ್ವಿಚಾರಣೆ ಮಲ್ಪುಲೆ:",
    "home.growth.feature1": "ಎತ್ತರ ಬೊಕ್ಕ ಎಲೆ ಎಣಿಕೆ ಟ್ರ್ಯಾಕಿಂಗ್",
    "home.growth.feature2": "ಆರೋಗ್ಯ ಸ್ಕೋರ್ ಮೇಲ್ವಿಚಾರಣೆ",
    "home.growth.feature3": "ಬೆಳೆವು ಪ್ರವೃತ್ತಿ ದೃಶ್ಯೀಕರಣ",
    "home.growth.feature4": "ಋತುಮಾನದ ಪ್ರಗತಿ ಟ್ರ್ಯಾಕಿಂಗ್",
    "home.growth.button": "ಗಿಡದ ಬೆಳೆವುನ್ ಟ್ರ್ಯಾಕ್ ಮಲ್ಪುಲೆ",
    
    // DNA section
    "home.dna.title": "ನೀರಾವರಿ ಡಿಎನ್ಎ",
    "home.dna.description": "ಕಸ್ಟಮೈಸ್ ಮಾಡಾಯಿನ ಪ್ರೊಫೈಲ್‌ಲೆನೊಟ್ಟುಗು ಎರೆನ ಗಿಡೊಲೆನ ವಿಶಿಷ್ಟವಾಯಿನ ನೀರಿನ ಅವಶ್ಯಕತೆಲೆನ್ ಕಂಡುಪಿದಿಯುಲೆ:",
    "home.dna.feature1": "ವಿವರವಾಯಿನ ನೀರು ಕೊರ್ನ ವಿಧಾನೊಲು",
    "home.dna.feature2": "ಮಣ್ಣು ಬೊಕ್ಕ ಕಂಟೈನರ್ ಸಲಹೆಲು",
    "home.dna.feature3": "ಋತುಮಾನ ಹೊಂದಾಣಿಕೆ ವೇಳಾಪಟ್ಟಿಲು",
    "home.dna.feature4": "ಹವಾಮಾನ ಸಂವೇದನಾಶೀಲತೆ ವಿಶ್ಲೇಷಣೆ",
    "home.dna.button": "ನೀರಾವರಿ ಡಿಎನ್ಎನ್ ತೂಲೆ",
    
    // Capture section
    "home.capture.title": "ಗಿಡ ಕ್ಯಾಪ್ಚರ್ & ಗುರುತಿಸುಲೆ",
    "home.capture.description": "ಎರೆನ ಗಿದಾವಾಡಿಡ್ ಉಪ್ಪುನ ಯಾವಯಿನ ಗಿಡದ ಫೋಟೊನ್ ತಗ್ಗಂಡು ಕೂಡಲೆ ಗುರುತಿಸುನ ಬೊಕ್ಕ ಪರಿಪಾಲನೆದ ಸಲಹೆಲೆನ್ ಪಡೆಯುಲೆ:",
    "home.capture.feature1": "ಕೂಡಲೆ ಗಿಡ ಗುರುತಿಸುನ",
    "home.capture.feature2": "ವಿವರವಾಯಿನ ನೀರು ಕೊರ್ನ ಸೂಚನೆಲು",
    "home.capture.feature3": "ಕಸ್ಟಮ್ ನೀರಾವರಿ ಯೋಜನೆಲು",
    "home.capture.feature4": "ಋತುಮಾನದ ಪರಿಪಾಲನೆದ ಸಲಹೆ",
    "home.capture.button": "ಒಂಜಿ ಗಿಡನ್ ಕ್ಯಾಪ್ಚರ್ ಮಲ್ಪುಲೆ",
    
    // Benefits section
    "home.benefits.title": "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿನ್ ಎಂದಗ್ ಬಳಸೊಣೊ?",
    "home.benefits.description": "ಎಂಕುಲೆನ ಡೇಟಾ-ಆಧಾರಿತ ವಿಧಾನ ಎರೆಗ್ ಸಹಾಯ ಮಲ್ಪುಂಡು:",
    "home.benefits.water.title": "ನೀರ್ ಉಲಿಪಾಲೆ",
    "home.benefits.water.description": "ಖಚಿತವಾಯಿನ ನೀರಾವರಿದೊಟ್ಟುಗು ಪಾಳುಮಾಪುನನ್ ಕಮ್ಮಿ ಮಲ್ಪುಲೆ",
    "home.benefits.health.title": "ಆರೋಗ್ಯಕರ ಗಿಡೊಲು",
    "home.benefits.health.description": "ಬೆಳೆವುಗ್ ಸೂಕ್ತವಾಯಿನ ತೇವಾಂಶ",
    "home.benefits.time.title": "ಸಮಯನ್ ಉಲಿಪಾಲೆ",
    "home.benefits.time.description": "ನೀರ್ ಕೊರ್ಪುಜಿನ ಸಮಯನ್ ಖಚಿತವಾಯಿ ತೆರಿಯೊಣೊ",
    
    // Plant library
    "plant.library.title": "ಗಿಡದ ನೀರಾವರಿ ಗ್ರಂಥಾಲಯ",
    "plant.library.description": "500+ ಗಿದಾವಾಡಿ ಗಿಡೊಲೆಗ್ ವಿವರವಾಯಿನ ನೀರಾವರಿ ಮಾಹಿತಿನ್ ಬ್ರೌಸ್ ಮಲ್ಪುಲೆ",
    "plant.library.showing": "ತೋಜಾವೊಂದುಂಡು",
    "plant.library.of": "ದ",
    "plant.library.plants": "ಗಿಡೊಲು",
    "plant.library.noPlants": "ಎರೆನ ಶೋಧನೆ ಮಾನದಂಡೊಲೆಗ್ ಹೊಂದುನ ಗಿಡೊಲು ಯಾವಯಾ ತಿಕ್ಕಂದಿಜ್ಜಿ.",
    "plant.library.search": "ಗಿಡೊಲೆನ್ ಶೋಧನೆ ಮಲ್ಪುಲೆ...",
    "plant.library.type": "ಗಿಡದ ವಿಧ",
    "plant.library.waterNeeds": "ನೀರಿನ ಅಗತ್ಯೊಲು",
    
    // Plant card
    "plant.card.waterNeeds": "ನೀರಿನ ಅಗತ್ಯೊಲು",
    "plant.card.irrigation": "ನೀರಾವರಿ",
    "plant.card.ideal": "ಆದರ್ಶ",
    "plant.card.seasonality": "ಋತುಮಾನತೆ",
    
    // Filters
    "filters.allTypes": "ಎಲ್ಲಾ ವಿಧೊಲು",
    "filters.additionalFilters": "ಹೆಚ್ಚುವರಿ ಫಿಲ್ಟರ್‌ಲು",
    "filters.allWaterNeeds": "ಎಲ್ಲಾ ನೀರಿನ ಅಗತ್ಯೊಲು",
    "filters.waterNeeds.low": "ಕಡಿಮೆ",
    "filters.waterNeeds.medium": "ಮಧ್ಯಮ",
    "filters.waterNeeds.high": "ಜಾಸ್ತಿ",
    "filters.waterNeeds.veryLow": "ತುಂಬ ಕಡಿಮೆ",
    "filters.waterNeeds.veryHigh": "ತುಂಬ ಜಾಸ್ತಿ"
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
