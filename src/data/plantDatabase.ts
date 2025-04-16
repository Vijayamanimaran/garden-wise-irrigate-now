
// Original plant database content
export const PLANT_TYPES = [
  "Ornamental",
  "Vegetable",
  "Herb",
  "Fruit",
  "Indoor",
  "Succulent"
];

// Add the missing PLANT_NAMES export
export const PLANT_NAMES: Record<string, string[]> = {
  "Ornamental": ["Rose", "Tulip", "Lily", "Orchid", "Sunflower", "Daisy", "Hydrangea", "Peony", "Lavender", "Marigold", "Chrysanthemum", "Zinnia", "Dahlia", "Geranium", "Pansy", "Begonia", "Iris", "Azalea", "Carnation", "Daffodil", "Snapdragon", "Cosmos", "Aster", "Forget-me-not", "Morning Glory", "Poppy", "Sweet Pea", "Anemone", "Delphinium", "Foxglove"],
  "Vegetable": ["Tomato", "Cucumber", "Carrot", "Lettuce", "Broccoli", "Bell Pepper", "Eggplant", "Spinach", "Kale", "Zucchini", "Potato", "Onion", "Garlic", "Radish", "Cabbage", "Cauliflower", "Beet", "Sweet Corn", "Peas", "Green Beans", "Brussels Sprouts", "Asparagus", "Squash", "Celery", "Turnip", "Sweet Potato", "Pumpkin", "Okra", "Artichoke", "Leek"],
  "Herb": ["Basil", "Mint", "Rosemary", "Thyme", "Parsley", "Cilantro", "Sage", "Oregano", "Chives", "Dill", "Tarragon", "Lavender", "Lemongrass", "Bay Leaf", "Chamomile", "Marjoram", "Fennel", "Stevia", "Chervil", "Sorrel", "Savory", "Curry Leaf", "Borage", "Hyssop", "Anise", "Catnip", "Lovage", "Angelica", "Bergamot", "Horehound"],
  "Fruit": ["Strawberry", "Blueberry", "Apple", "Lemon", "Orange", "Watermelon", "Raspberry", "Cherry", "Banana", "Grape", "Peach", "Pear", "Plum", "Blackberry", "Apricot", "Fig", "Kiwi", "Pineapple", "Mango", "Avocado", "Coconut", "Lime", "Grapefruit", "Pomegranate", "Dragon Fruit", "Passion Fruit", "Guava", "Papaya", "Lychee", "Persimmon"],
  "Indoor": ["Snake Plant", "Pothos", "Fiddle Leaf Fig", "Monstera", "ZZ Plant", "Spider Plant", "Peace Lily", "Aloe Vera", "Rubber Plant", "Philodendron", "Calathea", "Dracaena", "Boston Fern", "African Violet", "Anthurium", "English Ivy", "Areca Palm", "Jade Plant", "Chinese Money Plant", "Prayer Plant", "Bird's Nest Fern", "Parlor Palm", "Polka Dot Plant", "Air Plant", "Cast Iron Plant", "Nerve Plant", "String of Pearls", "Wandering Jew", "Moth Orchid", "Lucky Bamboo"],
  "Succulent": ["Echeveria", "Jade Plant", "Haworthia", "Burro's Tail", "Panda Plant", "String of Pearls", "Zebra Plant", "Cactus", "Aloe Vera", "Sedum", "Sempervivum", "Agave", "Euphorbia", "Kalanchoe", "Lithops", "Crown of Thorns", "String of Hearts", "Christmas Cactus", "Ghost Plant", "Air Plant", "Barrel Cactus", "Prickly Pear", "Pincushion Cactus", "Crassula", "Aeonium", "Gasteria", "Pachyveria", "Senecio", "Graptoveria", "Mammillaria"]
};

// Add Plant interface and sample database for other components
export interface Plant {
  id: string;
  name: string;
  type: string;
  waterNeeds: "Low" | "Medium" | "High";
  sunlight: "Full Sun" | "Partial Sun" | "Shade";
  imageUrl?: string;
  growthRate?: string;
  description?: string;
  icon?: string;
  irrigationMethod?: string;
  idealConditions?: string;
  seasonality?: string;
}

// Function to create a large database of plants
const generatePlantDatabase = (): Plant[] => {
  const baseDatabase: Plant[] = [
    {
      id: "1",
      name: "Rose",
      type: "Ornamental",
      waterNeeds: "Medium",
      sunlight: "Full Sun",
      imageUrl: "/placeholder.svg",
      description: "Classic flowering shrub with thorny stems and fragrant blooms",
      icon: "🌹",
      irrigationMethod: "Drip irrigation",
      idealConditions: "Well-drained soil",
      seasonality: "Spring to Fall"
    },
    {
      id: "2",
      name: "Tomato",
      type: "Vegetable",
      waterNeeds: "High",
      sunlight: "Full Sun",
      imageUrl: "/placeholder.svg",
      description: "Popular garden vegetable with juicy, flavorful fruits",
      icon: "🍅",
      irrigationMethod: "Regular watering",
      idealConditions: "Rich soil, warm",
      seasonality: "Summer"
    },
    {
      id: "3",
      name: "Basil",
      type: "Herb",
      waterNeeds: "Medium",
      sunlight: "Full Sun",
      imageUrl: "/placeholder.svg",
      growthRate: "Fast",
      description: "Fragrant culinary herb used in many cuisines",
      icon: "🌿",
      irrigationMethod: "Consistent moisture",
      idealConditions: "Warm, fertile soil",
      seasonality: "Summer"
    },
    {
      id: "4",
      name: "Snake Plant",
      type: "Indoor",
      waterNeeds: "Low",
      sunlight: "Partial Sun",
      imageUrl: "/placeholder.svg",
      description: "Easy-care indoor plant with stiff, upright leaves",
      icon: "🪴",
      irrigationMethod: "Allow to dry out",
      idealConditions: "Low light tolerant",
      seasonality: "Year-round"
    },
    {
      id: "5",
      name: "Echeveria",
      type: "Succulent",
      waterNeeds: "Low",
      sunlight: "Full Sun",
      imageUrl: "/placeholder.svg",
      description: "Rosette-forming succulent with thick, fleshy leaves",
      icon: "🌵",
      irrigationMethod: "Infrequent, thorough",
      idealConditions: "Well-draining soil",
      seasonality: "Year-round"
    },
    {
      id: "6",
      name: "Strawberry",
      type: "Fruit",
      waterNeeds: "Medium",
      sunlight: "Full Sun",
      imageUrl: "/placeholder.svg",
      growthRate: "Medium",
      description: "Sweet, red berries that grow on low-lying plants",
      icon: "🍓",
      irrigationMethod: "Consistent moisture",
      idealConditions: "Well-drained, acidic",
      seasonality: "Spring to Summer"
    }
  ];

  // Generate additional plants
  const expandedPlants: Plant[] = [];
  
  // Icons to use for each type
  const icons = {
    "Ornamental": ["🌸", "🌷", "🌹", "🌺", "🌻", "🌼", "💐", "🏵️"],
    "Vegetable": ["🥕", "🥔", "🥒", "🥬", "🥦", "🌶️", "🧄", "🧅"],
    "Herb": ["🌿", "🍃", "🌱", "🪴", "🍀", "🪄", "🔮", "🧪"],
    "Fruit": ["🍎", "🍋", "🍊", "🍓", "🍒", "🍑", "🍇", "🍉"],
    "Indoor": ["🪴", "🌵", "🎍", "🎋", "🌱", "🌲", "🍃", "🌿"],
    "Succulent": ["🌵", "🪴", "🌱", "💎", "🧩", "🌵", "🔮", "🧿"]
  };
  
  // Irrigation methods by water needs
  const irrigationMethods = {
    "Low": ["Infrequent deep watering", "Minimal irrigation", "Allow to dry completely", "Sparse watering", "Occasional misting"],
    "Medium": ["Regular watering", "Drip irrigation", "Consistent moisture", "Moderate watering", "Balanced irrigation"],
    "High": ["Frequent watering", "Deep irrigation", "Constant moisture", "Daily watering", "Extensive irrigation"]
  };
  
  // Seasonality options
  const seasonality = [
    "Year-round", "Spring to Fall", "Summer", "Spring", "Fall", 
    "Winter to Spring", "Spring to Summer", "Summer to Fall", 
    "Late Summer", "Early Spring", "Mid-Summer"
  ];
  
  // Sunlight conditions
  const sunConditions = ["Full Sun", "Partial Sun", "Shade"];
  
  // Create plants for each type
  PLANT_TYPES.forEach(type => {
    PLANT_NAMES[type].forEach((name, index) => {
      if (baseDatabase.some(p => p.name === name)) {
        return; // Skip plants that are already in the base database
      }

      const waterNeeds = ["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as "Low" | "Medium" | "High";
      const sunlight = sunConditions[Math.floor(Math.random() * sunConditions.length)] as "Full Sun" | "Partial Sun" | "Shade";
      const iconArray = icons[type];
      const icon = iconArray[Math.floor(Math.random() * iconArray.length)];
      const irrigation = irrigationMethods[waterNeeds][Math.floor(Math.random() * irrigationMethods[waterNeeds].length)];
      const season = seasonality[Math.floor(Math.random() * seasonality.length)];
      
      // Generate ideal conditions based on plant type and water needs
      let idealCondition = "";
      if (type === "Ornamental") {
        idealCondition = waterNeeds === "Low" ? "Well-drained soil" : waterNeeds === "Medium" ? "Fertile loamy soil" : "Rich, moist soil";
      } else if (type === "Vegetable") {
        idealCondition = "Nutrient-rich soil, regular feeding";
      } else if (type === "Herb") {
        idealCondition = "Well-draining soil, moderate fertility";
      } else if (type === "Fruit") {
        idealCondition = "Rich soil, good airflow";
      } else if (type === "Indoor") {
        idealCondition = waterNeeds === "Low" ? "Drought-tolerant, any potting mix" : "Well-draining potting soil";
      } else {
        idealCondition = "Sandy, extremely well-draining soil";
      }
      
      // Add additional details based on sunlight
      if (sunlight === "Full Sun") {
        idealCondition += ", sunny location";
      } else if (sunlight === "Partial Sun") {
        idealCondition += ", partial shade";
      } else {
        idealCondition += ", shaded area";
      }

      expandedPlants.push({
        id: `${baseDatabase.length + expandedPlants.length + 1}`,
        name,
        type,
        waterNeeds,
        sunlight,
        imageUrl: "/placeholder.svg",
        description: `${type === "Ornamental" ? "Beautiful" : type === "Vegetable" ? "Nutritious" : type === "Herb" ? "Aromatic" : type === "Fruit" ? "Delicious" : type === "Indoor" ? "Decorative" : "Drought-resistant"} ${name.toLowerCase()} plant, popular in home gardens.`,
        icon,
        irrigationMethod: irrigation,
        idealConditions: idealCondition,
        seasonality: season
      });
    });
  });

  return [...baseDatabase, ...expandedPlants];
};

export const PLANT_DATABASE: Plant[] = generatePlantDatabase();
