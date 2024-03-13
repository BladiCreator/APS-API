import { SwaggerDocumentOptions } from "@nestjs/swagger";
import { FindApplicationDto } from "@src/resources/applications/dto/find-application.dto";

export const swaggerDocumentOptions: SwaggerDocumentOptions = {

  extraModels: [FindApplicationDto],

}