import { Link, useNavigate } from 'react-router-dom'
import { User, SignOut } from '../asset/icon/Icon'
import { auth } from '../firebase'
import { toast } from 'react-toastify'

const Nav = () => {

  const navigate = useNavigate

  // Sign-out function
  const handleSignOut = () => {
    auth.signOut()
      .then(() => {

        // Sign-out successful
        console.log('User signed out');
        toast.success('User signed out', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        navigate('/login')
      })
      .catch((error) => {

        // An error happened
        console.log(error);
      });
  }

  // JSX button element to trigger sign-out
  <button onClick={handleSignOut}>Sign out</button>

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
        <button
          onClick={handleSignOut}
          title='Logout'
          aria-label='Logout'
          className='logout'><SignOut /></button>

      </div>

    </nav>
  )
}

export default Nav