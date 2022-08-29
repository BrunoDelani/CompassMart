import { IUser } from '../models/interfaces/user-interface';

class UserService {
  async create (payload: IUser) {
    return console.log('User service!');
  }
}

export default new UserService();
