import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { IUserDetails } from '../users/user-details.interface';
import { ExistingUserDto } from '../users/dto/existing-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPass(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async register(user: Readonly<CreateUserDto>): Promise<IUserDetails | any> {
    const { password, name, email } = user;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new HttpException(
        'User with this email is already exists!',
        HttpStatus.FORBIDDEN,
      );
    }
    const hashedPass = await this.hashPass(password);
    const newUser = await this.userService.create(name, email, hashedPass);
    return this.userService.getUserDetails(newUser);
  }

  async doPasswordsMatch(password: string, hashPass: string): Promise<boolean> {
    return bcrypt.compare(password, hashPass);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUserDetails | null> {
    const user = await this.userService.findByEmail(email);
    if (!!user) {
      const doPasswordsMatch = await this.doPasswordsMatch(
        password,
        user.password,
      );
      if (!doPasswordsMatch) return null;
      return this.userService.getUserDetails(user);
    } else {
      return null;
    }
  }

  async login(
    existingUser: ExistingUserDto,
  ): Promise<{ token: string } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);
    if (!user)
      throw new HttpException('Invalid Credentials!', HttpStatus.UNAUTHORIZED);

    const jwt = this.jwtService.sign({ user });
    return { token: jwt };
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
