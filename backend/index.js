const express = require('express');
const mongoose = require('mongoose');
const index_config = require('./configs/index.config');
const app = express();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const db_config = require('./configs/db.config');
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
app.use(express.json());
const corsOptions = {
    origin: allowedOrigins, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization,token',
};
app.use(cors(corsOptions));


mongoose.connect(db_config.DB_URL);
const db = mongoose.connection;
db.on('error', (err) => {
    console.log("error while connecting to database");
    console.error(err)}
);
db.once('open', () =>{
    console.log('Connected to Database');
    }
);

// basic server running test
app.get('/', (req, res) => {
    res.send('Hello World');
});

// routes
require('./routes/product.route')(app);
require('./routes/auth.route')(app);
require('./routes/cart.route')(app);



//multer 
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})
const upload = multer({storage: storage});

// upload endpoint
app.use('/images',  express.static('upload/images'));
app.post("/upload",upload.single('product'),(req, res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:8080/images/${req.file.filename}`
    });
})


// start the server
app.listen(index_config.PORT, () => {
    console.log("sevrer started at: ", index_config.PORT)
})