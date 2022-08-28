import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({ example: 'frf46646rrr66r4gr98r7rvr1v', description: 'Id of the user' })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({
        example: 'hi283ewh39df2fwi363owu16d1c4f6ef6e',
        description: 'Token for resetting the password',
    })
    @IsNotEmpty()
    @IsString()
    token: string;

    @ApiProperty({ example: 'moneyIsMyLove', description: 'New password of the user' })
    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
