import React, { useState } from 'react';
import classNames from 'classnames';

import { useDecryptEffect } from '../../hooks/useDecryptEffect';
import { useMarkdown } from '../../hooks/useMarkdown';
import Controls from './Controls';

import classes from './Reader.module.css';

const Reader: React.FC<{
  className?: string;
  cryptogram: string;
  nonce: ArrayBuffer;
  secretKey: string;
  setSecretKey: (s: string) => void;
  plaintext: string;
  setPlaintext: (s: string) => void;
}> = ({
  className,
  cryptogram,
  nonce,
  secretKey,
  setSecretKey,
  plaintext,
  setPlaintext,
}) => {
  useDecryptEffect(nonce, cryptogram, secretKey, setPlaintext);

  const markdown = useMarkdown(plaintext);

  return (
    <div className={classNames(classes.container, className)}>
      <Controls
        secretKey={secretKey}
        setSecretKey={setSecretKey}
        nonce={nonce}
      />
      <div className={classes.markdown}>{markdown}</div>
    </div>
  );
};

export default Reader;
