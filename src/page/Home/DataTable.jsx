import { Pencil, Plus, TrashIcon } from '../../asset/icon/Icon'
import Cost from '../../component/Cost'
import Filter from '../../component/Filter'


const DataTable = () => {


    return (
        <div className='wrapper'>
            <div>
                <Filter />
            </div>

            <section className='containerWrapper table-responsive pe-3 ps-3 mt-5 mb-5'>

                <div className='mt-3 ps-3 mb-2'>
                    <input
                        className='search'
                        type={`search`}
                        placeholder="Search expenses"
                    />
                </div>

                <div className='tableContainer'>
                    <div className='addBtnWrapper'>
                        <button
                            className='addBtn'>
                            <Plus />
                        </button>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr id="tr">
                                <th scope="col">Date</th>
                                <th scope="col">Merchant</th>
                                <th scope="col">Total</th>
                                <th scope="col">Status</th>
                                <th scope="col">Comment</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <span className='me-4'>
                                        <button
                                            className='deleteBtn'
                                        >
                                            <TrashIcon />
                                        </button>
                                    </span>
                                    <span>
                                        <button className='updateBtn'><Pencil /></button>
                                    </span>
                                </td>
                            </tr>


                        </tbody>
                    </table>
                </div>
                <div className='text-center fs-3' >Your Record is Empty</div>
                <div className='ps-3 pb-5'>
                    <Cost/>
                </div>
            </section>

        </div>
    )
}

export default DataTable