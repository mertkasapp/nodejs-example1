const express = require("express");
const app=express();

const db = require("./data/db")

app.set("view engine","ejs")
app.use(express.static("public"));
app.use(express.static("node_modules"));




const data = [
    
];




// routes
app.use("/products/:id", async(req,res)=>{
    try {
        const [product,] = await  db.execute("select * from products where id=?"+[req.params.id]);
        res.render("product-details", {
           urun: product[0]
       }) 
       
       } catch (err) {
           console.log(err)
       } 
});

app.use("/products", async (req,res)=>{
    try {
        const [products,] = await  db.execute("select * from products");
        res.render("products", {
           urunler: products
       }) 
       
       } catch (err) {
           console.log(err)
       } 
});

app.use("/", async (req,res)=>{

try {
 const [products,] = await  db.execute("select * from products where isHome=1");
 res.render("index", {
    urunler: products
}) 

} catch (err) {
    console.log(err)
}

});

app.listen(3000,()=>{
    console.log("listening on port 3000")
})