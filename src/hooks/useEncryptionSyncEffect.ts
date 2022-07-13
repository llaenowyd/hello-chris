// This is intended to substitute for an application of recoil-sync
// As recoil-sync seems a bit unstable

import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { store } from '../store';
import { createNonce, decryptMessage, encryptMessage } from '../util/crypt';

export const useDecryptSyncEffect = () => {
  const mode = useRecoilValue(store.mode) as string;

  const nonce = useRecoilValue(store.nonce) as ArrayBuffer;
  const secretKey = useRecoilValue(store.secretKey);

  const ciphertext = useRecoilValue(store.ciphertext);
  const setPlaintext = useSetRecoilState(store.plaintext);

  useEffect(() => {
    if (mode !== 'Reader' || !secretKey) return;

    decryptMessage(nonce, secretKey, ciphertext)
      .then(setPlaintext)
      .catch((e) => {
        console.error(e);
        setPlaintext('');
      });
  }, [ciphertext, mode, nonce, secretKey, setPlaintext]);
};

export const useEncryptSyncEffect = () => {
  const mode = useRecoilValue(store.mode) as string;

  const improperlyReuseNonce = useRecoilValue(store.improperlyReuseNonce);
  const [nonce, setNonce] = useRecoilState(store.nonce);
  const secretKey = useRecoilValue(store.secretKey) as CryptoKey;

  const plaintext = useRecoilValue(store.plaintext);
  const setCiphertext = useSetRecoilState(store.ciphertext);

  useEffect(() => {
    if (mode !== 'Encrypt') return;

    const nextNonce = improperlyReuseNonce ? nonce : createNonce();

    if (!improperlyReuseNonce) {
      setNonce(nextNonce); // TBD clarify chain of effect
    }

    encryptMessage(nextNonce, secretKey, plaintext)
      .then(setCiphertext)
      .catch((e) => {
        console.error(e);
      });
  }, [plaintext, mode, secretKey, setCiphertext]); // TBD should include nonce
};

export const useCryptSyncEffect = () => {
  useDecryptSyncEffect();
  useEncryptSyncEffect();
};
