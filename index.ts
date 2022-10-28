import * as flyd from 'flyd';

type Update<State> = (state: State) => Partial<State>;
type Store<State> = {
  states: flyd.Stream<State>;
  update: flyd.Stream<Update<State>>;
};

function createStore<S>(initialState: S): Store<S> {
  type Update = (state: S) => Partial<S>;

  const $updates = flyd.stream<Update>();
  const $state: flyd.Stream<S> = flyd.scan(
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

interface State {
  count: number;
  newCount: number;
}

const store = createStore<State>({
  count: 0,
  newCount: 1,
});

const CountActions = (_store: Store<State>) => ({
  increment: () => _store.update((state) => ({ count: state.count + 1 })),
});

store.states.map((state) => {
  // Render UI
  document.body.innerHTML = `<pre>${JSON.stringify(state, null, 4)}</pre>`;
});

const countActions = CountActions(store);
countActions.increment();

setTimeout(() => {
  countActions.increment();
}, 800);
