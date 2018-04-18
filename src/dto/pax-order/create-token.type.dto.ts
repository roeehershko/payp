import {IsNotEmpty, IsString} from 'class-validator';

export class CreateTokenDto {

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}