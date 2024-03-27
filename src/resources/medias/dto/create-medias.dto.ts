import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
	IsArray,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUrl,
	MaxLength,
} from "class-validator";

export class CreateMediasDto {
	@ApiProperty({ isArray: true, type: String })
	@IsString()
	@MaxLength(600)
	@IsOptional()
	@IsArray()
	@IsUrl(
		{ require_protocol: false, require_host: false, require_port: false },
		{ each: true },
	)
	url: string[];

	//TODO: Verificar si está correcto esto, swagger (No se si solo swagger) no devuelve un array de string como: ["string", "string"] sino que lo da como: "string,string"
	@ApiProperty({ isArray: true, type: String })
	@Transform(({ value }) =>
		Array.isArray(value) ? value : [...(value as string).split(",")],
	)
	@IsArray()
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	alt: string[];

	constructor(url: string[], alt: string[]) {
		this.url = url;
		this.alt = alt;
	}
}
