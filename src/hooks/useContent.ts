import { useEffect } from 'react';
import { useRemark } from 'react-remark';

import { useReader } from './useReader';

export const useContent = (privateKey: string, cryptogram: string): [any] => {
  const [reactContent, setMarkdownSource] = useRemark();

  const [decryption] = useReader(privateKey, cryptogram);

  useEffect(() => {
    setMarkdownSource(decryption);
  }, [decryption]);

  return [reactContent];
};
