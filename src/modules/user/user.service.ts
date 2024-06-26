import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, DeleteUserDto, UpdateUserDto } from "./dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { isBoolean } from "class-validator";
import { Watchlist } from "../watchlist/models/watchlist.model";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (e) {
      throw new Error(e);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({where: {email}})
  }
  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password)
    await this.userRepository.create({
      firstname: dto.firstname,
      username: dto.username,
      email: dto.email,
      password: dto.password,
    })
    return dto;
  }

  async publicUser(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {email},
      attributes: {exclude: ['password']},
      include: {
        model: Watchlist,
        required: false
      }
    })
  }

  @ApiTags("API")
  @ApiResponse({status: 200, type: UpdateUserDto})
  async updateUser(email:string, dto:UpdateUserDto): Promise<UpdateUserDto> {
    await this.userRepository.update(dto, {where: {email}});
    return dto;
  }

  @ApiTags("API")
  @ApiResponse({status: 200, type: isBoolean})
  async deleteUser(email:string): Promise<boolean> {
    await this.userRepository.destroy({where: {email}});
    return true;
  }


  async getUsers(): Promise<object> {
    return await this.userRepository.findAll({
      attributes: {exclude: ['password']},
      include: {
        model: Watchlist,
        required: false
      }
    });
  }
}
