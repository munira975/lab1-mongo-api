import dbConnect from "./db.js";
import Dish from "./models/dishSchema.js";

const seedDishes = [
  {
    name: "Biryani",
    ingredients: ["Rice", "Beef", "Spices", "Yogurt", "Lime", "Milk", "Salt"],
    preparationSteps: ["Marinate beef", "Cook beef", "Add rice", "Mix both and steam"],
    cookingTime: 90,
    origin: "Bangladesh",
    spiceLevel: "Hot"
  },
  {
    name: "Polao",
    ingredients: ["Polao rice", "Onion", "Green chili", "Spices"],
    preparationSteps: ["Add onion and spices", "Add rice", "Mix everything and steam with water"],
    cookingTime: 45,
    origin: "Bangladesh",
    spiceLevel: "Mild"
  },
  {
    name: "Tacos",
    ingredients: ["Tortilla", "Beef", "Lettuce", "Cheese", "Salsa"],
    preparationSteps: ["Cook beef", "Assemble with toppings", "Serve in tortilla"],
    cookingTime: 25,
    origin: "Mexico",
    spiceLevel: "Medium"
  },
  {
    name: "Ramen",
    ingredients: ["Noodles", "Broth", "Egg", "beef", "Scallions"],
    preparationSteps: ["Make broth", "Boil noodles", "Assemble bowl", "Garnish it to your liking"],
    cookingTime: 45,
    origin: "Japan",
    spiceLevel: "Medium"
  },
  {
    name: "Toast Skagen",
    ingredients: ["Cooked shrimp", "Lime", "Butter", "Salt", "Pepper", "Toast", "Mayonnaise", "Dill"],
    preparationSteps: [
        "Chop shrimp and add everything except toast and butter", 
        "Spread butter on toast", 
        "Add shrimp mixure on toasts",
        "Garnish it to your liking"
    ],
    cookingTime: 15,
    origin: "Sweden",
    spiceLevel: "Mild"
  }
];

const connectSeed = async () => {
    await dbConnect();
    try {
        const existingDishes = await Dish.find();
        if (existingDishes.length === 0) {
          await Dish.insertMany(seedDishes);
          console.log('Sample dishes are inserted!');
        } else {
          console.log('Dishes already exist.');
        }
    } catch (error) {
        console.error('Error inserting dishes: ', error.message);
        process.exit(1);
    } finally {
        process.exit();
    }

};

connectSeed();