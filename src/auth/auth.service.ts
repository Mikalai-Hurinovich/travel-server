import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: Readonly<RegisterDto>): Promise<{ token: string }> {
    const { password, name, email } = userDto;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new HttpException(
        'User with this email is already exists!',
        HttpStatus.FORBIDDEN,
      );
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create(name, email, hashedPass);
    const token = this.jwtService.sign({ newUser });
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string } | null> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid Credentials!');
    }
    const token = this.jwtService.sign({ user });
    return { token };
  }

  async verifyJwt(token: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verify(token);
      return { exp };
    } catch (e) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
