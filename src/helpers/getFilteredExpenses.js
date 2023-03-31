import { FILTER_ACTIONS } from "../state/actions/action";

export const getFilteredExpenses = (expenses, filter) => {
    switch (filter) {
        case FILTER_ACTIONS.FILTER_ALL:
            const keys = ['date', 'merchant', 'total', 'status', 'comment'];
            
            return expenses.filter((expense) =>
                keys.some((key) => expense[key].toLowerCase().includes(filter.toLowerCase())));

        case FILTER_ACTIONS.FILTER_MERCHANT:
            return expenses.filter((expense) => expense.merchant === filter);

        case FILTER_ACTIONS.FILTER_STATUS:
            return expenses.filter((expense) => expense.status === filter);

        case FILTER_ACTIONS.FILTER_DATE:
            return expenses.filter((expense) => expense.date === filter);

        case FILTER_ACTIONS.FILTER_MIN_MAX:
            return expenses.filter(
                (expense) => expense.amount >= filter.min && expense.amount <= filter.max);

        case FILTER_ACTIONS.CLEAR_FILTER:
            return expenses;

        default:
            return expenses;
    }
}