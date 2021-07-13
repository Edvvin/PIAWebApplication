import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Config = new Schema({
    percent: {
        type: Number,
    },
});

export default mongoose.model('Config', Config, 'config');