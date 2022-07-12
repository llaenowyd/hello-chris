import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';

import { useEncryptEffect } from '../hooks/useEncryptEffect';
import { arrayBufferToBase64 } from '../util/base64';
import { createKey, exportKey } from '../util/crypt';
import { splitEvery } from '../util/splitEvery';

import classes from './Encrypt.module.css';

const Encrypt: React.FC<{
  className?: string;
  nonce: ArrayBuffer;
  setNonce: (buf: ArrayBuffer) => void;
  secretKey: string;
  setSecretKey: (s: string) => void;
  plaintext: string;
  setPlaintext: (s: string) => void;
  cryptogram: string;
  setCryptogram: (s: string) => void;
}> = ({
  className,
  nonce,
  setNonce,
  secretKey,
  setSecretKey,
  plaintext,
  setPlaintext,
  cryptogram,
  setCryptogram,
}) => {
  const [improperlyReuseNonce, setImproperlyReuseNonce] = useState(false);

  const createNewKey = async (): Promise<void> => {
    return createKey().then(exportKey).then(setSecretKey);
  };

  const onPlaintextChange = (ev: ChangeEvent<HTMLTextAreaElement>): void => {
    setPlaintext(ev.target.value);
  };

  const toggleImproperlyReuseNonce = (): void => {
    setImproperlyReuseNonce((prev) => !prev);
  };

  useEncryptEffect(
    plaintext,
    nonce,
    setNonce,
    secretKey,
    setCryptogram,
    improperlyReuseNonce
  );

  return (
    <div className={classNames(classes.container, className)}>
      <div className={classes.panels}>
        <div className={classes.documentPanel}>
          <textarea
            rows={35}
            cols={80}
            onChange={onPlaintextChange}
            defaultValue={plaintext}
          />
        </div>
        <div className={classes.buttonPanel}>
          <input type="button" value="New Key" onClick={createNewKey} />
          <div className={classes.checkboxCluster}>
            <input
              id="reuseNonceCheckbox"
              type="checkbox"
              defaultChecked={improperlyReuseNonce}
              onClick={toggleImproperlyReuseNonce}
            />
            <label
              className={classes.label}
              htmlFor="reuseNonceCheckbox"
              onClick={toggleImproperlyReuseNonce}
            >
              improperly reuse nonce
            </label>
          </div>
        </div>
        <div className={classes.cryptoPanel}>
          <div>
            IV:{' '}
            <span className={classes.key}>{arrayBufferToBase64(nonce)}</span>
          </div>
          <div>
            Key: <span className={classes.key}>{secretKey}</span>
          </div>
          Cryptogram:
          <br />
          <div className={classes.brick}>
            {splitEvery(cryptogram ?? '', 80).map((line, i) => (
              <React.Fragment key={i}>
                <span>{line}</span>
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encrypt;
