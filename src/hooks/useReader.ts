import { useEffect, useState } from 'react';

import { decryptMessage } from '../util/crypt';

import { usePrivateKey } from './usePrivateKey';

export const useReader = (privateKey: string, subject: string): [string] => {
  const [decryption, setDecryption] = useState<string>('');
  const key = usePrivateKey(privateKey);

  useEffect(() => {
    if (privateKey) {
      setDecryption('');
    }
  }, [privateKey]);

  useEffect(() => {
    if (!key || !subject) {
      setDecryption('');
      return;
    }

    setDecryption('');

    decryptMessage(key, subject)
      .then(setDecryption)
      .catch((e) => {
        console.error('error during decryption', e?.toString?.(), e);
        setDecryption('');
      });
  }, [key, subject]);

  useEffect(() => {
    if (decryption) {
      console.log('decryption', decryption);
    }
  }, [decryption]);

  return [decryption];
};
