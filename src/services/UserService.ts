import { BAD_REQUEST } from 'http-status-codes';
import { InjectModel } from '../decorators';
import { roles, stateUser } from '../enums';
import { ErrorHandler } from '../errors/ErrorHandler';
import { User } from '../models/User';
import { encryptPassword } from '../utils/Bcrypt';
import { Capitalize } from '../utils/Capitalize';

export class UserService {
  @InjectModel(User)
  private static userModel: Model<User>;

  private static notShowFields = {
    isVerified: false,
    password: false,
    stateUser: false,
  };

  static async getOne(id: string): Promise<any> {
    const user: User = await this.userModel
      .findOne({
        $and: [{ _id: id }, { stateUser: stateUser.ACTIVE }],
      })
      .populate('role');

    if (!user || user.role.name === roles.ROOT) {
      throw new ErrorHandler(BAD_REQUEST, 'User not found!');
    }

    return user;
  }

  static async getAll() {
    const users = this.userModel.aggregate([
      {
        $lookup: {
          from: 'roles',
          localField: 'role',
          foreignField: '_id',
          as: 'role',
        },
      },
      {
        $unwind: '$role',
      },
      {
        $match: {
          'role.name': { $ne: roles.ROOT },
        },
      },

      {
        $project: {
          _id: 1,
          firstname: 1,
          lastname: 1,
          username: 1,
          email: 1,
          role: '$role.name',
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    return users;
  }

  static async create(userData: User) {
    const { firstname, lastname, username, email, password } = userData;

    const userExist = await this.userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userExist) throw new ErrorHandler(BAD_REQUEST, 'User already exist!');

    const newUser = await this.userModel.create({
      ...userData,
      firstname: Capitalize(firstname),
      lastname: Capitalize(lastname),
      password: await encryptPassword(password),
    });

    const dataUser = {
      _id: newUser._id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return dataUser;
  }
}
