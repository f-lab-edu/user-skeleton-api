import { IsNumber, IsString, Matches, MaxLength } from "class-validator";

export class UserResponse {
    readonly name: string;
    readonly nickname: string;
    readonly password: string;
    readonly age: number;
    readonly gender: Gender;
}

export class CreateUserDTO {
    @IsString()
    name: string;
    
    @IsString()
    @MaxLength(30)
    nickname: string;
    
    @IsString()
    @Matches('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$')
    password: string;
    
    @IsNumber()
    age: number;
    
    gender: Gender;
}

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
}

export class UpdateUserDTO {
    @IsString()
    name: string;
    
    @IsString()
    @Matches('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$')
    password: string;
}