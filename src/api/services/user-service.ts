import { ObjectId, PaginateResult } from 'mongoose';
import UserEmailExists from '../../errors/user/user-email-exists';
import { IPaginate } from '../models/interfaces/paginate-interface';
import { IUser } from '../models/interfaces/user-interface';
import userRepository from '../repositories/user-repository';
import UsersNotFound from '../../errors/user/users-not-found';
import UserNotFound from '../../errors/user/user-not-found';
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

  async createUser (payload: IUser): Promise<IUser> {
    if (await userRepository.findByEmail(payload.email)) throw new UserEmailExists();
    return await userRepository.create(payload);
  }

  async deleteUser (id: ObjectId): Promise<void> {
    const result = await userRepository.findById(id);
    if (result === null) throw new UserNotFound();
    await userRepository.delete(id);
  }
}

export default new UserService();
