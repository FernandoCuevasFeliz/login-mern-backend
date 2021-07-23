import { BAD_REQUEST } from 'http-status-codes';
import { ErrorHandler } from '../errors/ErrorHandler';

export const Capitalize = (str: string): string => {
  if (!str) throw new ErrorHandler(BAD_REQUEST, 'Fields required');
  const arrStr = str.split(' ');

  let words = '';

  for (let i = 0; i < arrStr.length; i++) {
    words = arrStr[i].charAt(0).toUpperCase() + arrStr[i].slice(1) + ' ';
  }

  return words.trim();
};
