const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const authModel = require('../models/authModel')
const {loginValidate} = require('../validate/validate')

router.post('/', async (req, res) => {

    const {error} = loginValidate(req.body)
    if(error) { 
        res.status(400).send(error.details[0].message)
    }
    else{
        try{
            const checkUserExist = await authModel.findOne({username: req.body.username})
            if(!checkUserExist) { 
                res.status(400).json({ message: "User Not Exist!"})
            }
            else{
                const userDetails = await authModel.findOne({username: req.body.username})
            
                const validatePass = await bcrypt.compare(req.body.password, userDetails.password)
                const currentUser = req.body.username
                if(validatePass){
                res.status(200).send(`Welcome ${currentUser}`)
                }
                else{
                res.status(403).send("Invalid creds")
            }
        }
            
        }catch (err){
            res.status(400).send(err)
        }
    }
    
    
})



module.exports = router