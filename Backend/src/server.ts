import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user from './model/user';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydb');

const conn = mongoose.connection;
conn.once('open', ()=>{
    console.log('Mongo ready!')
});

const router = express.Router();

router.route('/login').post((req, res) =>{
    let username=req.body.username;
    let password=req.body.password;

    user.findOne({'username':username, 'password': password}, (err,usr) => {
        if(err) console.log(err);
        else res.json(usr);
    });
});

router.route('/register').post((req, res) =>{
    let u = new user(req.body);
    u.save().then(u=>{
        res.status(200).json({'message':'Sccessfully added user'});
    }).catch(err=>{
        res.status(400).json({'user':'Failed to add new user'});
    });
});

router.route('/verifyuser').post((req, res) =>{
    let username = req.body.username;
    user.findOne({ 'username': username }, (err, u) => {
        if (err) console.log(err);
        else {
            if (u) {
                user.collection.updateOne({ "username": username },
                 { $set: {'isVerified' : true} });
                res.json({ 'message': 'Successfully verified user' });
            }
            else {
                res.json({ 'message': 'user: ' + username + 'not found'});
            }
        }
    });
});


router.route('/unverified').get((req, res) =>{
    user.find({isVerified: false}, (err, u) =>{
        if(err)console.log(err);
        else{
           res.json(u);
        }
    });
});

router.route('/allusers').get((req, res) =>{
    user.find({}, (err, u) =>{
        if(err)console.log(err);
        else{
           res.json(u);
        }
    });
});

router.route('/changepass').post((req, res) =>{
    let username = req.body.username;
    let password = req.body.password ;
    user.collection.updateOne({ "username": username },
        { $set: {'password' : password} });

    res.json({ 'message': 'Successfully change password' });
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));