import type { Store } from './state';

export const initialState = {
  count: 0,
};

export type CounterState = typeof initialState;

export const actions = (store: Store<typeof initialState>) => {
  return {
    increment: () =>
      store.update((state) => {
        return { count: state.count + 1 };
      }),
  };
};
