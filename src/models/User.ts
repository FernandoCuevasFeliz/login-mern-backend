import { Schema, model } from 'mongoose';
import { stateUser } from '../enums';

const UserSchema = new Schema<User>(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: String,

    role: {
      type: Schema.Types.ObjectId,
      ref: 'role',
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    stateUser: {
      type: String,
      default: stateUser.ACTIVE,
    },

    googleId: String,

    facebookId: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model<User>('user', UserSchema);
