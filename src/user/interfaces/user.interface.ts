import { Document } from "mongoose";

export interface UserInterface extends Document {
    readonly id: number;
    readonly name: string;
    readonly age: number;
    readonly gender: string;
}