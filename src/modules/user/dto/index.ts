import { IsString } from "class-validator";
export class CreateUserDTO {
  @IsString()
  firstname: string
  @IsString()
  username: string
  @IsString()
  email: string
  @IsString()
  password: string
}