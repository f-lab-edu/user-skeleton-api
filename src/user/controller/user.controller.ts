import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDTO } from '../dto/user.dto';import { query } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService : UserService) {}

    @Get()
    public getUsers() {
        return this.userService.getUsers();
    }
    
    @Post()
    public postUser(@Body() user : UserDTO) {
        return this.userService.postUser(user);
    }

    @Get(':id')
    public async getUserById(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }

    @Delete(':id')
    public async deleteUserById(@Param('id') id: number) {
        return this.userService.deleteUserById(id);
    }
    

    @Put(':id')
    public async putUserById(@Param('id') id: number, @Query() query) {
        const propertyName = query.property_name;
        const propertyValue = query.property_value;
        return this.userService.putUserById(id, propertyName, propertyValue);
    }
}
