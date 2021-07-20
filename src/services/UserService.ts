import { Model } from 'mongoose';
import { InjectModel } from '../decorators';
import { User } from '../models/User';

export class UserService {
  @InjectModel(User)
  private static userModel: Model<User>;

  static async getOne(id): Promise<any> {
    const user: User = await this.userModel.findById({
      $and: [{ _id: id }, { isActive: true }],
    });

    return user;
  }

  static async getAll() {
    const users = this.userModel.aggregate();
    return users;
  }
}
