import React from 'react';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';

import { useMarkdown } from '../../hooks/useMarkdown';
import { store } from '../../store';

import Controls from './Controls';

import classes from './Reader.module.css';

const Reader: React.FC<{
  className?: string;
}> = ({ className }) => {
  const plaintext = useRecoilValue(store.plaintext);
  const markdown = useMarkdown(plaintext);

  return (
    <div className={classNames(classes.container, className)}>
      <Controls />
      <div className={classes.markdown}>{markdown}</div>
    </div>
  );
};

export default Reader;
