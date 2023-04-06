import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Incorrect Email!' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly password: string;
}
