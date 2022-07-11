import React from 'react';

import classes from './Controls.module.css';

const Controls: React.FC<{
  privateKey: string;
  setPrivateKey: (s: string) => void;
}> = ({ privateKey, setPrivateKey }) => {
  return (
    <div className={classes.container}>
      🔑
      <input
        type="text"
        value={privateKey}
        onChange={(ev) => setPrivateKey(ev.target.value)}
      />
    </div>
  );
};

export default Controls;
