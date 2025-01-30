import User from '../models/User';

export const findUserByEmail = async (email: string) => {
  return User.findOne({ where: { email } });
};

export const createUser = async (name: string, email: string, password: string, phone?: string) => {
  return User.create({ name, email, password, phone });
};

export const findUserById = async (id: number) => {
  return User.findByPk(id);
};

export const updateUser = async (user: User, updates: Partial<User>) => {
  Object.assign(user, updates);
  await user.save();
  return user;
};
