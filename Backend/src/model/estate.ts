import mongoose, { SchemaTypes } from 'mongoose';

const Schema = mongoose.Schema;

let Estate = new Schema({
    name: {
        type: String,
    },
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
    ownedByAgency: {
        type: Boolean,
    },
    isPromoted: {
        type: Boolean,
    },
    occupied: {
        type: [{
            fromDate: {
                type: Date,
            },
            toDate: {
                type: Date,
            },
        }],
    },
    chats: {
        type: [{
            username: {
                type: String,
            },
            isArchivedByOwner: {
                type: Boolean,
            },
            isArchivedByCustomer: {
                type: Boolean,
            },
            time: {
                type: Date,
            },
            offer: {
                type: {
                    price: {
                        type: Number,
                    },
                    fromDate: {
                        type: Date,
                    },
                    toDate: {
                        type: Date,
                    },
                },
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
                    time: {
                        type: Date,
                    },
                }],
            },
        }],
    },
    images: {
        type: [String],
    },
    sold: {
        type: Boolean,
    }
});

export default mongoose.model('Estate', Estate, 'estates');