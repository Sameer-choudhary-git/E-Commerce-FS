

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = (app) => {
    app.post("/api/auth/signup", [authMiddleware.verifySignup], authController.signup);
    app.post("/api/auth/signin", authController.signin);
    
}