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
  @IsPositive()
  price: number = 0;

  @IsInt()
  @IsPositive()
  downloads: number = 0;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  spaces: string = "";
}
