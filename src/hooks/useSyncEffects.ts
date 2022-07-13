// This is intended to substitute for an application of recoil-sync
// As recoil-sync seems a bit unstable

import { useCryptSyncEffect } from './useEncryptionSyncEffect';

export const useSyncEffects = () => {
  useCryptSyncEffect();
};
