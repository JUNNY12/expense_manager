import React from 'react'
import { formatPrice } from '../../helpers/formatCurrency'
import { Pencil, TrashIcon, Plus } from '../../asset/icon/Icon'
import { useGetExpensesQuery, useDeleteExpenseMutation } from '../../services/expenses'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import Empty from './Empty'
import { toast } from "react-toastify";
import { useState } from 'react'
import Form from './Form'
import Cost from './Cost'
import { BeatLoader } from 'react-spinners'
import { FILTER_ACTIONS } from '../../state/actions/action'
import { setFilter } from '../../state/slices/expenseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getFilteredExpenses } from '../../helpers/getFilteredExpenses'
import { storage } from '../../firebase'
import { deleteObject, ref } from 'firebase/storage'

const Table = () => {

    const [show, setShow] = useState(false)
    const [update, setUpdate] = useState({})
    const [user] = useAuthState(auth)

    let uid = user?.uid
    const { isLoading } = useGetExpensesQuery(uid)
    const [deleteExpense] = useDeleteExpenseMutation()

    const dispatch = useDispatch()
    const { expenses, filter } = useSelector((state) => state.expense)
    const filterExpenses = getFilteredExpenses(expenses, filter)
    // console.log(filterExpenses)
    // console.log(filter)

    // function to handle search
    const handleSearch = (e) => {
        dispatch(
            setFilter({
                type: FILTER_ACTIONS.FILTER_ALL,
                payload: e.target.value
            })
        )
    }


    // function to handle delete expense
    const handleDeleteExpense = (id, receipt) => {
        try {
            deleteExpense({
                id,
                uid
            })

            removeImageFromStorage(receipt)

            toast.success('Expense deleted successfully', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        }
        catch (error) {
            // console.log(error)
        }

    }

    // function to set update data props
    const handleSetUpdate = (id, date, merchant, total, status, comment, receipt) => {
        setUpdate({
            ...update,
            id,
            date,
            merchant,
            total,
            status,
            comment,
            receipt
        })
        setShow(true)
    }

    //conditional rendering
    let content;
    if (filterExpenses?.length === 0 && expenses.length === 0) {
        content = (
            <tr className='empty'>
                <td colSpan='7' className='text-center'>
                    No expense added yet
                </td>
            </tr>
        )
    }
    else if (filterExpenses?.length === 0 && expenses.length > 0) {
        content = (
            <tr className='empty noExpenses'>
                <td colSpan='7' className='text-center'>
                    <h5 className='text-danger'>OOps! No expenses found</h5>
                </td>
            </tr>
        )
    }
    else {
        content = (
            filterExpenses?.map((expense, index) => {
                // console.log(expense)
                const { id, date, merchant, total, status, comment, receipt } = expense

                return (
                    <tr key={id}>
                        <td>{index + 1}.</td>
                        <td>{date}</td>
                        <td>{merchant}</td>
                        <td>{formatPrice(total)}</td>
                        <td>{status}</td>
                        <td>{comment}</td>
                        <td>
                            <span className=''>
                                <button
                                    aria-label='Delete Expense'
                                    title='Delete Expense'
                                    className='deleteBtn'
                                    onClick={() => handleDeleteExpense(id, receipt)}
                                >
                                    <TrashIcon />
                                </button>
                            </span>
                            <span>
                                <button
                                    aria-label='Update Expense'
                                    title='Update Expense'
                                    onClick={() => handleSetUpdate(id, date, merchant, total, status, comment, receipt)}
                                    className='updateBtn'><Pencil /></button>
                            </span>
                        </td>
                    </tr>
                )
            })
        )
    }

    //Conditional rendering
    if (isLoading && filterExpenses?.length === 0) {
        return (
            <div className='tableLoad'>
                <BeatLoader color='#c77253' size={15} />
            </div>
        )
    }

    // function to remove image from storage when deleting expense  
    async function removeImageFromStorage(image) {
        try {
            const imageRef = ref(storage, image)
            await deleteObject(imageRef)
            // console.log('image deleted')
        }
        catch (error) {
            // console.log(error)
        }
    };

    return (
        <div>
            <div className='mb-3 mt-1 wrap'>
                <input
                    className='search'
                    type={`search`}
                    placeholder="Search expenses ......"
                    onChange={handleSearch}
                />

                {
                    !show &&
                    <div className='addBtnWrapper'>
                        <button
                            onClick={() => setShow(true)}
                            aria-label='Add Expense'
                            title='Add Expense'
                            className='addBtn'>
                            <span><Plus /></span>
                        </button>
                    </div>
                }
            </div>
            <div>
                {
                    show &&
                    <Form
                        show={show}
                        setShow={setShow}
                        update={update}
                        setUpdate={setUpdate}
                    />
                }
            </div>
            <div className='table-responsive'>
                <table className="table">
                    <thead>
                        <tr id="tr">
                            <th scope='col'>S/N</th>
                            <th scope="col">Date</th>
                            <th scope="col">Merchant</th>
                            <th scope="col">(₦)Total</th>
                            <th scope="col">Status</th>
                            <th scope="col">Comment</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            </div>
            <Cost />
        </div>
    )
}

export default Table