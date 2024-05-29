import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { WatchlistService } from "./watchlist.service";
import { WatchListDto } from "./dto";
import { JwtAuthGuard } from "../../guards/jwt-guard";

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() assetDto: WatchListDto, @Req() request) {
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

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteAsset(@Query('id') assetId: string, @Req() request){
    const { id } = request.user
    this.watchlistService.deleteAsset(id, assetId);
    return true;
  }
}
