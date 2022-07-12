import { useState } from 'react';

const initialNonce = new Uint8Array([
  121, 14, 187, 152, 242, 83, 243, 41, 119, 232, 13, 241,
]);

const useNonce = (): [ArrayBuffer, (buf: ArrayBuffer) => void] => {
  const [nonce, setNonce] = useState<ArrayBuffer>(initialNonce);

  return [nonce, setNonce];
};

export default useNonce;
