import { Injectable } from '@nestjs/common';
import { Watchlist } from "./models/watchlist.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAssetResponse } from "./Response";

@Injectable()
export class WatchlistService {
  constructor(@InjectModel(Watchlist) private readonly watchListRepository: typeof Watchlist) {
  }

  async createAsset( user, dto): Promise<CreateAssetResponse> {
    const watchlist = {
      user: user.id,
      name: dto.name,
      assetId: dto.assetId
    }

    return await this.watchListRepository.create(watchlist);
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
