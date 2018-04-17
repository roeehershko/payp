import {IsString} from 'class-validator';

export class CreateTokenDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}