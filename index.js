import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
const app = express();
app.use(express.json());

// Changing DNS due to multiple devices on the same wif network:
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1","8.8.8.8"]);

// Giving access to the frontend address using cors policy:
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// Function for Database Connection: 
async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected")
  } catch (error) {
    console.log(error)
  }
};
ConnectDB();

// Array:
let products = [
  {
    id: 1,
    name: "Product-1",
    price: 4500,
    imageUrl:
      "https://tse1.mm.bing.net/th/id/OIP.3vHWetx-oJImGgk-gDBUjwHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "Description of the product one",
  },
  {
    id: 2,
    name: "Product-2",
    price: 1500,
    imageUrl:
      "https://images.pexels.com/photos/6311830/pexels-photo-6311830.jpeg?cs=srgb&dl=pexels-ekaterina-bolovtsova-6311830.jpg&fm=jpg",
    desc: "Description of the product two",
  },
];

// Get API:
app.get("/products", (req, res) => {
  res.json(products);
});

// POST API:
app.post("/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// DELETE API:
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  products = products.filter((product) => product.id !== parseInt(id));
  res.status(204).send();
});

//UPDATE/ PUT API:
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const productId = parseInt(id);

  const productExists = products.some((product) => product.id === productId);
  if (!productExists) {
    return res.status(404).json({ message: "Product not found" });
  }

  products = products.map((product) =>
    product.id === productId ? { ...product, ...req.body } : product,
  );

  const updatedProduct = products.find((product) => product.id === productId);
  res.status(200).json(updatedProduct);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is running on PORT 5000");
});
