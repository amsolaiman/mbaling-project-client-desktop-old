import { mbalingApiService } from './mbaling-api.service';
import { PrfMediaDto } from './rest-api';
import { DefaultApi } from './rest-api/api';

class MediaService extends DefaultApi {
  async getPicture(id: number): Promise<PrfMediaDto> {
    const response = await mbalingApiService.getMedia(id);
    return response.data;
  }

  async uploadPicture(file: File[]): Promise<PrfMediaDto> {
    const response = await mbalingApiService.uploadPrfMedia(file);
    return response.data;
  }

  async getAll(): Promise<PrfMediaDto[]> {
    const response = await mbalingApiService.getAllMedia();
    return response.data as unknown as PrfMediaDto[];
  }

}

const mediaService = new MediaService();
export default mediaService;
