import { PaginateResult } from 'mongoose';
import UserEmailExists from '../../errors/user/user-email-exists';
import { IPaginate } from '../models/interfaces/paginate-interface';
import { IUser } from '../models/interfaces/user-interface';
import userRepository from '../repositories/user-repository';
import UsersNotFound from '../../errors/user/users-not-found';
import PageNotFound from '../../errors/page-not-found';

class UserService {
  async findUser (query: IPaginate): Promise<PaginateResult<IUser>> {
    const results = await userRepository.find(query);
    if ((query.page && results.offsets) && (query.page > results.offsets)) throw new PageNotFound();
    if (query.page && query.page <= 0) throw new PageNotFound();
    if (query.limit && query.limit <= 0) throw new PageNotFound();
    if (!results.total) throw new UsersNotFound();
    return results;
  }

  async create (payload: IUser): Promise<IUser> {
    if (await userRepository.findByEmail(payload.email)) throw new UserEmailExists();
    return await userRepository.create(payload);
  }
}

export default new UserService();
