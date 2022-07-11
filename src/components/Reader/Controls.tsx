import React from 'react';

import classes from './Controls.module.css';

const Controls: React.FC<{
  secretKey: string;
  setSecretKey: (s: string) => void;
}> = ({ secretKey, setSecretKey }) => {
  return (
    <div className={classes.container}>
      🔑
      <input
        type="text"
        value={secretKey}
        onChange={(ev) => setSecretKey(ev.target.value)}
      />
    </div>
  );
};

export default Controls;
