import { PaginateResult } from 'mongoose';
import UserEmailExists from '../../errors/user/user-email-exists';
import { IPaginate } from '../models/interfaces/paginate-interface';
import { IUser } from '../models/interfaces/user-interface';
import userRepository from '../repositories/user-repository';

class UserService {
  async findUser (query: IPaginate): Promise<PaginateResult<IUser>> {
    const result = await userRepository.find(query);
    return result;
  }

  async create (payload: IUser): Promise<IUser> {
    if (await userRepository.findByEmail(payload.email)) throw new UserEmailExists();
    return await userRepository.create(payload);
  }
}

export default new UserService();
