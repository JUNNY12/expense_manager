import React from 'react'
import { DotLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='loader'>
        <DotLoader color='#c77253' size={80} />
    </div>
  )
}

export default Loader