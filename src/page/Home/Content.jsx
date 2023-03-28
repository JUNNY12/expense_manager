import { Plus } from '../../asset/icon/Icon'
import Filter from './Filter'
import Form from "./Form"
import { useState } from 'react'
import Table from './Table'

const Content = () => {

    const [show, setShow] = useState(false)
    const [update, setUpdate] = useState(false)

    const handleShowForm = () => {
        setShow(true)
    }

    return (
        <div>
            <div className='my-4 wrap'>
                <input
                    className='search'
                    type={`search`}
                    placeholder="Search expenses ......"
                />

                {
                    !show &&
                    <div className='addBtnWrapper'>
                        <button
                            aria-label='Add Expense'
                            title='Add Expense'
                            onClick={handleShowForm}
                            className='addBtn'>
                            <span><Plus /></span>
                        </button>
                    </div>
                }
            </div>

            <div className='wrapper'>
                <div>
                    <Filter />
                </div>

                <section className='containerWrapper table-responsive pe-2 ps-2 mt-2 mb-5'>
                    <Table
                        setShow={setShow}
                        setUpdate={setUpdate}
                    />
                </section>
                {
                    show &&
                    <Form
                        update={update}
                        show={show}
                        setShow={setShow}
                    />
                }


            </div>
        </div>
    )
}

export default Content