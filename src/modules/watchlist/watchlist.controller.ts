import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { WatchlistService } from "./watchlist.service";
import { WatchListDto } from "./dto";
import { JwtAuthGuard } from "../../guards/jwt-guard";
import { CreateAssetResponse } from "./Response";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {
  }

  @ApiTags('API')
  @ApiResponse({status: 200, type: CreateAssetResponse})
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() assetDto: WatchListDto, @Req() request): Promise<CreateAssetResponse> {
    const user = request.user
    return this.watchlistService.createAsset(user, assetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllAssets(@Body() assetDto: WatchListDto, @Req() request) {
    return this.watchlistService.getAllAssets();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  updateAsset(@Body() assetDto: WatchListDto, @Req() request) {
    //const user = request.user
    return;
  }

  @ApiTags('API')
  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteAsset(@Query('id') assetId: string, @Req() request){
    const { id } = request.user
    this.watchlistService.deleteAsset(id, assetId);
    return true;
  }
}
