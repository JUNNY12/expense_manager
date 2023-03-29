import { Plus } from '../../asset/icon/Icon'
import Filter from './Filter'
import Form from "./Form"
import { useState } from 'react'
import Table from './Table'
import { useGetExpensesQuery } from '../../services/expenses'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import Empty from './Empty'

const Content = () => {
    const [user] = useAuthState(auth)

    let uid = user?.uid

    const { data } = useGetExpensesQuery(uid)

    let arrayofExpense =[]
    for(let key in data){
        arrayofExpense.push({...data[key], id:key})
    }
   
    return (
        <div>
            <div className='contentWrapper'>
                <div>
                    <Filter />
                </div>
                <div className='table-responsive'>
                    {
                        <Table
                            arrayofExpense={arrayofExpense}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Content