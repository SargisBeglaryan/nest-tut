import {Column, Model, Table} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

@Table
export class User extends Model {
  @ApiProperty()
  @Column
  firstname: string
  @ApiProperty()
  @Column
  username: string
  @ApiProperty()
  @Column
  email: string
  @ApiProperty()
  @Column
  password: string
  @ApiProperty()
  @Column
  list: string
}