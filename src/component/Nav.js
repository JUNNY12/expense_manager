import { Link } from 'react-router-dom'
import { User , SignOut} from '../asset/icon/Icon'

const Nav = () => {
  return (
    <nav className='navWrapper'>
        <div className='logoName'>Expense Manager</div>
        <div className='profileLogout'>
           <Link to={`/profile`}>
                <button className='profile'><User /></button>
           </Link>
            <Link to={`/login`}> 
                <button className='logout'><SignOut /></button>
            </Link>
        </div>

    </nav>
  )
}

export default Nav