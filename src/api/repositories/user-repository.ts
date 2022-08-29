import { PaginateResult, ObjectId } from 'mongoose';
import PaginateCustomLabels from '../../utils/paginate-custom-labels';
import { IPaginate } from '../models/interfaces/paginate-interface';
import { IUser } from '../models/interfaces/user-interface';
import userSchema from '../models/schemas/user-schema';

class UserRepository {
  async find (query: IPaginate): Promise<PaginateResult<IUser>> {
    const options = {
      page: query.page || 1,
      limit: query.limit || 50,
      customLabels: new PaginateCustomLabels('users')
    };
    const resultsPaginate = await userSchema.paginate({}, options);
    return resultsPaginate;
  }

  async findById (id: ObjectId): Promise<IUser|null> {
    return userSchema.findOne({ _id: id });
  }

  async findByEmail (email: String): Promise<boolean> {
    const result = await userSchema.findOne({ email });
    return result !== null;
  }

  async create (payload: IUser): Promise<IUser> {
    return userSchema.create(payload);
  }

  async delete (id: ObjectId): Promise<void> {
    await userSchema.findByIdAndDelete({ _id: id });
  }
};

export default new UserRepository();
