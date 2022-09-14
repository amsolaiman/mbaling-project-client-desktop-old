import { mbalingApiService } from "./mbaling-api.service";
import { DefaultApi, UserDto } from "./rest-api";


class UserService extends DefaultApi {
  async create(payload: UserDto): Promise<UserDto> {
    const response = await mbalingApiService.addUser(payload);
    return response.data;
  }

  async getAll(): Promise<UserDto> {
    const response = await mbalingApiService.getUsers();
    return response.data;
  }

  async getOne(id: number): Promise<UserDto> {
    const response = await mbalingApiService.getUser(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await mbalingApiService.updateUser(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await mbalingApiService.deleteUser(id);
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }

  async getUserProfile() {
    const response = await mbalingApiService.profile();
    return response.data;
  }
}

const userService = new UserService();
export default userService;
