import { IUser } from '../models/interfaces/user-interface';
import userSchema from '../models/schemas/user-schema';

class UserRepository {
  async findByEmail (email: String): Promise<boolean> {
    const result = await userSchema.findOne({ email });
    return result !== null;
  }

  create (payload: IUser): Promise<IUser> {
    return userSchema.create(payload);
  }
};

export default new UserRepository();
