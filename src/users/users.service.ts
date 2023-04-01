import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { IUserDetails } from './user-details.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  getUserDetails(user: UserDocument): IUserDetails {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async create(name, email, hashedPass: string): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPass,
    });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<IUserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this.getUserDetails(user);
  }
}
