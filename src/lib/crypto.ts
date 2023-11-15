import CryptoJS from "crypto-js";

export function encrypt(password: string, secretKey: string) {
  const encrypted = CryptoJS.AES.encrypt(password, secretKey);
  return encrypted.toString();
}

export function decrypt(encryptedPassword: string, secretKey: string) {
  const decrypted = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
}
