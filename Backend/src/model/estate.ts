import mongoose, { SchemaTypes } from 'mongoose';

const Schema = mongoose.Schema;

let Estate = new Schema({
    _id: {
        type: SchemaTypes.ObjectId,
    },
    description: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    address: {
        type: String,
    },
    floorOfAparment: {
        type: Number,
    },
    numberOfFloors: {
        type: Number,
    },
    area: {
        type: Number,
    },
    numberOfRooms: {
        type: Number,
    },
    isFurnished: {
        type: Boolean,
    },
    isForSale: {
        type: Boolean,
    },
    price: {
        type: Number,
    },
    isPromoted: {
        type: Boolean,
    },
    chats: {
        type: [{
            username: {
                type: String,
            },
            isArchived: {
                type: Boolean,
            },
            messages: {
                type: [{
                    text: {
                        type: String,
                    },
                    fromClient: {
                        type: Boolean,
                    },
                    sender: {
                        type: String,
                    },
                }],
            },
        }],
    },
});

export default mongoose.model('Estate', Estate, 'estates');