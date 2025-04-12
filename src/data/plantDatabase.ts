
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
  "Ornamental": ["Rose", "Tulip", "Lily", "Orchid", "Sunflower", "Daisy", "Hydrangea", "Peony"],
  "Vegetable": ["Tomato", "Cucumber", "Carrot", "Lettuce", "Broccoli", "Bell Pepper", "Eggplant", "Spinach"],
  "Herb": ["Basil", "Mint", "Rosemary", "Thyme", "Parsley", "Cilantro", "Sage", "Oregano"],
  "Fruit": ["Strawberry", "Blueberry", "Apple", "Lemon", "Orange", "Watermelon", "Raspberry", "Cherry"],
  "Indoor": ["Snake Plant", "Pothos", "Fiddle Leaf Fig", "Monstera", "ZZ Plant", "Spider Plant", "Peace Lily", "Aloe Vera"],
  "Succulent": ["Echeveria", "Jade Plant", "Haworthia", "Burro's Tail", "Panda Plant", "String of Pearls", "Zebra Plant", "Cactus"]
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
}

export const PLANT_DATABASE: Plant[] = [
  {
    id: "1",
    name: "Rose",
    type: "Ornamental",
    waterNeeds: "Medium",
    sunlight: "Full Sun",
    imageUrl: "/placeholder.svg",
    description: "Classic flowering shrub with thorny stems and fragrant blooms"
  },
  {
    id: "2",
    name: "Tomato",
    type: "Vegetable",
    waterNeeds: "High",
    sunlight: "Full Sun",
    imageUrl: "/placeholder.svg",
    description: "Popular garden vegetable with juicy, flavorful fruits"
  },
  {
    id: "3",
    name: "Basil",
    type: "Herb",
    waterNeeds: "Medium",
    sunlight: "Full Sun",
    imageUrl: "/placeholder.svg",
    growthRate: "Fast",
    description: "Fragrant culinary herb used in many cuisines"
  },
  {
    id: "4",
    name: "Snake Plant",
    type: "Indoor",
    waterNeeds: "Low",
    sunlight: "Partial Sun",
    imageUrl: "/placeholder.svg",
    description: "Easy-care indoor plant with stiff, upright leaves"
  },
  {
    id: "5",
    name: "Echeveria",
    type: "Succulent",
    waterNeeds: "Low",
    sunlight: "Full Sun",
    imageUrl: "/placeholder.svg",
    description: "Rosette-forming succulent with thick, fleshy leaves"
  },
  {
    id: "6",
    name: "Strawberry",
    type: "Fruit",
    waterNeeds: "Medium",
    sunlight: "Full Sun",
    imageUrl: "/placeholder.svg",
    growthRate: "Medium",
    description: "Sweet, red berries that grow on low-lying plants"
  }
];
