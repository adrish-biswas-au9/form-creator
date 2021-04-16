const express = require('express');
const router = express.Router();
const form = require('../model/formModal');
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
        user_email: req.body.email,
        form_name: req.body.formName ? req.body.formName : "Untitled",
        field_data: req.body.field_data
    }

    form.create(info, (err, data) => {
        if (err) res.status(400).send({ auth: true, message: err });
        return res.status(200).send({ auth: true, message: "Data Registered!" })
        // res.redirect('/')
    });
})

router.post('/created', (req, res) => {
    
    form.find({ user_email: req.body.email}, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    })
})

router.get('/view/:id', (req, res) => {

    // let id = req.body._id;
    let id = req.params.id;
    console.log(req.params.id);
    form.find({ _id: req.params.id }, (err, data) => {
        if (err) return res.status(500).send([err]);
        return res.status(200).send(data);
    })
})

router.delete('/delete/:id', (req, res) => {

    // let id = req.body._id;
    let id = req.params.id;
    console.log(req.params.id);
    form.deleteOne(
        { _id: req.params.id },
        (err, data) => {
            if (err) res.status(400).send({ auth: true, message: err });
            return res.status(200).send({ auth: true, message: "Deleted" })
        })
})


module.exports = router;