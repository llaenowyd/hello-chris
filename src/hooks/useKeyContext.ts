import { useContext, useMemo } from 'react';

import KeyContext, {
  KeyContextActionType,
  KeyContextDispatch,
} from '../context/key-context';
import { createKey } from '../util/crypt';

export const useKeyContextState = () => {
  const state = useContext(KeyContext.State);

  return state;
};

export const useKeyContextDispatch = () => {
  const dispatch = useContext(KeyContext.Dispatch);

  const functions = useMemo(
    () => ({
      generateNonce: () =>
        dispatch({ type: KeyContextActionType.GENERATE_NONCE }),
      generateKey: () => async (dispatch: KeyContextDispatch) => {
        const secret = await createKey();
        dispatch({
          type: KeyContextActionType.SET_SECRET,
          payload: { secret },
        });
      },
    }),
    [dispatch]
  );

  return functions;
};
