import { useEffect } from 'react';
import { useRemark } from 'react-remark';

import markdownContent from '../markdown/message.md';

export const useContent = () => {
  const [reactContent, setMarkdownSource] = useRemark();

  useEffect(() => {
    setMarkdownSource(markdownContent);
  }, []);

  return reactContent;
};
