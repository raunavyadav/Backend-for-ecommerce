const Product = require('../models/productmodel.js');


const getProducts = async(req , res)=>{
    try{
        const allProducts= await Product.find();

        if(!allProducts|| allProducts.length === 0){
            res.json({
                message:"There are no products as of now",
            })
        }
        res.status(200).json({
            success:true,
            products:allProducts
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server error" 
        })
    }
}
const createProduct = async(req , res) => {
    try{
        const {name,price,description,category} = req.body;
        const newProduct= new Product({
            name,
            price,
            description,
            category,
        });
        await newProduct.save();
        res.status(200).json({
            product: newProduct
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server error" 
        })
    }
}
const updateProduct = async(req,res)=>{
    try{
        const {id}= req.params;
        const {name,price,description,category} = req.body;
        if(!updateProduct){
            res.json({
                message:"Product not found"
            })
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            price,
            description,
            category
        },{new:true});
        res.status(200).json({
            product: updatedProduct
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server error" 
        })
    }
}
const deleteProduct = async(req,res) => {
    try{
        const {id}=req.params;
        const deletedProduct= await Product.findByIdAndDelete(id);
        if(!deleteProduct){
            res.json({
                message:"product does not exist"
            })
        }
        res.status(200).json({
            product: deletedProduct,
            message:"Product deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server error" 
        })
    }
} 
module.exports ={getProducts,updateProduct,createProduct,deleteProduct};