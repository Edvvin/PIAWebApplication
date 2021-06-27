export class Estate{
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
    chats: Chat[];
}

export class Chat {
    username: string;
    isArchived: boolean;
    messages: Message[];
}

export class Message {
    text: string;
    fromClient: boolean;
    sender: string;
}