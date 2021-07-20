interface User {
  firstname: String;
  lastName: String;
  username: String;
  email: String;
  password?: String;
  isVerified?: Boolean;
  isActive?: Boolean;
  googleId?: String;
  facebookId?: String;
}
