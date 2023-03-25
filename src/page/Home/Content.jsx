import { Plus } from '../../asset/icon/Icon'
import Filter from '../../component/Filter'
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
        <div className='wrapper'>
            <div>
                <Filter />
            </div>

            <section className='containerWrapper table-responsive pe-2 ps-2 mt-2 mb-5'>

                <div className='d-flex justify-content-center align-items-center my-3 wrap'>
                    <input
                        className='search'
                        type={`search`}
                        placeholder="Enter your search here ......"
                    />

                </div>
                <Table 
                setShow={setShow}
                setUpdate={setUpdate}
                />
                {
                    !show &&
                    <div className='addBtnWrapper'>
                        <button
                            aria-label='Add Expense'
                            title='Add Expense'
                            onClick={handleShowForm}
                            className='addBtn'>
                            <Plus />
                        </button>
                    </div>
                }
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
    )
}

export default Content