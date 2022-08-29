import { IUser } from '../models/interfaces/user-interface';
import userRepository from '../repositories/user-repository';

class UserService {
  async create (payload: IUser): Promise<IUser> {
    return await userRepository.create(payload);
  }
}

export default new UserService();
