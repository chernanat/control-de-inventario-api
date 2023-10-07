const User = require("../models/User");

const createUser = async(req, res) =>{
    try {
        const {nombre, apellido} = req.body;
        const newUser = await User.create({
            nombre,
            apellido
        })
        res.json(newUser);
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
}

//CRUD 

const users = async(req,res) =>{
    try { 
        const users = await User.findAll();
        res.json(users)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {createUser, users};