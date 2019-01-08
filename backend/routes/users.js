const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const asyncLib = require('async');

const User = require('../models/users');
const Doctor = require('../models/doctor');
const Booking = require('../models/bookings');

router.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
    next();
})

router.post('/signup', (req,res) => {
    
    let reqData = req.body
    reqData.password = bcrypt.hashSync(req.body.password,10);
    
    let user = new User(reqData);
    // role will be number and for patient it is 2
    user.role = 2;

    user.save((err,data)=>{
        
        if (err) {
            res.status(400).json({message:'User not created!',err:err});
        }else{
            jwt.sign(data.toJSON(), 'secret', function(err, token) {
                if (err) {
                    res.status(400).json('Token not generated');
                }
                let userdata = {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    id: data._id
                }
                res.status(200).json({message:'User Created!',data:userdata,token:token})
            });
        }
    })

});

router.post('/login',(req,res) => {
    console.log(req.body);
    User.findOne( { $or:[ {'email':req.body.email}, {'username':req.body.email}]},(err,data) => {
        console.log(err, data);
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
                        email: data.email,
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
router.post('/new-slot', verifyToken, (req,res)=> {
    req.body.patientId = req.user._id;
    let doc = new Booking(req.body);
    doc.save((err,data)=>{
        if (err) {
            res.status(400).json({message:'Appointment was not created!',err});
        } else {
            res.status(200).json({message:'Appointment submitted!',slots:data});
        }
    });
})
router.get('/doctor-slots/:doctorId', (req,res)=> {
// Assumed Flow
//     - Get 5 records of slots
//     - Split records based on week day
//     - Generate Date for every slot
//     - Sort by date
//     - Pick 5 slots

    let slots = [];
    Doctor.find({userId: req.params.doctorId},(err,data)=>{
        if(err){
            res.status(403).json({message:'Invalid id Provided!'})
        } else {
            // loop through records
            data.forEach(row => {
                // each row can have multiple days. So split row by days
                row.availabilityDays.forEach(slotDay => {
                    slots.push({
                        availabilityDay: slotDay,
                        availabilityTime: row.availabilityTime,
                        availabilityHours: row.availabilityHours,
                        userId: row.userId
                    })
                })
            })
            // Generate date for every slot
            slots.forEach((slot,index) => {
                const today = moment().day();
                const daysNumber = {
                    "Mon": 1,
                    "Tue": 2,
                    "Wed": 3,
                    "Thur": 4,
                    "Fri": 5,
                    "Sat": 6,
                    "Sun": 7,
                }
                let slotDay;
                switch (slot.availabilityDay) {
                    case 'Mon':
                        slotDay = daysNumber.Mon;
                        if(today >= slotDay)
                            slotDay = 7 + daysNumber.Mon;
                        slots[index].availabilityDate = moment().day(slotDay);       
                        break;
                    case 'Tue':
                        slotDay = daysNumber.Tue;
                        if(today >= slotDay)
                            slotDay = 7 + daysNumber.Tue;
                        slots[index].availabilityDate = moment().day(slotDay);   
                        break;
                    case 'Wed':
                        slotDay = daysNumber.Wed;
                        if(today >= slotDay)
                            slotDay = 7 + daysNumber.Wed;
                        slots[index].availabilityDate = moment().day(slotDay);
                        break;
                    case 'Thur':
                        slotDay = daysNumber.Thur;
                        if(today >= slotDay)
                            slotDay = 7 + daysNumber.Thur;
                        slots[index].availabilityDate = moment().day(slotDay);       
                        break;
                    case 'Fri':
                        slotDay = daysNumber.Fri;
                        if(today >= slotDay)
                            slotDay = 7 + daysNumber.Fri;
                        slots[index].availabilityDate = moment().day(slotDay);
                        break;
                    case 'Sat':
                        slotDay = daysNumber.Sat;
                        if(today >= slotDay)
                            slotDay = 7 + daysNumber.Sat;
                        slots[index].availabilityDate = moment().day(slotDay);   
                        break;
                    case 'Sun':
                        slotDay = daysNumber.Sun;
                        if(today >= slotDay)
                            slotDay = 7 + daysNumber.Sun;
                        slots[index].availabilityDate = moment().day(slotDay);     
                        break;
                }
                slots[index].availabilityDate.hour(slots[index].availabilityTime);
                // format date
                slots[index].availabilityDateFormatted = moment(slots[index].availabilityDate).format('LL');;
            })
            // sort by date
            slots.sort(function(a, b){
                if(a.availabilityDate < b.availabilityDate) { return -1; }
                if(a.availabilityDate > b.availabilityDate) { return 1; }
                return 0;
            });
            // get only 5 slots
            slots = slots.slice(0,5);
            res.status(200).json(slots);
        }
    }).limit(5)
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

router.get('/myAppointments', verifyToken, (req, res)=> {
    asyncLib.parallel({
        upcoming : function(callback){
            Booking.find({patientId: req.user._id, availabilityDate: {$gt: new Date()}},(err,data)=>{
                // format date
                data.forEach((item,index) => {
                    data[index].availabilityDateFormatted = moment(item.availabilityDate).format('LL');
                })
                callback(err,data);
            }).sort('availabilityDate').populate('doctorId');
        },
        previous : function(callback){
            Booking.find({patientId: req.user._id, availabilityDate: {$lt: new Date()}},(err,data)=>{
                // format date
                data.forEach((item,index) => {
                    data[index].availabilityDateFormatted = moment(item.availabilityDate).format('LL');
                })
                callback(err,data);
            }).sort('availabilityDate').populate('doctorId');
        }
    }, function(err, result){
        if(err){
            res.status(403).json({message:'Unable to fetch appointments!'})
        }else{
            res.status(200).json(result);
        }
    })
    
    
});

function verifyToken(req,res,next){
    console.log();
    jwt.verify(req.headers['authorization'], 'secret', function(err, decoded) {
        if (err || !"_id" in decoded) {
            return res.status(400).json({message:'Invalid Token!'});
        }else{
            req.user = decoded;
            next()
        }
    });
}

module.exports = router;