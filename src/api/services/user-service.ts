import { ObjectId, PaginateResult } from 'mongoose';
import { IPaginate } from '../models/interfaces/paginate-interface';
import { IUser } from '../models/interfaces/user-interface';
import userRepository from '../repositories/user-repository';
import UsersNotFound from '../../errors/user/users-not-found';
import UserNotFound from '../../errors/user/user-not-found';
import PageNotFound from '../../errors/page-not-found';
import UserIncorrectPassword from '../../errors/user/user-incorrect-password';
const bcrypt = require('bcrypt');

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
    const result = await userRepository.findByEmail(payload.email);
    if (result === null) throw new UserNotFound();
    payload.password = await bcrypt.hash(payload.password, Number(process.env.SALT_ROUND));
    return await userRepository.create(payload);
  }

  async deleteUser (id: ObjectId): Promise<void> {
    const result = await userRepository.findById(id);
    if (result === null) throw new UserNotFound();
    await userRepository.delete(id);
  }

  async authenticateUser (payload: IUser): Promise<IUser> {
    const result = await userRepository.findByEmail(payload.email);
    if (result === null) throw new UserNotFound();
    if (!await bcrypt.compare(payload.password, result.password)) throw new UserIncorrectPassword();
    return result;
  }
}

export default new UserService();
