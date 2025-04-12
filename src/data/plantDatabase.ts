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
