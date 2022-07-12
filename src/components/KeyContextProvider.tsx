import React, { ReactNode } from 'react';

import KeyContext, {
  KeyContextAction,
  KeyContextState,
  defaultKeyContextStateValue,
  keyContextReducer,
} from '../context/key-context';
import { ThunkReducer, useThunkReducer } from '../hooks/useThunkReducer';

import KeyContextLoader from './KeyContextLoader';

const useKeyContextReducer = useThunkReducer as ThunkReducer<
  KeyContextState,
  KeyContextAction
>;

const KeyContextProvider: React.FC<{ children: ReactNode | ReactNode[] }> = ({
  children,
}) => {
  const [state, dispatch] = useKeyContextReducer(
    keyContextReducer,
    defaultKeyContextStateValue
  );

  return (
    <KeyContext.Dispatch.Provider value={dispatch}>
      <KeyContext.State.Provider value={state}>
        <KeyContextLoader>{children}</KeyContextLoader>
      </KeyContext.State.Provider>
    </KeyContext.Dispatch.Provider>
  );
};

export default KeyContextProvider;
