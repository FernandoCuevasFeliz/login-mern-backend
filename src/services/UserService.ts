import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import { InjectModel } from '../decorators';
import { roles, stateUser } from '../enums';
import { ErrorHandler } from '../errors/ErrorHandler';
import { User } from '../models/User';
import { encryptPassword, matchPassword } from '../utils/Bcrypt';
import { Capitalize } from '../utils/Capitalize';
import { RoleService } from './RoleService';

export class UserService {
  @InjectModel(User)
  private static userModel: Model<User>;

  private static notShowFields = {
    isVerified: 0,
    password: 0,
    stateUser: 0,
  };

  static async getOne(id: string): Promise<User> {
    const user: User = await this.userModel
      .findOne(
        {
          $and: [{ _id: id }, { stateUser: stateUser.ACTIVE }],
        },
        { ...this.notShowFields }
      )
      .populate('role');

    if (!user || user.role.name === roles.ROOT) {
      throw new ErrorHandler(NOT_FOUND, 'User not found!');
    }

    return user;
  }

  static async getAll(): Promise<User[]> {
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
          stateUser: stateUser.ACTIVE,
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

  static async create(userData: User): Promise<User> {
    const { firstname, lastname, username, email, password } = userData;

    const userExist = await this.userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userExist) throw new ErrorHandler(BAD_REQUEST, 'User already exist!');

    const role = await RoleService.getOne({ name: roles.USER });
    const newUser = await this.userModel.create({
      ...userData,
      role: role._id,
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
  static async login(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      throw new ErrorHandler(NOT_FOUND, 'User not found!');
    }

    const isPassword = await matchPassword(password, user.password);

    if (!isPassword) {
      throw new ErrorHandler(
        BAD_REQUEST,
        'The username or password is not match'
      );
    }

    const dataUser = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
    };

    return dataUser;
  }

  static async update(id: string, userData: User): Promise<User> {
    const { firstname, lastname, username, email } = userData;

    const user = await this.userModel.findOne({
      $and: [{ username }, { email }],
    });

    if (user.id !== id) {
      throw new ErrorHandler(BAD_REQUEST, 'Email or Username already exist!');
    }

    const userUpdate = await this.userModel.findByIdAndUpdate(
      { _id: id },
      { firstname, lastname, username, email },
      { new: true }
    );

    const dataUser = {
      _id: userUpdate._id,
      firstname: userUpdate.firstname,
      lastname: userUpdate.lastname,
      username: userUpdate.username,
      email: userUpdate.email,
      createdAt: userUpdate.createdAt,
      updatedAt: userUpdate.updatedAt,
    };

    return dataUser;
  }

  static async updatePassword(
    id: string,
    passwordData: changePassword
  ): Promise<User> {
    const user = await this.getOne(id);

    const { oldPassword, newPassword, confirmNewPassword } = passwordData;
    const isPaswword = await matchPassword(oldPassword, user.password);

    if (isPaswword || newPassword !== confirmNewPassword) {
      throw new ErrorHandler(BAD_REQUEST, 'Password not matchs');
    }

    const userUpdate = await this.userModel.findByIdAndUpdate(
      { _id: id },
      { password: await encryptPassword(newPassword) },
      { new: true }
    );

    return userUpdate;
  }

  static async delete(id: string): Promise<void> {
    await this.getOne(id);
    await this.userModel.findByIdAndUpdate(
      { _id: id },
      { stateUser: stateUser.BANNED },
      { new: true }
    );
  }
}
