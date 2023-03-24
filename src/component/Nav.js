import { Link } from 'react-router-dom'
import { User , SignOut} from '../asset/icon/Icon'

const Nav = () => {
  return (
    <nav className='navWrapper'>
        <div className='logoName'>Expense Manager</div>
        <div className='profileLogout'>
           <Link to={`/profile`}>
                <button
                title='Profile'
                aria-label='Profile'
                className='profile'><User /></button>
           </Link>
            <Link to={`/login`}> 
                <button 
                title='Logout'
                aria-label='Logout'
                className='logout'><SignOut /></button>
            </Link>
        </div>

    </nav>
  )
}

export default Nav