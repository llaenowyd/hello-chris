import { useState } from 'react';

const useNonce = (): ArrayBuffer => {
  const [nonce] = useState<ArrayBuffer>(() =>
    crypto.getRandomValues(new Uint8Array(12))
  );

  return nonce;
};

export default useNonce;
