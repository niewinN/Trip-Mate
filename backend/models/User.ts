import pool from '../config/db';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export const createUser = async (user: User) => {
  const { name, email, password, phone } = user;
  const result = await pool.query(
    'INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, password, phone]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};
