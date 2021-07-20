import { Schema, model } from 'mongoose';

const RoleSchema = new Schema<Role>(
  {
    name: {
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Role = model<Role>('role', RoleSchema);
