import { useEffect, useState } from 'react';

import { importKey } from '../util/crypt';
import { MaybeCryptoKey } from '../types/maybe-cryptokey';

export const usePrivateKey = (ks: string): MaybeCryptoKey => {
  const [key, setKey] = useState<CryptoKey>();

  useEffect(() => {
    if (!ks) {
      setKey(undefined);
      return;
    }

    console.log('ks', ks);

    importKey(ks)
      .then(setKey)
      .catch((e) => {
        console.error('error on importKey', e?.toString?.(), e);
      });
  }, [ks]);

  return key;
};
