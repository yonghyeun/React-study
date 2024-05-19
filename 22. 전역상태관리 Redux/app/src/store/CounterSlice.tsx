import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

const SliceOptions = {
  name: 'counter',
  initialState,
  reducers: {
    increment: (state: CounterState) => {
      state.value += 1;
    },
    decrement: (state: CounterState) => {
      state.value -= 1;
    },
    incrementByAmount: (state: CounterState, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
};

export const counterSlice = createSlice(SliceOptions);
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const amountSlice = createSlice({
  name: 'amount',
  initialState: 2,
  reducers: {
    changeAmount: (state, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

export const { changeAmount } = amountSlice.actions;
