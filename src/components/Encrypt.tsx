import React, { ChangeEvent } from 'react';
import classNames from 'classnames';

import { useEncryptEffect } from '../hooks/useEncryptEffect';
import { algoParams } from '../util/algoParams';
import { arrayBufferToBase64 } from '../util/base64';
import { encryptMessage, createKey, exportKey } from '../util/crypt';
import { splitEvery } from '../util/splitEvery';

import classes from './Encrypt.module.css';

const Encrypt: React.FC<{
  className?: string;
  secretKey: string;
  setSecretKey: (s: string) => void;
  plaintext: string;
  setPlaintext: (s: string) => void;
  cryptogram: string;
  setCryptogram: (s: string) => void;
}> = ({
  className,
  secretKey,
  setSecretKey,
  plaintext,
  setPlaintext,
  cryptogram,
  setCryptogram,
}) => {
  const doEncrypt = async (): Promise<void> => {
    return createKey().then(exportKey).then(setSecretKey);
  };

  const onPlaintextChange = (ev: ChangeEvent<HTMLTextAreaElement>): void => {
    setPlaintext(ev.target.value);
  };

  useEncryptEffect(plaintext, secretKey, setCryptogram);

  return (
    <div className={classNames(classes.container, className)}>
      <div className={classes.panels}>
        <div className={classes.documentPanel}>
          <textarea rows={35} cols={80} onChange={onPlaintextChange}>
            {plaintext}
          </textarea>
        </div>
        <div className={classes.buttonPanel}>
          <input type="button" value="Encrypt →" onClick={doEncrypt} />
        </div>
        <div className={classes.cryptoPanel}>
          <div>
            IV:{' '}
            <span className={classes.key}>
              {arrayBufferToBase64(algoParams.iv)}
            </span>
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
