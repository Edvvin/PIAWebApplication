import mongoose, { SchemaTypes } from 'mongoose';

const Schema = mongoose.Schema;

let Estate = new Schema({
    description: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    isHouse: {
        type: Boolean,
    },
    numberOfFloors: {
        type: Number,
    },
    floorOfAparment: {
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
    owner: {
        type: String,
    },
    agency: {
        type: String,
    },
    ownedByAgency: {
        type: Boolean,
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
    images: {
        type: [String],
    }
});

export default mongoose.model('Estate', Estate, 'estates');