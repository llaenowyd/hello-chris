import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useContentLens } from '../../hooks/useContentLens';
import { splitEvery } from '../../util/splitEvery';

import classes from './Create.module.css';

const Create: React.FC<{
  className?: string;
  privateKey: string;
  setPrivateKey: (s: string) => void;
  plaintext: string;
  setPlaintext: (s: string) => void;
  setCryptogram: (s: string) => void;
}> = ({
  className,
  privateKey,
  setPrivateKey,
  plaintext,
  setPlaintext,
  setCryptogram,
}) => {
  const [encrypted, setEncrypted] = useState(false);

  const [decryption, decryption2, encryption, key] = useContentLens(plaintext);

  useEffect(() => {
    if (plaintext) {
      setEncrypted(false);
      setPrivateKey('');
    }
  }, [plaintext]);

  useEffect(() => {
    if (encrypted) {
      setPrivateKey(key);
      setCryptogram(encryption);
    }
  }, [encrypted]);

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
          <input
            type="button"
            value="Encrypt"
            onClick={() => setEncrypted(true)}
            disabled={encrypted}
          />
        </div>
        <div className={classes.cryptoPanel}>
          <div>
            Key: <span className={classes.key}>{encrypted ? key : ''}</span>
          </div>
          Cryptogram:
          <br />
          <div className={classes.brick}>
            {splitEvery(encrypted ? encryption : '', 80).map((line, i) => (
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
