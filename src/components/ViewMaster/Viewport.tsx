import React from 'react';

import { useContent } from '../../hooks/useContent';

import classes from './Viewport.module.css';

const Viewport: React.FC = () => {
  const content = useContent();

  return <div className={classes.container}>{content}</div>;
};

export default Viewport;
