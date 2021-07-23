interface User {
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

interface Payload {
  user: {
    id: string;
  };
}
