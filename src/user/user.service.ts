import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schema';
import { ProfileUpdateDto } from './dto';
import { AllUsersResponse } from './types';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async findAll(page: number, size: number, searchQuery: string): Promise<AllUsersResponse> {
        if (searchQuery) {
            const users = await this.userModel
                .find({
                    $or: [
                        { fullName: { $regex: searchQuery, $options: 'i' } },
                        { email: { $regex: searchQuery, $options: 'i' } },
                        { phoneNumber: { $regex: searchQuery, $options: 'i' } },
                    ],
                })
                .limit(size)
                .skip((page - 1) * size);

            const count = await this.userModel.countDocuments({
                $or: [
                    { fullName: { $regex: searchQuery, $options: 'i' } },
                    { email: { $regex: searchQuery, $options: 'i' } },
                    { phoneNumber: { $regex: searchQuery, $options: 'i' } },
                ],
            });

            return { count, users };
        }

        const users = await this.userModel
            .find()
            .limit(size)
            .skip((page - 1) * size);

        const count = await this.userModel.countDocuments();

        return { count, users };
    }

    async findOne(id: string | number): Promise<User> {
        return await this.userModel.findById(id);
    }

    async update(id: string | number, dto: ProfileUpdateDto): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new ForbiddenException('invalid user id');
        }

        return await this.userModel.findByIdAndUpdate(id, dto, { new: true });
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
