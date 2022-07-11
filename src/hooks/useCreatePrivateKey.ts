import { useEffect, useState } from 'react';

import { MaybeCryptoKey } from '../types/maybe-cryptokey';

const createKey = () =>
  window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['decrypt', 'encrypt']
  );

export const useCreatePrivateKey = (): MaybeCryptoKey => {
  const [privateKey, setPrivateKey] = useState<MaybeCryptoKey>();

  useEffect(() => {
    createKey()
      .then(setPrivateKey)
      .catch((e) => {
        console.error(e?.toString?.(), e);
      });
  }, []);

  return privateKey;
};
