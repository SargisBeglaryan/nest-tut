import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "../user/dto";
import { UserLoginDto } from "./dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthUserResponse } from "./response";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiTags('API')
  @ApiResponse({status: 200, type: CreateUserDTO})
  @Post('register')
  register(@Body() dto:CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUser(dto);
  }

  @ApiTags('API')
  @ApiResponse({status: 200, type: UserLoginDto})
  @Post('login')
  login(@Body() dto: UserLoginDto): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto)
  }
}
