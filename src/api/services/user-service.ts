import UserEmailExists from '../../errors/user/user-email-exists';
import { IPaginate } from '../models/interfaces/paginate-interface';
import { IUser } from '../models/interfaces/user-interface';
import userRepository from '../repositories/user-repository';

class UserService {
  async findUser (query: IPaginate) {
    return console.log('find all :D');
  }

  async create (payload: IUser): Promise<IUser> {
    if (await userRepository.findByEmail(payload.email)) throw new UserEmailExists();
    return await userRepository.create(payload);
  }
}

export default new UserService();
