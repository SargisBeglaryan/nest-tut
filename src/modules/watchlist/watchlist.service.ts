import { Injectable } from '@nestjs/common';
import { Watchlist } from "./models/watchlist.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class WatchlistService {
  constructor(@InjectModel(Watchlist) private readonly watchListRepository: typeof Watchlist) {
  }

  async createAsset( user, dto) {
    const watchlist = {
      user: user.id,
      name: dto.name,
      assetId: dto.assetId
    }

    await this.watchListRepository.create(watchlist);
  }

  async getAllAssets() {
    return await this.watchListRepository.findAll();
  }

  async deleteAsset( userId: number, assetId: string) {

    await this.watchListRepository.destroy({ where: {
      id: assetId, user: userId
      }
    });
  }
}
