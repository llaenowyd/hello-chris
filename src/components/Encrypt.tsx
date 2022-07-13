import React, { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import classNames from 'classnames';

import { store } from '../store';
import { createKey, exportKey } from '../util/crypt';
import { splitEvery } from '../util/splitEvery';

import classes from './Encrypt.module.css';

const Encrypt: React.FC<{
  className?: string;
}> = ({ className }) => {
  const ciphertext = useRecoilValue(store.ciphertext);
  const [improperlyReuseNonce, setImproperlyReuseNonce] = useRecoilState(
    store.improperlyReuseNonce
  );
  const nonceBase64 = useRecoilValue(store.nonceBase64);
  const [plaintext, setPlaintext] = useRecoilState(store.plaintext);
  const [secretBase64, setSecretBase64] = useRecoilState(store.secretBase64);

  const createNewKey = async (): Promise<void> => {
    return createKey().then(exportKey).then(setSecretBase64);
  };

  const onPlaintextChange = (ev: ChangeEvent<HTMLTextAreaElement>): void => {
    setPlaintext(ev.target.value);
  };

  const toggleImproperlyReuseNonce = (): void => {
    setImproperlyReuseNonce((prev: boolean) => !prev);
  };

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
            IV: <span className={classes.key}>{nonceBase64}</span>
          </div>
          <div>
            Key: <span className={classes.key}>{secretBase64}</span>
          </div>
          Cryptogram:
          <br />
          <div className={classes.brick}>
            {splitEvery(ciphertext ?? '', 80).map((line, i) => (
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
