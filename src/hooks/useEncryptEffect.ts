import { useEffect } from 'react';

import { encryptMessage, importKey } from '../util/crypt';

export const useEncryptEffect = (
  plaintext: string,
  secretKey: string,
  setCryptogram: (cryptogram: string) => void
) => {
  useEffect(() => {
    setCryptogram('');

    if (!secretKey || !plaintext) return;

    importKey(secretKey)
      .then((key) => encryptMessage(key, plaintext))
      .then(setCryptogram)
      .catch((e) => {
        console.error(e?.toString?.(), e);
      });
  }, [secretKey, plaintext]);
};
