import { IUser } from '../models/interfaces/user-interface';
import userSchema from '../models/schemas/user-schema';

class UserRepository {
  create (payload: IUser): Promise<IUser> {
    return userSchema.create(payload);
  }
};

export default new UserRepository();
