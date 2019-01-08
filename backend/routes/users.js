const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/users');
const Doctor = require('../models/doctor');

router.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
    next();
})

router.post('/signup', (req,res) => {
    
    let reqData = req.body
    reqData.password = bcrypt.hashSync(req.body.password,10);
    
    let user = new User(reqData);

    user.save((err,data)=>{
        
        if (err) {
            res.status(400).json({message:'User not created!',err:err});
        }else{
            res.status(200).json({message:'User Created!'});
        }
    })

});

router.post('/login',(req,res) => {

    User.findOne({username:req.body.username},(err,data) => {
        if (err) {
            res.status(400).json({message:'Error while finding User!',err})
        }
        if (!data) {
            res.status(400).json({message:'User not found!'});
        }else{

            let isAuthenticated = bcrypt.compareSync(req.body.password,data.password);

            if (isAuthenticated){
                jwt.sign(data.toJSON(), 'secret', function(err, token) {
                    if (err) {
                        res.status(400).json('Token not generated');
                    }
                    let userdata = {
                        name: data.name,
                        username: data.username,
                        id: data._id
                    }
                    res.status(200).json({message:'LoggedIn',data:userdata,token:token})
                });
            }else{
                res.status(400).json({message:'Incorrect Password'})
            }
        }
    })

});

router.post('/setSlots',(req,res)=>{

    let doc = new Doctor(req.body);
    
    doc.save((err,data)=>{
        if (err) {
            res.status(400).json({message:'Slots were not created!',err});
        }else{
            res.status(200).json({message:'Slots Created!',slots:data});
        }
    });
});

router.get('/slots', (req,res)=> {

    Doctor.find({},(err,data)=>{
        if(err){
            res.status(403).json({message:'Invalid id Provided!'})
        }else{
            res.status(200).json(data);
        }
    })
})

router.delete('/delete/:id/:role', (req,res)=>{
    if(+req.params.role === 1){
        User.findOneAndDelete({_id:req.params.id,role:req.params.role},(err,data)=>{
            if(err){
                res.status(403).json({message:'Invalid id Provided!'});
            }else{
                res.status(200).json(data);
            }
        });
    }else{
        res.status(403).json({message:'You are not an Admin!'})
    }
});

router.get('/allusers', (req,res)=> {

    User.find({},{password:0},(err,data)=>{
        if(err){
            res.status(400).json({message:'Some Error'})
        }else{
            res.status(200).json(data);
        }
    })

});

router.get('/alldoctors', (req,res)=> {

    User.find({role:3},{password:0},(err,data)=>{
        if(err){
            res.status(400).json({message:'Some Error'})
        }else{
            res.status(200).json(data);
        }
    })

});

function verifyToken(req,res,next){
    jwt.verify(req.body.token, 'secret', function(err, decoded) {
        if (err) {
            res.status(400).json({message:'Invalid Token!'});
        }else{
            next()
        }
    });
}

module.exports = router;