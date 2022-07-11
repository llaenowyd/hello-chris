import React, { useState } from 'react';
import classNames from 'classnames';

import { useDecryptEffect } from '../../hooks/useDecryptEffect';
import { useMarkdown } from '../../hooks/useMarkdown';
import Controls from './Controls';

import classes from './Reader.module.css';

const Reader: React.FC<{
  className?: string;
  cryptogram: string;
  secretKey: string;
  setSecretKey: (s: string) => void;
  plaintext: string;
  setPlaintext: (s: string) => void;
}> = ({
  className,
  cryptogram,
  secretKey,
  setSecretKey,
  plaintext,
  setPlaintext,
}) => {
  useDecryptEffect(cryptogram, secretKey, setPlaintext);

  const markdown = useMarkdown(plaintext);

  return (
    <div className={classNames(classes.container, className)}>
      <Controls secretKey={secretKey} setSecretKey={setSecretKey} />
      <div className={classes.markdown}>{markdown}</div>
    </div>
  );
};

export default Reader;
