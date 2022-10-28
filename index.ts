import { createStore } from './state';
import * as counter from './counter';

type State = {} & counter.CounterState;

const store = createStore<State>({
  ...counter.initialState,
});

const countActions = counter.actions(store);
store.states.map((state) => {
  // Render UI
  document.body.innerHTML = `<pre>${JSON.stringify(state, null, 4)}</pre>`;
});

countActions.increment();

setTimeout(() => {
  countActions.increment();
}, 800);
