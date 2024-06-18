const user_model = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const index_config = require('../configs/index.config');

exports.signup = async (req,res)=>{
    //read req.
    const request_body = req.body
    //insert data into mongodb
    const userObj ={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        password:request_body.password,
        userType:request_body.userType,
        cartData:request_body.cartData
    }

    try {
        const user_created = await user_model.create(userObj);
        console.log('user created: ',user_created);
        const token = jwt.sign({userId:user_created.userId},index_config.SECRET);
        res.status(201).send({
            success:1,
            token:token,
        }); 
    } catch (err) {
        console.log('error while register user: ',err);
        res.status(500).send({
            message:"some error while creating user!"
        });
    }
}

exports.signin= async (req,res)=>{
    const request_body = req.body
    //find user from mongodb
    const login_user= await user_model.findOne({userId:request_body.userId})
    if(!login_user){
        res.status(404).send({
            message:"User not found!"
        });
        return;
    }
    
    //check password
    const checkPassword = login_user.password === request_body.password;
    if(!checkPassword){
        res.status(401).send({
            message:"Invalid password!"
        });
        return;
    }

    //generate token
    const token = jwt.sign({userId:login_user.userId},index_config.SECRET);

    res.status(200).send({ 
        success:1,
        token:token,
     });
    }