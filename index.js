import express from "express";

const app = express()


// Array:
let products = [
    {
        id:1,
        name:"Product-1",
        price: 4500,
        imageUrl:"https://tse1.mm.bing.net/th/id/OIP.3vHWetx-oJImGgk-gDBUjwHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        desc:"Description of the product one"
    },
    {
        id:2,
        name:"Product-2",
        price: 1500,
        imageUrl:"https://images.pexels.com/photos/6311830/pexels-photo-6311830.jpeg?cs=srgb&dl=pexels-ekaterina-bolovtsova-6311830.jpg&fm=jpg",
        desc:"Description of the product two",
    },
];

// Get API:
app.get("/products", (req,res)=>{
    res.json(products);
});

// POST API: 
app.post("/products", (req,res) =>{
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// DELETE API:
app.delete("/products/:id", (req,res)=>{
    const {id} = req.params;
    products=products.filter((product)=> product.id!==parseInt(id));
    res.status(204).send();
})


const PORT=5000

app.listen(PORT,()=>{
    console.log("Server is running on PORT 5000")
})