export const splitEvery = (s: string, n: number): string[] => {
  const numLines = Math.ceil(s.length / n);

  const result = [];

  for (let i = 0; i < numLines; i++) {
    result.push(s.substring(i * n, (i + 1) * n));
  }

  return result;
};
