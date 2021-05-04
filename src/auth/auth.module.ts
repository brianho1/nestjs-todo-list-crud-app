import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// The JwtStrategy is responsible for getting our token from the header of the request 
// and checking if it’s valid. If it’s, then it’ll get the userId from the payload 
// (we’ll add this userId to the payload on the AuthService). 
// The JwtAuthGuard is the one that will call the JwtStrategy and is the class that 
// we’ll use to secure our routes.

// console.log(process.env.JWT_SECRET);
// require('dotenv').config()

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        // secret: 'todo123'
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

