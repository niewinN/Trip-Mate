// import pool from '../config/db';

// export interface User {
//   id?: number;
//   name: string;
//   email: string;
//   password: string;
//   phone?: string;
// }

// export const createUser = async (user: User) => {
//   const { name, email, password, phone } = user;
//   const result = await pool.query(
//     'INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *',
//     [name, email, password, phone]
//   );
//   return result.rows[0];
// };

// export const findUserByEmail = async (email: string) => {
//   const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//   return result.rows[0];
// };
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Definicja modelu użytkownika
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true, // Włącz automatyczne zarządzanie createdAt i updatedAt
  }
);

// Funkcja do tworzenia użytkownika
export const createUser = async (name: string, email: string, password: string, phone?: string) => {
  try {
    const user = await User.create({ name, email, password, phone });
    return user;
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`);
  }
};

// Funkcja do pobierania użytkownika po e-mailu
export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user by email: ${error}`);
  }
};

// Funkcja do pobierania wszystkich użytkowników
export const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error(`Failed to fetch all users: ${error}`);
  }
};

export default User;
