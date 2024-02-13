import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUrl,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string = ""; // VARCHAR(255) NOT NULL,

  @IsNotEmpty()
  @IsStrongPassword()
  password: string = ""; // VARCHAR(255) NOT NULL, (Encriptado)

  @IsString()
  @IsUrl()
  image_url: string = ""; //Investigate about this
}
