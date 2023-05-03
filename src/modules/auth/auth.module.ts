import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalStrategy } from './local.auth';
import { UserSchema } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { UserModule } from '../users/users.module';

// use this command to generate JWT secret key
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret:
        '0193c29ad58f4211bde65108419095c45eb363e05e70c66a48f40b2d4c807176',
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
