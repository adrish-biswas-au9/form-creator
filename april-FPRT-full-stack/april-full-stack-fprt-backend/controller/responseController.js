const express = require('express');
const router = express.Router();
const response = require('../model/responseModal');
const mongoose = require('mongoose');
const cors = require('cors');

//parse data for post call
router.use(express.urlencoded({ extended: true }))
router.use(express.json())
//router.use(cors())

// router.get('/', (req, res) => {
//     return res.status(200).send("Health Ok")
// })

router.post('/create', (req, res) => {

    const info = {
        form_responses:req.body.form_responses,
        form_id: req.body.form_id,
        form_name : req.body.formName,
        user_email : req.body.email
    }

    response.create(info, (err, data) => {
        if (err) res.status(400).send({ auth: true, message: err });
        return res.status(200).send({ auth: true, message: "Data Registered!" })
        // res.redirect('/')
    });
})

router.post('/created', (req, res) => {
    
    response.find({ user_email: req.body.email}, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    })
})

router.get('/view/:id', (req, res) => {

    // let id = req.body._id;
    let id = req.params.id;
    console.log(req.params.id);
    response.find({ _id: req.params.id }, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    })
})


module.exports = router;