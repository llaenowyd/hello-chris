import React from 'react';
import { arrayBufferToBase64 } from '../../util/base64';

import classes from './Controls.module.css';

const Controls: React.FC<{
  secretKey: string;
  setSecretKey: (s: string) => void;
  nonce: ArrayBuffer;
}> = ({ secretKey, setSecretKey, nonce }) => {
  return (
    <div className={classes.container}>
      🔑
      <input
        type="text"
        value={secretKey}
        onChange={(ev) => setSecretKey(ev.target.value)}
      />
      <div className={classes.nonce}>Nonce: {arrayBufferToBase64(nonce)}</div>
    </div>
  );
};

export default Controls;
