import React from 'react'
import { useState } from "react"
import { BiDownArrow } from "react-icons/bi"
import { setFilter, clearFilter } from '../../state/slices/expenseSlice'
import { useDispatch } from 'react-redux'
import { FILTER_ACTIONS } from '../../state/actions/action'
import { useSelector } from 'react-redux'


const Filter = () => {
    const [show, setShow] = useState(true)

    const dispatch = useDispatch()

    const { expenses, filter } = useSelector(state => state.expense)

    // eliminate duplicate merchants
    const uniqueMerchants = [...new Set(expenses.map(expense => expense.merchant))]


    const handleClearFilter = (e) => {
        e.preventDefault()
        dispatch(setFilter({
            type: FILTER_ACTIONS.CLEAR_FILTER,
        }))
    }
    return (
        <div className='filter'>
            <div className='topFilter'
                onClick={() => setShow(prev => !prev)}
            >
                <h1 className='fs-5 filterHead'>Filter expenses</h1>
                <div className='showButton fs-3' >
                    <button><BiDownArrow /></button>
                </div>
            </div>

            <div className={show ? "filterContainer" : "hideFilterContainer"}>
                <form className='mt-4 p-3'>
                    <div>
                        <input
                            type={`radio`}
                            name="status"
                            className='me-3'
                            onChange={() => dispatch(setFilter({
                                type: FILTER_ACTIONS.FILTER_STATUS,
                                payload: 'Completed'
                            }))}
                        />
                        <label>Completed</label>
                    </div>

                    <div>
                        <input
                            className='me-3'
                            type={`radio`}
                            name="status"
                            onChange={() => dispatch(setFilter({
                                type: FILTER_ACTIONS.FILTER_STATUS,
                                payload: 'New'
                            }))}
                        />
                        <label>New</label>
                    </div>

                    <div>
                        <input
                            className='me-3'
                            name="status"
                            type={`checkbox`}
                            onChange={() => dispatch(setFilter({
                                type: FILTER_ACTIONS.FILTER_STATUS,
                                payload: 'Inprogress'
                            }))}
                        />
                        <label>Inprogress</label>
                    </div>

                    <div className='minMax'>

                        <div>
                            <label className='label'>Min:</label>
                            <input
                                className='min'
                                type={`number`}
                                onChange={(e) => dispatch(setFilter({
                                    type: FILTER_ACTIONS.FILTER_MIN,
                                    payload: e.target.value
                                }))}
                            />
                        </div>
                        <div className='dash'></div>
                        <div>
                            <label className='label'>Max:</label>
                            <input
                                onChange={(e) => dispatch(setFilter({
                                    type: FILTER_ACTIONS.FILTER_MAX,
                                    payload: e.target.value
                                }))}
                                className='max'
                                type={`number`}
                            />
                        </div>

                    </div>

                    <div className='dateFilter mt-4'>
                        <div className='mb-3'>
                            <label className='label'>From:</label>
                            <input
                                onChange={(e) => dispatch(setFilter({
                                    type: FILTER_ACTIONS.FILTER_FROM_DATE,
                                    payload: e.target.value
                                }))}
                                className='dateInput'
                                type={`date`}
                            />

                        </div>

                        <div>
                            <label className='label'>To:</label>
                            <input
                                onChange={(e) => dispatch(setFilter({
                                    type: FILTER_ACTIONS.FILTER_TO_DATE,
                                    payload: e.target.value
                                }))}
                                className='dateInput'
                                type={`date`}
                            />
                        </div>
                    </div>

                    <div className="inputWrapper mt-4">
                        <label>Merchant:</label> <br />
                        <select
                            className='merchantInput'
                            type={`text`}
                            onChange={(e) => dispatch(setFilter({
                                type: FILTER_ACTIONS.FILTER_MERCHANT,
                                payload: e.target.value
                            }))}
                        >
                            <option defaultValue={''}>select</option>
                            {
                                uniqueMerchants.map(merchantName => {
                                    return (
                                        <option key={merchantName} value={merchantName}>{merchantName}</option>
                                    )
                                })

                            }
                        </select>
                    </div>

                    <div className='mt-5 d-flex align-items-center justify-content-center'>
                        <button
                            onClick={handleClearFilter}
                            className='clearFilter'
                        >Clear Filter</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Filter