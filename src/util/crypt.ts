import { arrayBufferToBase64, base64ToArrayBuffer } from './base64';
import { bufferToString, stringToBuffer } from './buffers';

export const createNonce = (numBytes = 12): ArrayBuffer =>
  crypto.getRandomValues(new Uint8Array(numBytes));

export const createKey = () =>
  window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['decrypt', 'encrypt']
  );

export const exportKey = (key: CryptoKey): Promise<string> =>
  window.crypto.subtle.exportKey('raw', key).then(arrayBufferToBase64);

export const bufferToKey = async (buffer: ArrayBuffer): Promise<CryptoKey> =>
  window.crypto.subtle.importKey('raw', buffer, 'AES-GCM', true, [
    'decrypt',
    'encrypt',
  ]);

export const base64ToKey = async (keyStr: string): Promise<CryptoKey> =>
  Promise.resolve(base64ToArrayBuffer(keyStr)).then(bufferToKey);

export const decryptMessage = async (
  nonce: ArrayBuffer,
  key: CryptoKey,
  ciphertext: string
): Promise<string> =>
  Promise.resolve(base64ToArrayBuffer(ciphertext))
    .then((buffer) =>
      window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: nonce,
        },
        key,
        buffer
      )
    )
    .then(bufferToString);

export const encryptMessage = async (
  nonce: ArrayBuffer,
  key: CryptoKey,
  plaintext: string
): Promise<string> =>
  Promise.resolve(stringToBuffer(plaintext))
    .then((buffer) => {
      return window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: nonce,
        },
        key,
        buffer
      );
    })
    .then(arrayBufferToBase64);
