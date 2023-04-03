import { createSlice } from "@reduxjs/toolkit";
// import { FILTER_ACTIONS } from "../actions/action";
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
    clearFilter: (state) => {
        state.filter = '';
    },
  },
});

export const { setExpenses, setFilter , clearFilter} = expenseSlice.actions;
export default expenseSlice.reducer;
