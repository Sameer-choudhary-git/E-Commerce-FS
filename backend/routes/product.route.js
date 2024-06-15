const productController = require('../controllers/product.controller');
const productMiddleware = require('../middlewares/product.middleware');

module.exports = (app) => {
    app.post('/api/addProduct',[productMiddleware.checkid], productController.addProduct);
    app.post('/api/removeProduct', productController.removeProduct);
    app.get('/api/allProduct', productController.allProduct);
    app.get('/api/all_id_in_sort', productController.all_id_in_sort);
    // app.get('/api/products/:id', productController.getProductById);
    // app.put('/api/products/:id', productController.updateProduct);
    // app.delete('/api/products/:id', productController.deleteProduct);
}