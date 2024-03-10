import * as mongoose from 'mongoose';

export const User = new mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    gender: String,
});