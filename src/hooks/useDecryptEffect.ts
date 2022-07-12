import { useEffect } from 'react';

import { decryptMessage, importKey } from '../util/crypt';

export const useDecryptEffect = (
  nonce: ArrayBuffer,
  cryptogram: string,
  secretKey: string,
  setPlaintext: (plaintext: string) => void
) => {
  useEffect(() => {
    setPlaintext('');

    if (!secretKey || !cryptogram) return;

    importKey(secretKey)
      .then((key) => decryptMessage(nonce, key, cryptogram))
      .then(setPlaintext)
      .catch((e) => {
        console.error(e?.toString?.(), e);
      });
  }, [secretKey, cryptogram]);
};
