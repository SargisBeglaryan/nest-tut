import { IsString } from "class-validator";

export class AuthUserResponse {
  @IsString()
  firstname: string
  @IsString()
  username: string
  @IsString()
  email: string
  @IsString()
  password: string

  @IsString()
  token: string
}