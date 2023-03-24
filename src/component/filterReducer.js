

export const filterReducer = (expenseState, action) => {
    switch (action.type) {
     
        case "FILTER_STATUS":
            return{
                ...expenseState,
                statusFilterBy: action.payload
                }
        case "FILTER_SEARCH":
            return{
                ...expenseState,
                searchQuery: action.payload
            }
        case "FILTER_MINIMUM":
            return{
                ...expenseState,
                minimumPrice:action.payload
            }

        case "FILTER_MAXIMUM":
            return{
                ...expenseState,
                maximumPrice:action.payload
            }
        case "FILTER_FROM_DATE":
            return{
                ...expenseState,
                fromDate:action.payload
            }

        case "FILTER_TO_DATE":
            return{
                ...expenseState,
                toDate:action.payload
            }

        case "FILTER_MERCHANT":
            return{
                ...expenseState,
                merchant:action.payload
            }

        case "CLEAR_FILTERS":
            return{
                statusFilterBy:"",
                searchQuery:"",
                minimumPrice:"",
                maximumPrice:"",
                fromDate:"",
                toDate:""
            }
    
        default:
            return expenseState;
    }
}