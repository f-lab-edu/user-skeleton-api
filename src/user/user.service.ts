import { HttpException, Injectable } from '@nestjs/common';
import { USERS } from './users.mock';

@Injectable()
export class UserService {
    private users = USERS;
    
    public getUsers() {
        return this.users;
    }


    public postUsers(user) {
        return this.users.push(user);
    }

    public getUserById(id: number): Promise<any> {
        const userId = Number(id);
        return new Promise((resolve) => {
            const user = this.users.find((user) => user.id === userId);
            if(!user) {
                throw new HttpException('Not Found', 404);
            }
            return resolve(user);
        });
    }

    public deleteUserById(id: number): Promise<any> {
        const userId = Number(id);
        return new Promise((resolve) => {
            const userIndex = this.users.findIndex((user) => user.id === userId);
            if(userIndex === -1) {
                throw new HttpException('Not Found', 404);
            }
            this.users.splice(userIndex, 1);
            return resolve(this.users);
        });
    }

    public putUserById(
        id: number, 
        propertyName: string, 
        propertyValue: string,
    ): Promise<any> {
        const userId = Number(id);
        return new Promise((resolve) => {
            const userIndex = this.users.findIndex((user) => user.id === userId);
            if(userIndex === -1) {
                throw new HttpException('Not Found', 404);
            }
            this.users[userIndex][propertyName] = propertyValue;
            return resolve(this.users[userIndex]);
    });
}
}
