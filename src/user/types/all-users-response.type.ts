import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../auth/schema';

export class AllUsersResponse {
    @ApiProperty({ example: 1, type: Number })
    count: number;
    @ApiProperty({ type: [User] })
    users: User[];
}
