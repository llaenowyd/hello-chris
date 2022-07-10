import React from 'react';
import classNames from 'classnames';

import FocusWheel from './FocusWheel';
import Viewport from './Viewport';

import classes from './ViewMaster.module.css';

// https://en.wikipedia.org/wiki/View-Master
// https://www.museumofplay.org/toys/view-master/
const ViewMaster: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div className={classNames(classes.container, className)}>
      <FocusWheel />
      <Viewport />
    </div>
  );
};

export default ViewMaster;
