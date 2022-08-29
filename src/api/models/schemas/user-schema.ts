import { Schema, model, PaginateModel } from 'mongoose';
import { IUser } from '../interfaces/user-interface';
import paginate from 'mongoose-paginate-v2';

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

UserSchema.plugin(paginate);
export default model<IUser, PaginateModel<IUser>>('product', UserSchema);
