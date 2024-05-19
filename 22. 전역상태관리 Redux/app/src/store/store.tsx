import { configureStore, Dispatch } from '@reduxjs/toolkit';
import { counterSlice, amountSlice, incrementByAmount } from './CounterSlice';

import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

const loggerMiddleware: Middleware =
  (store: MiddlewareAPI) => (next) => (action) => {
    console.log('Dispatching action:', action);
    console.log('State before action:', store.getState());
    const result = next(action);
    console.log('State after action:', store.getState());
    return result;
  };

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    amount: amountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type Dispatcher = typeof store.dispatch;

export const incrementAsync = () => (dispatch: Dispatch) => {
  const { amount } = store.getState();
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 2000);
};

export const incrementOdd = () => (dispatch: Dispatch) => {
  const { amount } = store.getState();
  console.log(amount);
  if (amount % 2 !== 0) {
    dispatch(incrementByAmount(amount));
  }
};
