// import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import User, { createUser, getUserByEmail } from '../models/User';

// // ✅ Rejestracja użytkownika
// export const register = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     // ✅ Walidacja danych wejściowych
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: 'Name, email, and password are required' });
//     }

//     // ✅ Sprawdzenie, czy użytkownik istnieje
//     const existingUser = await getUserByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     // ✅ Hashowanie hasła
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // ✅ Tworzenie nowego użytkownika
//     const user = await createUser(name, email, hashedPassword, phone);

//     // ✅ Generowanie tokena JWT
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
//     res.status(201).json({ token });
//   } catch (error) {
//     console.error('❌ Registration error:', error);
//     res.status(500).json({ error: 'Registration failed' });
//   }
// };

// // ✅ Logowanie użytkownika
// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     const user = await getUserByEmail(email);
//     if (!user) return res.status(400).json({ error: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     console.error('❌ Login error:', error);
//     res.status(400).json({ error: 'Login failed' });
//   }
// };

// export const getUserProfile = async (req: Request, res: Response) => {
//   try {
//     // Pobieranie tokena z nagłówków
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ error: 'No token provided' });
//     }

//     // Dekodowanie tokena
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
//     const user = await User.findByPk(decoded.id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json({
//       email: user.email,
//       name: user.name,
//       phone: user.phone || '',
//     });
//   } catch (error) {
//     console.error('❌ Error fetching user profile:', error);
//     res.status(500).json({ error: 'Failed to fetch user profile' });
//   }
// };


// export const updateUserProfile = async (req: Request, res: Response) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ error: 'No token provided' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
//     const user = await User.findByPk(decoded.id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const { name, phone } = req.body;

//     // ✅ Aktualizujemy tylko przekazane pola
//     if (name !== undefined) user.name = name;
//     if (phone !== undefined) user.phone = phone;

//     await user.save();

//     res.json({
//       message: 'Profile updated successfully',
//       user: {
//         name: user.name,
//         phone: user.phone,
//       },
//     });
//   } catch (error) {
//     console.error('❌ Error updating user profile:', error);
//     res.status(500).json({ error: 'Failed to update profile' });
//   }
// };
import { Request, Response } from 'express';
import {
  registerUser,
  loginUser,
  getUserProfileService,
  updateUserProfileService,
} from '../services/userService';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    const { token } = await registerUser(name, email, password, phone);
    res.status(201).json({ token });
  } catch (error) {
    console.error('❌ Registration error:', error);
    const err = error as Error; // Rzutowanie na typ Error
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token } = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    console.error('❌ Login error:', error);
    const err = error as Error; // Rzutowanie na typ Error
    res.status(400).json({ error: err.message });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // Upewnij się, że middleware `protect` ustawia `req.user`
    const profile = await getUserProfileService(userId);
    res.json(profile);
  } catch (error) {
    console.error('❌ Error fetching user profile:', error);
    const err = error as Error; // Rzutowanie na typ Error
    res.status(500).json({ error: err.message });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // Upewnij się, że middleware `protect` ustawia `req.user`
    const updates = req.body;
    const updatedUser = await updateUserProfileService(userId, updates);
    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('❌ Error updating user profile:', error);
    const err = error as Error; // Rzutowanie na typ Error
    res.status(500).json({ error: err.message });
  }
};
