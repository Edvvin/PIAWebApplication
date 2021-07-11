import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({

    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    country: {
        type: String,
    },
    city : {
        type: String,
    },
    userType : {
        type: String,
    },
    isVerified : {
        type: String,
    },
    image: {
        type: String,
    },

});

export default mongoose.model('User', User, 'users');