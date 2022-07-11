import { useEffect } from 'react';
import { useRemark } from 'react-remark';

export const useMarkdown = (markdownText: string): any => {
  const [markdownRendering, setMarkdownText] = useRemark();

  useEffect(() => {
    setMarkdownText(markdownText);
  }, [markdownText]);

  return markdownRendering;
};
