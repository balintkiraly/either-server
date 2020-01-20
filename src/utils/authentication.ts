import { sign, verify } from 'jsonwebtoken';
import { Context } from './context';

export const APP_SECRET = 'appsecret321';

interface Token {
  userID: string;
}

export const getUserID = (context: Context): string => {
  const Authorization = context.request.get('Authorization');
  if (!Authorization) throw new Error('');

  const token = Authorization.replace('Bearer ', '');
  const verifiedToken = verify(token, APP_SECRET) as Token;
  return verifiedToken.userID;
};

export const generateJWToken = (userID: string) => sign({ userID }, APP_SECRET);
