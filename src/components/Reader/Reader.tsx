import React, { useState } from 'react';
import classNames from 'classnames';

import Controls from './Controls';
import Viewport from './Viewport';

import classes from './Reader.module.css';

const Reader: React.FC<{
  className?: string;
  privateKey: string;
  setPrivateKey: (s: string) => void;
  cryptogram: string;
}> = ({ className, privateKey, setPrivateKey, cryptogram }) => {
  return (
    <div className={classNames(classes.container, className)}>
      <Controls privateKey={privateKey} setPrivateKey={setPrivateKey} />
      <Viewport privateKey={privateKey} cryptogram={cryptogram} />
    </div>
  );
};

export default Reader;
