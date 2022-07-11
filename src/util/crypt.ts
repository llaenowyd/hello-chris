import { algoParams } from './algoParams';
import { arrayBufferToBase64, base64ToArrayBuffer } from './base64';
import { bufferToString, stringToBuffer } from './buffers';

export const decryptMessage = async (
  key: CryptoKey,
  ciphertext: string
): Promise<string> =>
  Promise.resolve(base64ToArrayBuffer(ciphertext))
    .then((buffer) => window.crypto.subtle.decrypt(algoParams, key, buffer))
    .then(bufferToString);

export const encryptMessage = async (
  key: CryptoKey,
  plaintext: string
): Promise<string> =>
  Promise.resolve(stringToBuffer(plaintext))
    .then((buffer) => {
      return window.crypto.subtle.encrypt(algoParams, key, buffer);
    })
    .then(arrayBufferToBase64);

export const importKey = async (keyStr: string): Promise<CryptoKey> =>
  Promise.resolve(base64ToArrayBuffer(keyStr)).then((buffer) => {
    const uint8Array = new Uint8Array(buffer);
    return window.crypto.subtle.importKey('raw', uint8Array, algoParams, true, [
      'decrypt',
      'encrypt',
    ]);
  });
