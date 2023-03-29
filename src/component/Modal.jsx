import React from 'react'

const Modal = () => {
    
   
    return (
        <div className='deleteModal'>
            <div className='closeModal' title='close' typeof='button'>X</div>
            <div className='paraText'>Do want to delete?</div>
            <div className='modalBtn'>
                <button
                    className='yes'
                    aria-label='Delete'
                    title='Yes'>Yes</button>
                <button
                    className='no'
                    title='No'
                    aria-label='Close Modal'>No</button>
            </div>
        </div>
    )
}

export default Modal