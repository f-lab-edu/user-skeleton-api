import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDTO, UpdateUserDTO} from '../dto/user.dto';import { query } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService : UserService) {}

    @Get()
    public async getUsers(
        @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
    ) {
        return this.userService.getUsers(offset, limit);
    }
    
    @Post()
    public async signUp(@Body() user: CreateUserDTO) {
        return this.userService.createUser(user);
    }

    @Get(':nickname')
    public async getUserByNickname(@Param('nickname') nickname: string) {
        return this.userService.getUserByNickname(nickname);
    }

    @Delete(':nickname')
    public async deleteUserById(@Param('nickname') nickname: string) {
        return this.userService.deleteUserByNickname(nickname);
    }
    
    @Put(':nickname')
    public async updateUserByNickname(@Param('nickname') nickname: string, @Body()updateUserDTO: UpdateUserDTO) {
        return this.userService.updateUserByNickname(nickname, updateUserDTO);
    }
}
