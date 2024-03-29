import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { join } from "path";
import fastifyStatic from "@fastify/static";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);

	app.setGlobalPrefix("api/v1");
	app.enableCors();

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	const swaggerConfig = new DocumentBuilder()
		.setTitle("APS API Documentation")
		.setDescription(
			"Application API for APS Web App to upload and download applications",
		)
		.setVersion("1.0")
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("docs", app, document);

	//* Use of ConfigService to get environment variables
	const configService = app.get(ConfigService);

	const upload_location = configService.getOrThrow<string>("UPLOAD_LOCATION");
	app.register(fastifyStatic, {
		root: join(__dirname, `./../${upload_location}`), // Directorio donde se guardan los archivos
		prefix: "/uploads/", // Ruta URL para acceder a los archivos ( ejemplo: http://localhost:3000/uploads/images/imagen.jpg )
	});

	const port = configService.get<string>("PORT", "3000");
	await app.listen(port, "0.0.0.0");

	const logger = app.get(Logger);
	logger.log(`App is ready and listening on port ${port} 🚀`);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
	// eslint-disable-next-line no-console
	console.error(error);
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
}

process.on("uncaughtException", handleError);
