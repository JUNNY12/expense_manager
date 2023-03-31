import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  expenses: [],
  filter: ''
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    setFilter: (state, action) => {
        state.filter = action.payload;  
    },
  },
});

export const { setExpenses, setFilter } = expenseSlice.actions;
export default expenseSlice.reducer;
