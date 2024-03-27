import multer from "fastify-multer";
import { v4 as uuidv4 } from "uuid";
import { FastifyRequest } from "fastify";
import { File, GetFileName } from "@nest-lab/fastify-multer";
import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();

const fileNameConfig: GetFileName = (req, file, cb) => {
	cb(null, `${uuidv4()}-${file.originalname}`);
};

const storages = {
	images: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, configService.getOrThrow<string>("UPLOAD_LOCATION_IMAGES"));
		},
		filename: fileNameConfig,
	}),
	apps: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, configService.getOrThrow<string>("UPLOAD_LOCATION_APPS"));
		},
		filename: fileNameConfig,
	}),
};

const fileFilterConfigs = {
	images: (
		request: FastifyRequest,
		file: File,
		cb: (error: Error | null, acceptFile?: boolean) => void,
	) => {
		// Accept images only
		if (!file.mimetype.startsWith("image/")) {
			cb(new Error("Only images are allowed!"), false);
		}

		// To accept the file pass `true`, like so:
		cb(null, true);
	},
	apps: (
		request: FastifyRequest,
		file: File,
		cb: (error: Error | null, acceptFile?: boolean) => void,
	) => {
		// Accept apps only
		// TODO: add type of app to accept
		// if (!file.mimetype.startsWith("??/")) {
		// 	cb(new Error("Only apps are allowed!"), false);
		// }

		// To accept the file pass `true`, like so:
		cb(null, true);
	},
};

export const multerConfigs = {
	images: multer({
		storage: storages.images,
		fileFilter: fileFilterConfigs.images,
		limits: {
			fileSize: 1024 * 1024 * 5, // 5MB
		},
	}),
	apps: multer({
		storage: storages.apps,
		fileFilter: fileFilterConfigs.apps,
		limits: {
			fileSize: 1024 * 1024 * 5, // 5MB //TODO: set max size
		},
	}),
};
