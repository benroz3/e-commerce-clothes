export interface RootState {
  navModal: {
    showNavModal: boolean;
  };
}

export interface UserType {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginUserType {
  email: string;
  password: string;
}
