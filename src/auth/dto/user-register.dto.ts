import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

import { UserLoginDto } from "./user-login.dto";

export class UserRegisterDto extends UserLoginDto {
  @Transform(({ value }) => (value as string).trim())
  @IsString()
  @MinLength(3)
  name!: string;
}
