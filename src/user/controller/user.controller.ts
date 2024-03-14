import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDTO} from '../dto/user.dto';import { query } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService : UserService) {}

    // @Get()
    // public getUsers(
    //     @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    //     @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
    // ) {
    //     return this.userService.getUsers(offset, limit);
    // }
    
    @Post()
    public signUp(@Body() user : CreateUserDTO) {
        return this.userService.createUser(user);
    }

    @Get(':nickname')
    public async getUserByNickname(@Param('nickname') nickname: string) {
        return this.userService.getUserByNickname(nickname);
    }

    // @Delete(':id')
    // public async deleteUserById(@Param('id') id: number) {
    //     return this.userService.deleteUserById(id);
    // }
    

    // @Put(':id')
    // public async putUserById(@Param('id') id: number, @Query() query) {
    //     const propertyName = query.property_name;
    //     const propertyValue = query.property_value;
    //     return this.userService.putUserById(id, propertyName, propertyValue);
    // }
}
