import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from '../interfaces/user.interface';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
    
    constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>) {}

    public async getUsers(): Promise<UserDTO[]> {
        const users = await this.userModel.find().exec();
        if(!users || !users[0]) {
            throw new HttpException('Not Found', 404);
        }
        return users;
    }


    public async postUser(createUser: UserDTO) {
        const user = await new this.userModel(createUser);
        return user.save();
    }

    public async getUserById(id: number): Promise<UserDTO> {
        const user = await this.userModel.findOne({ id }).exec();
        if(!user) {
            throw new HttpException('Not Found', 404);
        }
        return user;
    }

    public async deleteUserById(id: number): Promise<number> {
        const user = await this.userModel.deleteOne({ id }).exec();
        if(user.deletedCount === 0) {
            throw new HttpException('Not Found', 404);
        }
        return id;
    }

    public async putUserById(
        id: number, 
        propertyName: string, 
        propertyValue: string,
    ): Promise<UserDTO> {
        const user = await this.userModel.findOneAndUpdate({ id }, {
            [propertyName]: propertyValue
        })
        .exec();
        if(!user) {
            throw new HttpException('Not Found', 404);
        }
        return user;
    }
}
