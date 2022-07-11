import { useEffect, useState } from 'react';

import { importKey } from '../util/crypt';
import { MaybeCryptoKey } from '../types/maybe-cryptokey';

export const useSecretKey = (ks: string): MaybeCryptoKey => {
  const [key, setKey] = useState<CryptoKey>();

  useEffect(() => {
    setKey(undefined);

    if (!ks) {
      return;
    }

    importKey(ks)
      .then(setKey)
      .catch((e) => {
        console.error('error on importKey', e?.toString?.(), e);
      });
  }, [ks]);

  return key;
};
