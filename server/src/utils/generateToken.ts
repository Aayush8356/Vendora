import jwt from 'jsonwebtoken';

export const generateToken = (payload: { id: string; email: string; role: string }): string => {
  return jwt.sign(
    payload, 
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};