import { createContext, Dispatch } from 'react';

import { createNonce } from '../util/crypt';

// types

export enum KeyContextActionType {
  GENERATE_NONCE = 'GENERATE_NONCE',
  SET_SECRET = 'SET_SECRET',
}

export type KeyContextState = {
  iv?: ArrayBuffer;
  secret?: ArrayBuffer;
};

export type KeyContextAction = {
  type: KeyContextActionType;
  payload?: unknown;
};

export type KeyContextDispatch = Dispatch<KeyContextAction>;

export type KeyContextValue = [KeyContextState, KeyContextDispatch];

export type KeyContextReducer = (
  state: KeyContextState,
  action: KeyContextAction
) => KeyContextState;

type ReducerMap = Record<KeyContextActionType, KeyContextReducer>;

// create Context

export const defaultKeyContextDispatchValue: KeyContextDispatch = () => {};
export const defaultKeyContextStateValue: KeyContextState = {};

const KeyContext = {
  Dispatch: createContext<KeyContextDispatch>(defaultKeyContextDispatchValue),
  State: createContext<KeyContextState>(defaultKeyContextStateValue),
};

export default KeyContext;

// define reducers

const reducerMap: ReducerMap = {
  [KeyContextActionType.GENERATE_NONCE]: (state) => {
    return { ...state, iv: createNonce() };
  },
  [KeyContextActionType.SET_SECRET]: (state, { payload }) => {
    return { ...state, payload };
  },
};

export const keyContextReducer: KeyContextReducer = (state, action) => {
  const reducer = reducerMap[action?.type];

  return reducer ? reducer(state, action) : state;
};
