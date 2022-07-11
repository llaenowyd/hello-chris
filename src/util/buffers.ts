export const stringToBuffer = (s: string): ArrayBuffer => {
  const mechanism = new TextEncoder();
  const buffer = mechanism.encode(s);
  return buffer;
};

export const bufferToString = (b: ArrayBuffer): string => {
  const mechanism = new TextDecoder();
  const s = mechanism.decode(b);
  return s;
};
