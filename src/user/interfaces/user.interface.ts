import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from "mongoose";
import { IsString, MaxLength, Matches, IsNotEmpty, IsNumber} from 'class-validator';
import { Gender } from '../dto/user.dto';

const options: SchemaOptions = {
    timestamps: true,
    versionKey: false,
}

@Schema(options)
export class User extends Document {
    @IsString()
    @IsNotEmpty()
    @Prop({
        required: true,
    })
    name: string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @Prop({
        required: true,
        unique: true,
    })
    nickname: string;
    
    @IsString()
    @IsNotEmpty()
    @Prop({
        required:true,
    })
    password: string;
    
    @IsNumber()
    age: number;
    
    gender: Gender;
}

export const UserSchema = SchemaFactory.createForClass(User);