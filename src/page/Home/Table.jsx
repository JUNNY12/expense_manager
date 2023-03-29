import React from 'react'
import { formatPrice } from '../../constants/formatCurrency'
import { expenses } from '../../data/data'
import { Pencil, TrashIcon } from '../../asset/icon/Icon'
import { useGetExpensesQuery, useDeleteExpenseMutation } from '../../services/expenses'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import Loader from '../../component/Loader'
import Empty from './Empty'
import { toast } from "react-toastify";
import { useState } from 'react'
import Form from './Form'
import { Plus } from '../../asset/icon/Icon'
import Cost from './Cost'
import { BeatLoader } from 'react-spinners'



const Table = ({ arrayofExpense }) => {
    const [show, setShow] = useState(false)
    const [update, setUpdate] = useState({})
    const [user] = useAuthState(auth)

    let uid = user?.uid
    const { data, error, isLoading } = useGetExpensesQuery(uid)

    console.log(data)

    const [deleteExpense] = useDeleteExpenseMutation()

    // function to handle delete expense
    const handleDeleteExpense = (id) => {
        try {
            deleteExpense({
                id,
                uid
            })
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
            console.log(error)
        }
    }
    // function to set update data state
    const handleSetUpdate = (id, date, merchant, total, status, comment) => {
        setUpdate({
            ...update,
            id,
            date,
            merchant,
            total,
            status,
            comment
        })

        setShow(true)
    }

    //conditional rendering
    let content;

    if (arrayofExpense?.length === 0) {
        content = <Empty />
    }
    else {
        content = (
            arrayofExpense?.reverse()?.map((expense, index) => {
                // console.log(expense)

                const { id, date, merchant, total, status, comment } = expense

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
                                    onClick={() => handleDeleteExpense(id)}
                                >
                                    <TrashIcon />
                                </button>
                            </span>
                            <span>
                                <button
                                    aria-label='Update Expense'
                                    title='Update Expense'
                                    onClick={() => handleSetUpdate(id, date, merchant, total, status, comment)}
                                    className='updateBtn'><Pencil /></button>
                            </span>
                        </td>
                    </tr>
                )
            })
        )
    }

    //Conditional rendering
    if (isLoading && arrayofExpense?.length === 0) {
        return (
            <div className='tableLoad'>
                <BeatLoader color='#c77253' size={15} />
            </div>
        )
    }

    return (
        <div>
            <div className='mb-3 mt-1 wrap'>
                <input
                    className='search'
                    type={`search`}
                    placeholder="Search expenses ......"
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