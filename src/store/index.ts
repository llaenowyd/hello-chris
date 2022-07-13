import { atom, selector } from 'recoil';

import encryptedMarkdownContent from '../markdown/message-input';
import { arrayBufferToBase64, base64ToArrayBuffer } from '../util/base64';
import { bufferToKey } from '../util/crypt';

const pad = (buf: ArrayBuffer): ArrayBuffer => {
  // TBD improve on this
  const ua = Array.from(new Uint8Array(buf));
  while (ua.length < 32) {
    ua.push(1);
  }
  return new Uint8Array(ua);
};

const atoms = {
  ciphertext: atom({
    key: 'ciphertext',
    default: encryptedMarkdownContent,
  }),
  improperlyReuseNonce: atom({
    key: 'improperlyReuseNonce',
    default: false,
  }),
  nonce: atom({
    key: 'nonce',
    default: new Uint8Array([
      121, 14, 187, 152, 242, 83, 243, 41, 119, 232, 13, 241,
    ]) as ArrayBuffer,
  }),
  plaintext: atom({
    key: 'plaintext',
    default: '',
  }),
  secret: atom({
    key: 'secret',
    default: new Uint8Array([
      17, 147, 204, 54, 13, 125, 110, 24, 209, 146, 126, 118, 217, 229, 250,
      243, 190, 225, 51, 81, 124, 183, 250, 107, 238, 212, 200, 81, 80, 242, 15,
      80,
    ]) as ArrayBuffer,
  }),
  tabIndex: atom({
    key: 'tabIndex',
    default: 0,
  }),
};

const selectors = {
  mode: selector({
    key: 'mode',
    get: ({ get }) => {
      const tabIndex = get(atoms.tabIndex);

      return ['Reader', 'Encrypt'][tabIndex] ?? 'Reader';
    },
  }),
  nonceBase64: selector({
    key: 'nonceBase64',
    get: ({ get }) => {
      const nonce = get(atoms.nonce);

      return arrayBufferToBase64(nonce);
    },
  }),
  secretBase64: selector<string>({
    key: 'secretBase64',
    get: ({ get }) => {
      const secret = get(atoms.secret);

      return arrayBufferToBase64(secret);
    },
    set: ({ set }, newValue) => {
      set(atoms.secret, pad(base64ToArrayBuffer(newValue as string)));
    },
  }),
  secretKey: selector({
    key: 'secretKey',
    get: async ({ get }) => {
      try {
        return await bufferToKey(get(atoms.secret));
      } catch (e) {
        console.error(e);
      }
    },
  }),
};

export const store = { ...atoms, ...selectors };
