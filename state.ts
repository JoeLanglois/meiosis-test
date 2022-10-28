import { stream, scan } from 'flyd';
export type Update<State> = (state: State) => Partial<State>;

export type Store<State> = {
  states: flyd.Stream<State>;
  update: flyd.Stream<Update<State>>;
};

export function createStore<S>(initialState: S): Store<S> {
  type Update = (state: S) => Partial<S>;

  const $updates = stream<Update>();
  const $state: flyd.Stream<S> = scan(
    (acc: S, updater: Update) => {
      return {
        ...acc,
        ...updater(acc),
      };
    },
    initialState,
    $updates
  );

  return {
    states: $state,
    update: $updates,
  };
}
