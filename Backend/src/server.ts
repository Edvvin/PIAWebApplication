import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import mongoose from 'mongoose';
import user from './model/user';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydb');

const conn = mongoose.connection;
conn.once('open', () => {
    console.log('Mongo ready!')
});

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'upload');
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + '.' + `${file.originalname}`);
    },
});

var upload=multer({storage:storage})

router.route('/login').post((req, res) =>{
    let username=req.body.username;
    let password=req.body.password;

    user.findOne({'username':username, 'password': password}, (err,usr) => {
        if(err){
            console.log(err);
            let data = {
                status: "FAIL",
                message: "Cannot find user " + username,
            };
            res.json(data);
        } else {
            let data = {
                user: usr,
                status: "OK",
                message: "Log in successful.",
            };
            res.json(data);
        }
    });
});

router.route('/register').post((req, res) =>{
    let u : any = new user(req.body);
    user.findOne({'username':u.username}, (err,usr) => {
        if(!err){
            console.log(err);
            let data = {
                status: "FAIL",
                message: "Username: " + u.username + " already exists",
            };
            res.json(data);
        } else {
            u.save().then(() => {
                let data = {
                    status: "OK",
                    message: "User registered",
                };
                res.json(data);
            }).catch(() => {
                let data = {
                    status: "FAIL",
                    message: "Failed to register",
                };
                res.status(400).json(data);
            });
        }
    });
});

router.route('/verifyuser').post((req, res) =>{
    let username = req.body.username;
    user.findOne({ 'username': username }, (err, u) => {
        if (err) {
            console.log(err);
        } else {
            if (u) {
                user.collection.updateOne({ "username": username },
                 { $set: {'isVerified' : true} });
                res.json({ 'message': 'Successfully verified user' });
            } else {
                res.json({ 'message': 'user: ' + username + 'not found'});
            }
        }
    });
});


router.route('/unverified').get((req, res) =>{
    user.find({isVerified: false}, (err, u) =>{
        if(err) {
            console.log(err);
        } else {
           res.json(u);
        }
    });
});

router.route('/allusers').get((req, res) =>{
    user.find({}, (err, u) =>{
        if(err) {
            console.log(err);
        } else {
           res.json(u);
        }
    });
});

router.route('/changepass').post((req, res) =>{
    let username = req.body.username;
    let password = req.body.password ;
    user.collection.updateOne({ username: username },
        { $set: {password : password} });

    res.json({ message: 'Successfully change password' });
});

router.route('/upload').post(upload.single('file'), (req: any, res, next) => {
    const file = req.file;
    if( !file ) {
        const error = new Error('No file given');
        return next(error);
    }
    res.send(file);
});

router.route('/setimage').post((req, res) => {
    let username = req.body.username;
    let img = req.body.img;
    user.findOne({ username: username }, (err, usr) => {
        if (err) {
            console.log(err);
            res.status(400).json({ 'status': 'FAIL' });
        } else {
            if (usr) {
                user.collection.updateOne({ username: username }, { $set: { image: img } });
                res.json({ status: 'OK' });
            } else {
                res.status(400).json({ status: 'FAIL' });
            }
        }
    });
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));