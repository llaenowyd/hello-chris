import { useEffect } from 'react';
import { useRemark } from 'react-remark';

import { useLens } from './useLens';

export const useContentLens = (
  markdownContent: string
): [any, any, string, string] => {
  const [reactContent, setMarkdownSource] = useRemark();
  const [reactContent2, setMarkdownSource2] = useRemark();

  const [decryption, decryption2, encryption, pem] = useLens(markdownContent);

  useEffect(() => {
    setMarkdownSource(decryption);
  }, [decryption]);

  useEffect(() => {
    setMarkdownSource2(decryption2);
  }, [decryption2]);

  return [reactContent, reactContent2, encryption, pem];
};
