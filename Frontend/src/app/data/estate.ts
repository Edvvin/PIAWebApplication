export class Estate{
    _id: string;
    name: string;
    description : string;
    country : string;
    city : string;
    address: string;
    isHouse : boolean;
    numberOfFloors : number;
    floorOfAparment: number;
    area : number;
    numberOfRooms : number;
    isFurnished : boolean;
    isForSale : boolean;
    price : number;
    owner: string;
    ownedByAgency: boolean;
    isPromoted: boolean;
    isVerified: boolean;
    chats: Chat[];
    images: string[];
    sold: {toUser: string, amount: number, profit: number};
    isSold: boolean;
    occupied: {
        fromDate: Date,
        toDate: Date
    }[];
}

export class Chat {
    username: string;
    isArchivedByOwner: boolean;
    isArchivedByCustomer: boolean;
    messages: Message[];
    time: Date;
    offer: {
        price: number,
        dateFrom: Date,
        dateTo: Date,
    };
}

export class Message {
    text: string;
    fromClient: boolean;
    sender: string;
    time: Date;
}