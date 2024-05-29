import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDTO } from "../user/dto";
import { appErrors } from "../../common/constants/errors";
import { UserLoginDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from "./response";
import { TokenService } from "../token/token.service";
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private  readonly tokenService: TokenService) {
  }

  async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (existUser) throw new BadRequestException(appErrors.USER_EXIST);
      return await this.userService.createUser(dto);
    } catch (e) {
      throw new Error(e);
    }

  }

  async loginUser(dto: UserLoginDto): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (!existUser) throw new BadRequestException(appErrors.USER_EXIST);
      const validatePassword = await bcrypt.compare(dto.password, existUser.password);
      if(!validatePassword) throw new BadRequestException(appErrors.USER_WRONG_DATA);

      const user = await this.userService.publicUser(dto.email);
      const token = await this.tokenService.generateJwtToken(user);
      return {user, token};
    } catch (e) {
      throw new Error(e);
    }

  }
}
