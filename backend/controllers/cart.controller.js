const User = require('../models/auth.model');
const Product = require('../models/product.model');
const jwt = require('jsonwebtoken');
const index_config = require('../configs/index.config');

const addToCart = async (req, res) => {
    const req_body = req.body;
    const token = req.headers.token;
    const decoded = jwt.decode(token, index_config.SECRET);
    const token_userId = decoded.userId;

    try {
        const productData = await Product.findOne({ id: req_body.itemid });
        const user = await User.findOne({ userId: token_userId });

        const existingProductIndex = user.cartData.findIndex(item => item.id === productData.id);
        if (existingProductIndex !== -1) {
            const quantity = user.cartData[existingProductIndex].quantity;

            user.cartData[existingProductIndex] = { ...productData.toObject(), quantity: quantity + 1 };
        } else {
            user.cartData.push({ ...productData.toObject(), quantity: 1 });
        }

        await user.save();
        res.json({ success: 1, message: "added to cart" });
    } catch (error) {
        console.log("unable", error);
        res.json({ success: 0, message: error.message });
    }
};

const removeFromCart = async (req, res) => {
    const req_body = req.body;
    const token = req.headers.token;
    const decoded = jwt.decode(token, index_config.SECRET);
    const token_userId = decoded.userId;
  
    try {
      const operator_user = await User.findOne({ userId: token_userId });
      const index = operator_user.cartData.findIndex(item => item.id === req_body.itemid);
      
      if (index !== -1) {
        if (operator_user.cartData[index].quantity > 1) {
          // Decrement the quantity of the item
          await User.updateOne(
            { userId: token_userId, "cartData.id": req_body.itemid },
            { $inc: { "cartData.$.quantity": -1 } }
          );
          res.status(200).send({ message: "Quantity updated successfully" });
        } else {
          // Remove the item from the cart
          await User.updateOne(
            { userId: token_userId },
            { $pull: { cartData: { id: req_body.itemid } } }
          );
          res.status(200).send({ message: "Item removed from cart" });
        }
      } else {
        res.status(404).send({ message: "Item not found in cart" });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).send({ message: "Internal server error" });
    }
  };
  

const getCartItems = async (req, res) => {
    const token = req.headers.token;
    const decoded = jwt.decode(token, index_config.SECRET);
    const token_userId = decoded.userId;

    try {
        const user = await User.findOne({ userId: token_userId });
        res.json(user.cartData);
    } catch (error) {
        console.log("unable", error);
        res.json({ success: 0, message: error.message });
    }
};



module.exports = {
    addToCart,
    removeFromCart,
    getCartItems
};