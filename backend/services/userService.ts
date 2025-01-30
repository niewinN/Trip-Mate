import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser, findUserById, updateUser } from '../repositories/userRepository';
import User from '../models/User';

export const registerUser = async (name: string, email: string, password: string, phone?: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, hashedPassword, phone);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return { user, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return { user, token };
};

export const getUserProfileService = async (userId: number) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
  };
};

export const updateUserProfileService = async (userId: number, updates: Partial<User>) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return updateUser(user, updates);
};
