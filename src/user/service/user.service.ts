import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDTO, UpdateUserDTO, UserResponse } from '../dto/user.dto';

@Injectable()
export class UserService {
    
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    public async getUsers(offset: number, limit: number): Promise<UserResponse[]> {
        const users = await this.userModel.find().exec();
        if(!users || !users[0]) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return users;
    }


    public async createUser(createUserDTO: CreateUserDTO) {
        const user = await new this.userModel(createUserDTO);
        return user.save();
    }

    public async getUserByNickname(nickname: string): Promise<UserResponse> {
        const user = await this.userModel.findOne({ nickname }).exec();
        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    public async deleteUserByNickname(nickname: string): Promise<string> {
        const user = await this.userModel.deleteOne({ nickname }).exec();
        if(user.deletedCount === 0) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return nickname;
    }
    
    public async updateUserByNickname(nickname: string, updateUserDTO: UpdateUserDTO): Promise<UserResponse> {
        const { name, password } = updateUserDTO;
        
        const updatedUser = await this.userModel.findOneAndUpdate(
            { nickname: nickname }, 
            { name: name, password: password },
            { new: true }
        ).exec();

        if (!updatedUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return updatedUser;
    }
}
