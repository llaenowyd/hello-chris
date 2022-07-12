import { useEffect } from 'react';

import { createNonce, encryptMessage, importKey } from '../util/crypt';

export const useEncryptEffect = (
  plaintext: string,
  nonce: ArrayBuffer,
  setNonce: (buf: ArrayBuffer) => void,
  secretKey: string,
  setCryptogram: (cryptogram: string) => void,
  improperlyReuseNonce: boolean
) => {
  useEffect(() => {
    setCryptogram('');

    if (!secretKey || !plaintext) return;

    const nextNonce = improperlyReuseNonce ? nonce : createNonce();

    importKey(secretKey)
      .then((key) => encryptMessage(nextNonce, key, plaintext))
      .then((cryptogram) => {
        setCryptogram(cryptogram);
        if (!improperlyReuseNonce) {
          setNonce(nextNonce);
        }
      })
      .catch((e) => {
        console.error(e?.toString?.(), e);
      });
  }, [secretKey, plaintext, improperlyReuseNonce]);
};
