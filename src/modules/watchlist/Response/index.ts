import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export  class CreateAssetResponse {
  @ApiProperty()
  user: number

  @ApiProperty()
  name: string
  @ApiProperty()
  assetId: string
}