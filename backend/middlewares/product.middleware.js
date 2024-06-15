const Product = require('../models/product.model');

const checkid = async (req, res, next) => {
    const id= req.body.id;
    const product_id = await Product.findOne({ id:id });
    
    if (product_id) {
        res.status(400).send({ msg: "Product already exists" });
    } else {
        next();
    }
}
module.exports = { checkid };