import { IsString, IsUrl, MinLength } from "class-validator";

import { UserRegisterDto } from "@src/auth/dto/user-register.dto";

export class CreateUserDto extends UserRegisterDto {
  @IsString()
  @MinLength(3)
  last_name?: string;

  @IsString()
  @IsUrl()
  image_url?: string; //Investigate about this
}
