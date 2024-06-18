const productController = require('../controllers/product.controller');
const productMiddleware = require('../middlewares/product.middleware');

module.exports = (app) => {
    app.post('/api/addProduct',[productMiddleware.checkid], productController.addProduct);
    app.post('/api/removeProduct', productController.removeProduct);
    app.get('/api/allProduct', productController.allProduct);
    app.get('/api/allProduct_allCategory', productController.allProduct_allCategory);
    app.get('/api/all_id_in_sort', productController.all_id_in_sort);
}