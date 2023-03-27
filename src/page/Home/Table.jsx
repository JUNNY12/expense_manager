import React from 'react'
import { formatPrice } from '../../constants/formatCurrency'
import { expenses } from '../../data/data'
import { Pencil, TrashIcon } from '../../asset/icon/Icon'

const Table = ({setUpdate, setShow}) => {

    const handleSetUpdate = () => {
        setUpdate(true)
        console.log('update')
    }
    return (
        <div className='tableContainer'>
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
                    {
                        expenses.list.map((expense, index) => {

                            const { date, merchant, total, status, comment } = expense

                            return (
                                <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>{date}</td>
                                    <td>{merchant}</td>
                                    <td>{formatPrice(total)}</td>
                                    <td>{status}</td>
                                    <td>{comment}</td>
                                    <td>
                                        <span className='me-2'>
                                            <button
                                                aria-label='Delete Expense'
                                                title='Delete Expense'
                                                className='deleteBtn'
                                            >
                                                <TrashIcon />
                                            </button>
                                        </span>
                                        <span>
                                            <button
                                                aria-label='Update Expense'
                                                title='Update Expense'
                                                onClick={handleSetUpdate}
                                                className='updateBtn'><Pencil /></button>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table