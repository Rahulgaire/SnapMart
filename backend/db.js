// insertGroceryProducts.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// Replace with your MongoDB connection string if needed
const MONGODB_URI = process.env.MONGO_URI;
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  img: String,
  price: Number,
});
const Product = mongoose.model("Product", productSchema);

const products = [
  {
    title: "Organic Bananas",
    description: "Fresh organic bananas from local farms.",
    img: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 30,
  },
  {
    title: "Red Apples",
    description: "Juicy red apples, rich in flavor and vitamins.",
    img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80https://images.unsplash.com/photo-1476837579993-f1d3948f17c2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 50,
  },
  {
    title: "Fresh Tomatoes",
    description: "Ripe and fresh tomatoes ideal for salads and cooking.",
    img: "https://images.unsplash.com/photo-1509963906410-fceef97f22f8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dG9tYXRvZXN8ZW58MHx8MHx8fDA%3D",
    price: 40,
  },
  {
    title: "Potatoes",
    description: "Fresh potatoes for all your cooking needs.",
    img: "https://plus.unsplash.com/premium_photo-1664372599369-dd9f4ee07254?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG90YXRvZXN8ZW58MHx8MHx8fDA%3D",
    price: 25,
  },
  {
    title: "Broccoli",
    description: "Green broccoli, fresh and healthy.",
    img: "https://plus.unsplash.com/premium_photo-1661503128622-3137e799f2c4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJyb2NvbGxpfGVufDB8fDB8fHww",
    price: 60,
  },
  {
    title: "Carrots",
    description: "Crunchy organic carrots full of nutrients.",
    img: "https://images.unsplash.com/photo-1633380110125-f6e685676160?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnJvdHN8ZW58MHx8MHx8fDA%3D",
    price: 35,
  },
  {
    title: "Eggs (Dozen)",
    description: "Farm fresh eggs, high quality and nutrition.",
    img: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=743&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 70,
  },
  {
    title: "Whole Milk (1L)",
    description: "Fresh whole milk with natural goodness.",
    img: "https://images.unsplash.com/photo-1576186726115-4d51596775d1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hvbGUlMjBtaWxrfGVufDB8fDB8fHww",
    price: 55,
  },
  {
    title: "Brown Bread",
    description: "Healthy brown bread baked fresh daily.",
    img: "https://media.istockphoto.com/id/1420937092/photo/brown-bread.webp?a=1&b=1&s=612x612&w=0&k=20&c=B7F__YXV3hFEQUrQUDcotJ-I1zqhGimSb1VTTo4kaSU=",
    price: 45,
  },
  {
    title: "Basmati Rice (5kg)",
    description: "Premium quality basmati rice, aromatic and fluffy.",
    img: "https://plus.unsplash.com/premium_photo-1705338026411-00639520a438?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFzbWF0aSUyMHJpY2V8ZW58MHx8MHx8fDA%3D",
    price: 400,
  },
  {
    title: "Olive Oil (500ml)",
    description: "Extra virgin olive oil for cooking and salads.",
    img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2xpdmUlMjBvaWx8ZW58MHx8MHx8fDA%3D",
    price: 350,
  },
  {
    title: "Canned Beans",
    description: "High quality canned beans for your convenience.",
    img: "https://plus.unsplash.com/premium_photo-1664527307810-63c15cb57346?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FubmVkJTIwYmVhbnN8ZW58MHx8MHx8fDA%3D",
    price: 80,
  },
  {
    title: "Orange Juice (1L)",
    description: "Freshly squeezed orange juice, no added sugar.",
    img: "https://plus.unsplash.com/premium_photo-1720071055021-54aacea5b719?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG9yYW5nZSUyMGp1aWNlfGVufDB8fDB8fHww",
    price: 90,
  },
  {
    title: "Cheddar Cheese",
    description: "Aged cheddar cheese with rich flavor.",
    img: "https://media.istockphoto.com/id/470427615/photo/organic-shredded-sharp-cheddar-cheese.webp?a=1&b=1&s=612x612&w=0&k=20&c=7WgCAO2RRaARwr-ScpjJJiXHjzhjBEyjij5uInDxubU=",
    price: 300,
  },
  {
    title: "Chicken Breast (1kg)",
    description: "Fresh chicken breast, lean and healthy.",
    img: "https://images.unsplash.com/photo-1682991136736-a2b44623eeba?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 450,
  },
  {
    title: "Salmon Fillet",
    description: "Fresh salmon fillet, perfect for grilling.",
    img: "https://plus.unsplash.com/premium_photo-1726873263849-cb94e5c1c065?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FsbW9uJTIwZmlsbGV0fGVufDB8fDB8fHww",
    price: 500,
  },
  {
    title: "Almonds (200g)",
    description: "Raw almonds, rich in protein and healthy fats.",
    img: "https://images.unsplash.com/photo-1631815333332-e3ffb24e2bf8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxtb25kfGVufDB8fDB8fHww",
    price: 250,
  },
  {
    title: "Green Tea (100 bags)",
    description: "Refreshing green tea bags for daily wellness.",
    img: "https://images.unsplash.com/photo-1701520839071-55bdfe64c5ed?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JlZW4lMjB0ZWF8ZW58MHx8MHx8fDA%3D",
    price: 120,
  },
  {
    title: "Honey (500g)",
    description: "Pure organic honey, natural sweetness.",
    img: "https://plus.unsplash.com/premium_photo-1663957861996-8093b48a22e6?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 180,
  },
  {
    title: "Pasta (500g)",
    description: "Italian pasta, perfect for various dishes.",
    img: "https://images.unsplash.com/photo-1447279506476-3faec8071eee?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhc3RhfGVufDB8fDB8fHww",
    price: 90,
  },
  {
    title: "Spinach",
    description: "Fresh green spinach for salads and cooking.",
    img: "https://images.unsplash.com/photo-1565006114230-83988e94d432?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNwaW5hY2h8ZW58MHx8MHx8fDA%3D",
    price: 40,
  },
  {
    title: "Sweet Corn",
    description: "Sweet and juicy fresh corn on the cob.",
    img: "https://images.unsplash.com/photo-1683543124257-1d214be3a366?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3dlZXQlMjBjb3JufGVufDB8fDB8fHww",
    price: 35,
  },
  {
    title: "Greek Yogurt",
    description: "Creamy and fresh Greek yogurt, perfect for breakfast.",
    img: "https://images.unsplash.com/photo-1562114808-b4b33cf60f4f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdyZWVrJTIweW9ndXJ0fGVufDB8fDB8fHww",
    price: 60,
  },
  {
    title: "Red Onions",
    description: "Crisp and flavorful red onions.",
    img: "https://images.unsplash.com/photo-1681758442447-f36ed14c0a8a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVkJTIwb25pb25zfGVufDB8fDB8fHww",
    price: 20,
  },
];

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run = async () => {
  try {
    await Product.deleteMany({});
    console.log("Old data deleted.");
    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} products inserted!`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.disconnect();
  }
};

run();
