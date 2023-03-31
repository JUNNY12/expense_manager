import Filter from './Filter'
import { useEffect} from 'react'
import Table from './Table'
import { useGetExpensesQuery } from '../../services/expenses'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { setExpenses } from '../../state/slices/expenseSlice'
import { useDispatch} from 'react-redux'




const Content = () => {
    const [user] = useAuthState(auth)
    let uid = user?.uid

    const { data } = useGetExpensesQuery(uid)
    const dispatch = useDispatch()

    let arrayofExpense =[]
    for(let key in data){
        arrayofExpense.push({...data[key], id:key})
    }

    useEffect(() => {
        dispatch(setExpenses(arrayofExpense))
    }, [data, dispatch])


    return (
        <div>
            <div className='contentWrapper'>
                <div>
                    <Filter />
                </div>
                <div className='table-responsive'>
                    {
                        <Table/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Content