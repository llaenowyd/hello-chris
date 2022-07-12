import React, { ReactNode, useEffect } from 'react';

import { useKeyContextDispatch } from '../hooks/useKeyContext';

const KeyContextLoader: React.FC<{ children: ReactNode | ReactNode[] }> = ({
  children,
}) => {
  const { generateKey, generateNonce } = useKeyContextDispatch();

  useEffect(() => {
    generateKey();
    generateNonce();
  }, []);

  return <>{children}</>;
};

export default KeyContextLoader;
