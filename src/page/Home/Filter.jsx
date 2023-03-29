import React from 'react'
import { useState } from "react"
import { BiDownArrow } from "react-icons/bi"

const Filter = () => {
    const [show, setShow] = useState(true)

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
                        />
                        <label>Completed</label>
                    </div>

                    <div>
                        <input
                            className='me-3'
                            type={`radio`}
                            name="status"
                        />
                        <label>New</label>
                    </div>

                    <div>
                        <input
                            className='me-3'
                            name="status"
                            type={`checkbox`}

                        />
                        <label>Inprogress</label>
                    </div>

                    <div className='minMax'>

                        <div>
                            <label className='label'>Min:</label>
                            <input
                                className='min'
                                type={`number`}
                            />
                        </div>
                        <div className='dash'></div>
                        <div>
                            <label className='label'>Max:</label>
                            <input
                                className='max'
                                type={`number`}
                            />
                        </div>

                    </div>

                    <div className='dateFilter mt-4'>
                        <div className='mb-3'>
                            <label className='label'>From:</label>
                            <input
                                className='dateInput'
                                type={`date`}
                            />

                        </div>

                        <div>
                            <label className='label'>To:</label>
                            <input
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
                        >
                            <option defaultValue={''}></option>
                        </select>
                    </div>

                    <div className='mt-5 d-flex align-items-center justify-content-center'>
                        <button
                            className='clearFilter'
                        >Clear Filter</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Filter