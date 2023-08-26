export type AuthRegisterType = {
  name: string;
  email: string;
  password: string;
};

export type AuthLoginType = Omit<AuthRegisterType, 'name'>;
