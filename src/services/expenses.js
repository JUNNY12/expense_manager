import { api } from ".";

let auth = "XjYkpXitEYa1c96iQxPaAzhMdvVKPRrA88D3Qno5";

export const expenses = api.injectEndpoints({
  endpoints: (builder) => ({

    //Get Expenses
    getExpenses: builder.query({
      query: (uid) => ({
        url: `users/${uid}/expenses.json?auth=${auth}`,
      }),
      providesTags: ["Expenses"],
    }),

    //Add Expense
    addExpense: builder.mutation({
      query: ({ body, uid }) => ({
        url: `users/${uid}/expenses.json?auth=${auth}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Expenses"],
    }),

    //Delete Expense
    deleteExpense: builder.mutation({
      query: ({ id, uid }) => ({
        url: `users/${uid}/expenses/${id}.json?auth=${auth}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenses"],
    }),

    //Update Expense
    updateExpense: builder.mutation({
      query: ({ id, uid, body }) => ({
        url: `users/${uid}/expenses/${id}.json?auth=${auth}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Expenses"],
    }),
  }),
});

export const { useGetExpensesQuery, useAddExpenseMutation , useDeleteExpenseMutation, useUpdateExpenseMutation} = expenses;
