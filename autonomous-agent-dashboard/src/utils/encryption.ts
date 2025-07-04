import CryptoJS from 'crypto-js';

const PASSPHRASE = import.meta.env.VITE_ENCRYPT_PASSPHRASE || '';

export function encrypt(text: string): string {
  if (!PASSPHRASE) return text; // fallback no encryption
  return CryptoJS.AES.encrypt(text, PASSPHRASE).toString();
}

export function decrypt(cipher: string): string {
  if (!PASSPHRASE) return cipher;
  const bytes = CryptoJS.AES.decrypt(cipher, PASSPHRASE);
  try {
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return cipher;
  }
}