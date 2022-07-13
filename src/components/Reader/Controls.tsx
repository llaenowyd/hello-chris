import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { store } from '../../store';
import { arrayBufferToBase64 } from '../../util/base64';

import classes from './Controls.module.css';

const Controls: React.FC = () => {
  const nonce = useRecoilValue(store.nonce);
  const [secretBase64, setSecretBase64] = useRecoilState(store.secretBase64);

  const onChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>): void => {
      try {
        setSecretBase64(ev.target.value);
      } catch (e) {
        console.error((e as Error)?.message ?? 'Error');
      }
    },
    [setSecretBase64]
  );

  return (
    <div className={classes.container}>
      🔑
      <input type="text" value={secretBase64} onChange={onChange} />
      <div className={classes.nonce}>Nonce: {arrayBufferToBase64(nonce)}</div>
    </div>
  );
};

export default Controls;
