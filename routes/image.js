const express = require("express");
const router=express.Router()
const Imgmodel=require("../model/image");
const bodyParser = require("body-parser");
const multer = require('multer');
const path=require('path');
const app = express();
const fs=require("fs")
router.use(express.static(__dirname+"../uploads/"))

app.set('views','../views');
app.set('view engine', 'ejs');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
        console.log("File Object",file);
        let ext = '';
        if(file.originalname.split('.').length >1 ){
            ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        }
        console.log('ext', ext);
        cb(null, file.filename + '-' + Date.now() + ext)
    }
})
  

var upload = multer({ storage: storage });

router.get('/', (req, res) => {
    Imgmodel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});
//create
router.post('/', upload.single('image'), (req, res, next) => {
  
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: req.body.file
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});

module.exports=router;