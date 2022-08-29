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

  async findById (id: ObjectId): Promise<boolean> {
    const result = await userSchema.findOne({ _id: id });
    return result !== null;
  }

  async findByEmail (email: String): Promise<boolean> {
    const result = await userSchema.findOne({ email });
    return result !== null;
  }

  create (payload: IUser): Promise<IUser> {
    return userSchema.create(payload);
  }

  delete (id: ObjectId): void {
    userSchema.findByIdAndDelete({ _id: id });
  }
};

export default new UserRepository();
