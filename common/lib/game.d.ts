import { ObjectId } from "mongodb";
export default class Game {
    name: string;
    price: number;
    category: string;
    id?: ObjectId | undefined;
    constructor(name: string, price: number, category: string, id?: ObjectId | undefined);
}
