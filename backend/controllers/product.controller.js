const product_model = require('../models/product.model');

const addProduct = async (req, res) => {
    const product = {
        id: req.body.id,
        name: req.body.name,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        quantity: req.body.quantity
    };

    try {
        const product_created = await product_model.create(product);
        console.log("Product pushed successfully");
        res.status(201).send(product_created);
    } catch (err) {
        console.log("Error while creating product: " + err);
        res.status(500).send({ msg: "Internal server error" });
    }
};


const removeProduct = async (req, res) => {
    const product_del = product_model.findOne({ id: req.body.id });
    if (product_del) {
        try {
            await product_model.deleteOne({ id: req.body.id });
            res.status(200).send({ msg: "Product deleted successfully" });
        } catch (err) {
            console.log("Error while deleting product: " + err);
            res.status(500).send({ msg: "Internal server error" });

        }
    } else {
        res.status(404).send({ msg: "Product not found" });
    }
}

const allProduct = async (req, res) => {
    let req_body= req.query;
    let category= req_body.category;
    
    try {
        const input_category = await product_model.find({ category });
        if(input_category.length==0){
            res.status(404).send({ msg: "Category not found" });
            return;
        }
        res.status(200).send(input_category);
    } catch (err) {
        console.log("Error while fetching products: " + err);
        res.status(500).send({ msg: "Internal server error" });
    }
}

const all_id_in_sort = async (req, res) => {
    try {
        const products = await product_model.find().sort({ id: 1 });
        const productIds = products.map(product => product.id);
        console.log("Product IDs in sorted order:", productIds);

        res.status(200).send(productIds);
    } catch (err) {
        console.log("Error while fetching products: " + err);
        res.status(500).send({ msg: "Internal server error" });
    }
}

const allProduct_allCategory = async (req,res)=>{
    try {
        const products = await product_model.find();
        res.status(200).send(products);
    } catch (err) {
        console.log("Error while fetching products: " + err);
        res.status(500).send({ msg: "Internal server error" });
    }
}

module.exports = {
    addProduct,removeProduct,allProduct,all_id_in_sort,allProduct_allCategory
};
