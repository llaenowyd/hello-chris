import { useEffect, useState } from 'react';

import { arrayBufferToBase64 } from '../util/base64';
import { decryptMessage, encryptMessage } from '../util/crypt';

import { useCreatePrivateKey } from './useCreatePrivateKey';
import { useReader } from './useReader';

const makePem = async (key: CryptoKey): Promise<string> =>
  window.crypto.subtle.exportKey('raw', key).then(arrayBufferToBase64);

export const useLens = (subject: string): [string, string, string, string] => {
  const [decryption, setDecryption] = useState<string>('');
  const [encryption, setEncryption] = useState<string>('');
  const [pem, setPem] = useState<string>('');
  const key = useCreatePrivateKey();
  const [decryption2] = useReader(pem, encryption);

  useEffect(() => {
    if (!key) {
      setPem('');
      return;
    }

    console.log('key', key);

    makePem(key)
      .then(setPem)
      .catch((e) => {
        console.error(e?.toString?.(), e);
      });
  }, [key]);

  useEffect(() => {
    if (!key || !subject) {
      setEncryption('');
      return;
    }

    encryptMessage(key, subject)
      .then(setEncryption)
      .catch((e) => {
        console.error('error during encryption', e?.toString?.(), e);
        setEncryption('');
      });
  }, [key, subject]);

  useEffect(() => {
    if (!key || !encryption) {
      setDecryption('');
      return;
    }

    decryptMessage(key, encryption)
      .then(setDecryption)
      .catch((e) => {
        console.error('error during decryption', e?.toString?.(), e);
        setDecryption('');
      });
  }, [key, encryption]);

  useEffect(() => {
    if (encryption) {
      console.log('encryption', encryption);
    }
  }, [encryption]);

  useEffect(() => {
    if (decryption) {
      console.log('decryption', decryption);
    }
  }, [decryption]);

  useEffect(() => {
    if (decryption2) {
      console.log('decryption2', decryption2);
    }
  }, [decryption2]);

  useEffect(() => {
    if (pem) {
      console.log('pem', pem);
    }
  }, [pem]);

  return [decryption, decryption2, encryption, pem];
};
