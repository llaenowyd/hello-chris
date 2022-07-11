import React from 'react';
import classNames from 'classnames';

import { encryptMessage, createKey, exportKey } from '../../util/crypt';
import { splitEvery } from '../../util/splitEvery';

import classes from './Create.module.css';

const Create: React.FC<{
  className?: string;
  privateKey: string;
  setPrivateKey: (s: string) => void;
  plaintext: string;
  setPlaintext: (s: string) => void;
  cryptogram: string;
  setCryptogram: (s: string) => void;
}> = ({
  className,
  privateKey,
  setPrivateKey,
  plaintext,
  setPlaintext,
  cryptogram,
  setCryptogram,
}) => {
  const doEncrypt = () => {
    createKey()
      .then(async (key) => ({ key, keyText: await exportKey(key) }))
      .then(({ key, keyText }) => {
        setPrivateKey(keyText);
        return key;
      })
      .then((key) => encryptMessage(key, plaintext))
      .then(setCryptogram);
  };

  return (
    <div className={classNames(classes.container, className)}>
      <div className={classes.panels}>
        <div className={classes.documentPanel}>
          <textarea
            rows={35}
            cols={80}
            onChange={(ev) => setPlaintext(ev.target.value)}
          >
            {plaintext}
          </textarea>
        </div>
        <div className={classes.buttonPanel}>
          <input type="button" value="Encrypt" onClick={doEncrypt} />
        </div>
        <div className={classes.cryptoPanel}>
          <div>
            Key: <span className={classes.key}>{privateKey}</span>
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

export default Create;
