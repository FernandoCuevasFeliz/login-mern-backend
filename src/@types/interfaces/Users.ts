interface User {
  _id?: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role?: Role;
  password?: string;
  isVerified?: boolean;
  stateUser?: string;
  googleId?: string;
  facebookId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface changePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface Payload {
  user: {
    id: string;
  };
}
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
