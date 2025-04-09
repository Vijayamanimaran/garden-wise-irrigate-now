
// Plant database types
export interface Plant {
  id: number;
  type: string;
  name: string;
  waterNeeds: string;
  irrigationMethod: string;
  idealConditions: string;
  seasonality: string;
  icon: string;
}

// Plant database
export const PLANT_DATABASE: Plant[] = [
  {
    id: 1,
    type: "Ornamental",
    name: "Rose",
    waterNeeds: "Medium (1.5-2 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "20-30°C, 5-6 hours sunlight",
    seasonality: "Spring to Fall, prune in winter",
    icon: "🌹"
  },
  {
    id: 2,
    type: "Ornamental",
    name: "Tulip",
    waterNeeds: "Low (0.5-1 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "15-20°C, 6 hours sunlight",
    seasonality: "Spring flowering, plant bulbs in fall",
    icon: "🌷"
  },
  {
    id: 3,
    type: "Herbs",
    name: "Basil",
    waterNeeds: "Medium (1-1.5 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "20-25°C, 6-8 hours sunlight",
    seasonality: "Spring to Summer, harvest regularly",
    icon: "🌿"
  },
  {
    id: 4,
    type: "Vegetables",
    name: "Tomato",
    waterNeeds: "High (2-3 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "20-30°C, 6-8 hours sunlight",
    seasonality: "Summer harvest, plant in spring",
    icon: "🍅"
  },
  {
    id: 5,
    type: "Succulents",
    name: "Aloe",
    waterNeeds: "Low (0.2-0.5 liters/week)",
    irrigationMethod: "Spot",
    idealConditions: "18-24°C, bright indirect light",
    seasonality: "Year-round, water sparingly in winter",
    icon: "🌵"
  },
  {
    id: 6,
    type: "Trees",
    name: "Apple Tree",
    waterNeeds: "Medium-High (15-20 liters/week)",
    irrigationMethod: "Basin",
    idealConditions: "15-30°C, 6-8 hours sunlight",
    seasonality: "Spring blossoms, Fall harvest",
    icon: "🍎"
  },
  {
    id: 7,
    type: "Fruits",
    name: "Strawberry",
    waterNeeds: "Medium (1-2 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "15-26°C, 6 hours sunlight",
    seasonality: "Spring to Summer, renew plants every 3 years",
    icon: "🍓"
  },
  {
    id: 8,
    type: "Shrubs",
    name: "Lavender",
    waterNeeds: "Low (0.5-1 liters/week)",
    irrigationMethod: "Drip",
    idealConditions: "18-28°C, 6+ hours full sun",
    seasonality: "Summer flowering, prune in spring",
    icon: "💜"
  },
  {
    id: 9,
    type: "Cacti",
    name: "Barrel Cactus",
    waterNeeds: "Very Low (0.2 liters/2 weeks)",
    irrigationMethod: "Spot",
    idealConditions: "20-35°C, 6+ hours direct sunlight",
    seasonality: "Water in growing season, almost none in winter",
    icon: "🌵"
  },
  {
    id: 10,
    type: "Aquatic",
    name: "Water Lily",
    waterNeeds: "Very High (submerged)",
    irrigationMethod: "Pond/Container",
    idealConditions: "18-28°C, 6+ hours sunlight",
    seasonality: "Blooms summer, dormant in winter",
    icon: "🌊"
  },
  {
    id: 11,
    type: "Climbers",
    name: "Morning Glory",
    waterNeeds: "Medium (1-1.5 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "18-30°C, 6+ hours sunlight",
    seasonality: "Summer to Fall flowering, annual in cold climates",
    icon: "🌸"
  },
  {
    id: 12,
    type: "Herbs",
    name: "Mint",
    waterNeeds: "Medium-High (1.5-2 liters/day)",
    irrigationMethod: "Drip",
    idealConditions: "18-26°C, partial shade to full sun",
    seasonality: "Spring to Fall, can be invasive",
    icon: "🌱"
  },
  {
    id: 13,
    type: "Ferns",
    name: "Boston Fern",
    waterNeeds: "Medium-High (1.5-2 liters/day)",
    irrigationMethod: "Mist/Drip",
    idealConditions: "18-24°C, indirect light, high humidity",
    seasonality: "Year-round, indoor in cold climates",
    icon: "🌿"
  },
  {
    id: 14,
    type: "Vegetables",
    name: "Carrot",
    waterNeeds: "Medium (1-1.5 liters/day)",
    irrigationMethod: "Sprinkler/Drip",
    idealConditions: "15-25°C, 6 hours sunlight",
    seasonality: "Spring to Fall planting, 70-80 days to harvest",
    icon: "🥕"
  },
  {
    id: 15,
    type: "Grass",
    name: "Kentucky Bluegrass",
    waterNeeds: "High (25-40mm/week)",
    irrigationMethod: "Sprinkler",
    idealConditions: "15-24°C, full to partial sun",
    seasonality: "Cool season grass, plant in fall or spring",
    icon: "🌱"
  }
];

// Extract unique plant types
export const PLANT_TYPES = [...new Set(PLANT_DATABASE.map(plant => plant.type))];
