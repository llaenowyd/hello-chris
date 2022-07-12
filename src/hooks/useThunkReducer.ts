import { Dispatch } from 'react';
import { createReducer } from 'react-use';
import thunk from 'redux-thunk';

export type ThunkReducer<S, A> = (
  reducer: (state: S, action: A) => S,
  initialState: S,
  initializer?: ((value: unknown) => S) | S
) => [S, Dispatch<A>];

export const useThunkReducer = createReducer(thunk);
