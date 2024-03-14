import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDTO, UserResponse } from '../dto/user.dto';

@Injectable()
export class UserService {
    
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    // public async getUsers(offset: number, limit: number): Promise<UserDTO[]> {
    //     const users = await this.userModel.find().exec();
    //     if(!users || !users[0]) {
    //         throw new HttpException('Not Found', 404);
    //     }
    //     return users;
    // }


    public async createUser(createUserDTO: CreateUserDTO) {
        const user = await new this.userModel(createUserDTO);
        return user.save();
    }

    public async getUserByNickname(nickname: string): Promise<UserResponse> {
        const user = await this.userModel.findOne({ nickname }).exec();
        if(!user) {
            throw new HttpException('Not Found', 404);
        }
        return user;
    }

    // public async deleteUserById(id: number): Promise<number> {
    //     const user = await this.userModel.deleteOne({ id }).exec();
    //     if(user.deletedCount === 0) {
    //         throw new HttpException('Not Found', 404);
    //     }
    //     return id;
    // }

    // public async putUserById(
    //     id: number, 
    //     propertyName: string, 
    //     propertyValue: string,
    // ): Promise<UserDTO> {
    //     const user = await this.userModel.findOneAndUpdate({ id }, {
    //         [propertyName]: propertyValue
    //     })
    //     .exec();
    //     if(!user) {
    //         throw new HttpException('Not Found', 404);
    //     }
    //     return user;
    // }
}
