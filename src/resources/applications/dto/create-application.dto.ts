import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(89)
  name: string = "";

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number = 0;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  downloads: number = 0;

  @IsString()
  @IsNotEmpty()
  @MaxLength(9)
  spaces: string = "";
}
