import { Body, Controller, Get, Patch, Post, Delete, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO, DeleteUserDto, UpdateUserDto } from "./dto";
import { JwtAuthGuard } from "../../guards/jwt-guard";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  createUsers (@Body() dto: CreateUserDTO) {
    return this.userService.createUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  updateUser(@Body() updateDto: UpdateUserDto, @Req() request): Promise<UpdateUserDto> {
    const user = request.user;
    return this.userService.updateUser(user.email, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteUser(@Req() request): Promise<boolean> {
    const user = request.user;
    return this.userService.deleteUser(user.email);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

}
