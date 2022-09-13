import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(id: string | number): Promise<User> {
        return await this.userModel.findById(id);
    }

    async delete(id: string | number): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new ForbiddenException('invalid user id');
        }

        // delete user
        await user.remove();

        return user;
    }
}
