import React from 'react'
import { DotLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='loader'>
        <DotLoader color='#fff' size={50} />
    </div>
  )
}

export default Loader