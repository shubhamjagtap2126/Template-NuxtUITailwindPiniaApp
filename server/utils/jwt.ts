import jwt from 'jsonwebtoken';
// import { uid } from 'uid';

export const generateTokens = (contact) => {
  const secret = useRuntimeConfig().JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET not found in runtime config');
  }

  const payload = {
    contact: String(contact),
    aud: 'authenticated',
    iat: Date.now(),
    // exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  try {
    const token = jwt.sign(payload, secret, { expiresIn: '7d' });
    return token;
  } catch (error) {
    console.error('JWT Signing Error:', error);
    return error;
  }
};

export const verifyToken = (token) => {
  const secret = useRuntimeConfig().JWT_SECRET;

  if (!secret) {
    return { valid: false, error: 'JWT_SECRET not configured' };
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return error;
  }
};
