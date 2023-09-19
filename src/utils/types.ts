export interface RootState {
  user: UserStateType;
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

export interface UserStateType {
  user: { id: string; username: string; email: string; role: string } | null;
  isAuthUser: boolean;
}

export interface LoginUserType {
  email: string;
  password: string;
}
