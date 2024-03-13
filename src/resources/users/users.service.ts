import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		return await this.userRepository.save(createUserDto);
	}

	//!No debe ser modificado
	async finOneByEmail(email: string): Promise<User | null> {
		return await this.userRepository.findOneBy({ email: email });
	}

	// async findAll(): Promise<User[]> {
	//   return await this.userRepository.find();
	// }

	// async findOne(id: string): Promise<User | null> {
	//   return this.userRepository.findOneBy({ id });
	// }
	
	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		return await this.userRepository.save({ id: id, ...updateUserDto });
	}

	async remove(email: string): Promise<User> {
		const user = await this.finOneByEmail(email);

		if (!user) {
			throw new NotFoundException("User does not exist!");
		}

		return await this.userRepository.remove(user);
	}
}
