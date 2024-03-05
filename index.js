const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
  const type = action.type;
  if (type === "incrementBy2") return { counter: state.counter + 2 };
  if (type === "decrementBy2") return { counter: state.counter - 2 };
  return {
    counter: 0,
  };
};

const store = redux.createStore(counterReducer);
console.log("initial state", store.getState());
const counterSubscribe = store.subscribe(() => {
  console.log("Updated state", store.getState());
});

store.dispatch({ type: "incrementBy2" });
store.dispatch({ type: "incrementBy2" });
store.dispatch({ type: "incrementBy2" });
store.dispatch({ type: "decrementBy2" });
counterSubscribe();
