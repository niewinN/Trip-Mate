import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../models/User';

// ✅ Rejestracja użytkownika
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    // ✅ Walidacja danych wejściowych
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // ✅ Sprawdzenie, czy użytkownik istnieje
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // ✅ Hashowanie hasła
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password: hashedPassword, phone });

    // ✅ Generowanie tokena JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// ✅ Logowanie użytkownika
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(400).json({ error: 'Login failed' });
  }
};