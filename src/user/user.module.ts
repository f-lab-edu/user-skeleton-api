import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { User, UserSchema } from './interfaces/user.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
