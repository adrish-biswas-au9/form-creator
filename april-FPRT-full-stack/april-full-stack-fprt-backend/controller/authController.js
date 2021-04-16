const express = require('express');
const router = express.Router();
const fileupload= require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const user = require('../model/userModal');
const mongoose = require('mongoose');
const cors = require('cors');

//parse data for post call
router.use(express.urlencoded({ extended: true }))
router.use(express.json())
//router.use(cors())

// router.get('/', (req, res) => {
//     return res.status(200).send("Health Ok")
// })
cloudinary.config({
    cloud_name: 'aryabhatta',
    api_key: '346714616856731',
    api_secret: 'YRCQnQAD3PmwdJ8kE3Wd3vVg_Qc'
})

router.use(fileupload({
    useTempFiles: true
}));


//register
router.post('/register', (req, res) => {
    
    const info = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "profile_photo": "https://img.icons8.com/cotton/64/000000/user-male--v1.png"
    }
    user.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        if (data) return res.status(400).send({ auth: false, message: "Email already taken! Use another email!" })
        user.create(info, (err, data) => {
            if (err) throw err;
            return res.status(200).send({ auth: true, message: "Data Registered!" })
            // res.redirect('/')
        });
    })

});

//get all users
// router.get('/users', (req, res) => {
//     let query = { isActive: true }
//     //console.log("session>>>",req.session.user)
//     // if (!req.session.user) {
//     //     return res.send("login expired, login again!");
//     // }
//     // if (req.session.user.role!=="admin") {
//     //     return res.send("You are not allowed here!");
//     // }
//     // else if (req.query.role) {
//     //     query = { role: req.query.role, isActive: true }
//     // }
//     // else {
//     //     query = { isActive: true }
//     // }

//     user.find(query).toArray((err, data) => {
//         if (err) throw err;
//         return res.status(200).send(data);
//     })
// })

router.get('/users', (req, res) => {
    user.find({}, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    })
})


//login
router.post('/login', (req, res) => {

    const info = {
        "email": req.body.email,
        "password": req.body.password
    }
    user.findOne(info, (err, data) => {
        if (err || !data) {
            return res.status(400).send("Inavlid email! Please try again");
        }
        return res.status(200).send(data)
        // res.redirect('/')
    });
});

//logout
router.get('/logout', (req, res) => {
    req.session.user = null;
    return res.status(200).send("Logout successful!")
})

router.put('/delete', function (req, res) {
    // let status;
    // if (req.body.isActive) {
    //     if (req.body.isActive == 'true') {
    //         status = true
    //     } else {
    //         status = false
    //     }
    // } else {
    //     status = false
    // }
    // var id = req.params.id;
    // let { id } = req.params //destructuring

    let id = req.body._id;
    user.updateOne(
        { email: req.body.email },
        {
            isActive: false
        },
        (err, data) => {
            if (err) res.status(500).send({ auth: true, message: err });
            return res.status(200).send(data)
        })
})

router.put('/edit', function (req, res) {
    // let status;
    // if (req.body.isActive) {
    //     if (req.body.isActive == 'true') {
    //         status = true
    //     } else {
    //         status = false
    //     }
    // } else {
    //     status = false
    // }
    // var id = req.params.id;
    // let { id } = req.params //destructuring

    let id = req.body._id;
    user.updateOne(
        { email: req.body.email },
        {
            role: req.body.role
        },
        (err, data) => {
            if (err) res.status(500).send({ auth: true, message: err });
            return res.status(200).send(data)
        })
})


router.post('/userInfo', (req, res) => {



    user.findOne({ _id: req.body._id }, { password: 0 }, (err, data) => {
        if (err) return res.status(500).send({ auth: true, message: err });
        return res.status(200).send(data);
    })

})


router.put('/editPassword', function (req, res) {
    // let status;
    // if (req.body.isActive) {
    //     if (req.body.isActive == 'true') {
    //         status = true
    //     } else {
    //         status = false
    //     }
    // } else {
    //     status = false
    // }
    // var id = req.params.id;
    // let { id } = req.params //destructuring

    // let hashedPassword = bycrypt.hashSync(req.body.password, 8)
    //let id = req.body._id;
    user.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        if (data) {
            user.updateOne(
                { email: req.body.email },
                {
                    password: req.body.password
                },
                (err, data) => {
                    if (err) res.status(500).send({ auth: true, message: err });
                    return res.status(200).send(data)
                })
        }
        else {
            return res.status(200).send({ auth: true, message: "Wrong email entered!" })
        }
    })

})


router.put('/editName', function (req, res) {
    // let status;
    // if (req.body.isActive) {
    //     if (req.body.isActive == 'true') {
    //         status = true
    //     } else {
    //         status = false
    //     }
    // } else {
    //     status = false
    // }
    // var id = req.params.id;
    // let { id } = req.params //destructuring

    // let hashedPassword = bycrypt.hashSync(req.body.password, 8)
    //let id = req.body._id;
    user.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        if (data) {
            user.updateOne(
                { email: req.body.email },
                {
                    name: req.body.name
                },
                (err, data) => {
                    if (err) res.status(500).send({ auth: true, message: err });
                    return res.status(200).send(data)
                })
        }
        else {
            return res.status(200).send({ auth: true, message: "Wrong email entered!" })
        }
    })

})


router.put('/images_upload',(req,res)=>{
    console.log(req.files.profilePhoto);
    //console.log(req.body)
    
    let image=req.files.profilePhoto;
    cloudinary.uploader.upload(image.tempFilePath, (err, result)=> { 
        if(err) throw err;
        user.findOne({ email: req.body.email }, (err, data) => {
            if (err) throw err;
            if (data) {
                user.updateOne(
                    { email: req.body.email },
                    {
                        profile_photo: result.url
                    },
                    (err, data) => {
                        if (err) res.status(500).send({ auth: true, message: err });
                        return res.status(200).send(data)
                    })
            }
            else {
                return res.status(200).send({ auth: true, message: "Wrong email entered!" })
            }
        })
    });
    // image.mv(__dirname + '/public/images/'+ image.name,(err,data)=>{
    //     if(err)  throw err;
   
        
        
    // })
})



module.exports = router;