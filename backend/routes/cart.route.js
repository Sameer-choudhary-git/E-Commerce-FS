const cartController = require('../controllers/cart.controller');
const express = require('express');
const router = express.Router();

module.exports = (app) => { 
    app.post('/api/addToCart',  cartController.addToCart);
    app.post('/api/removeFromCart', cartController.removeFromCart);
    app.get('/api/getCartItems', cartController.getCartItems);
    // app.post('/api/checkout', cartController.checkout);
}