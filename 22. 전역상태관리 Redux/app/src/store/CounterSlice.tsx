import {
  createSlice,
  PayloadAction,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

const SliceOptions: CreateSliceOptions<CounterState> = {
  name: 'counter',
  initialState,
  reducers: {
    increament: (state) => {
      state.value += 1;
    },
    decreament: (state) => {
      state.value -= 1;
    },
    increamentByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
};

export const counterSlice = createSlice(SliceOptions);

export const { increament, decreament, increamentByAmount } =
  counterSlice.actions;
