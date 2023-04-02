import { FILTER_ACTIONS } from "../state/actions/action";


export const getFilteredExpenses = (expenses, filter) => {
    const { type, payload } = filter;

    switch (type) {
        case FILTER_ACTIONS.FILTER_ALL:
            const keys = ['date', 'merchant', 'total', 'status', 'comment'];

            return expenses.filter((expense) =>
                keys.some((key) => expense[key].toLowerCase().includes(payload.toLowerCase())));

        case FILTER_ACTIONS.FILTER_MERCHANT:
            return expenses.filter((expense) => expense.merchant === payload);

        case FILTER_ACTIONS.FILTER_STATUS:
            return expenses.filter((expense) => expense.status === payload);

        case FILTER_ACTIONS.FILTER_FROM_DATE:
            return expenses.filter((expense) => new Date ( expense.date ).getTime() >= new Date ( payload ).getTime());

        case FILTER_ACTIONS.FILTER_TO_DATE:
            return expenses.filter((expense) => new Date(expense.date).getTime() <= new Date(payload).getTime());

        case FILTER_ACTIONS.FILTER_MIN:
            return expenses.filter((expense) => Number(expense.total) >= Number(payload));

        case FILTER_ACTIONS.FILTER_MAX:
            return expenses.filter((expense) => Number(expense.total) <= Number(payload));

        case FILTER_ACTIONS.CLEAR_FILTER:
            return expenses;

        default:
            return expenses;
    }
}