import React from 'react';

import { useContent } from '../../hooks/useContent';

import classes from './Viewport.module.css';

const Viewport: React.FC<{ privateKey: string; cryptogram: string }> = ({
  privateKey,
  cryptogram,
}) => {
  const [content] = useContent(privateKey, cryptogram);

  return (
    <div className={classes.container}>
      <div>{content}</div>
    </div>
  );
};

export default Viewport;
