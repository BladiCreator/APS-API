import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class UserLoginDto {
  @IsEmail()
  email!: string;

  @Transform(({ value }) => (value as string).trim())
  @IsString()
  @MinLength(6)
  password!: string;
}
