import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Watchlist } from "../../watchlist/models/watchlist.model";

@Table
export class User extends Model {
  @ApiProperty()
  @Column
  firstname: string
  @ApiProperty()
  @Column
  username: string
  @ApiProperty()
  @Column({'unique': true})
  email: string
  @ApiProperty()
  @Column
  password: string
  @ApiProperty()
  @Column
  list: string

  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE',
    onUpdate: "CASCADE"
  })
  watchlist:Watchlist[]

}