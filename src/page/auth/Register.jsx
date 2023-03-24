import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { EyeIcon, EyeSlashIcon, EmailIcon, UserLoginIcon, PasswordIcon, GoogleIcon, User } from '../../asset/icon/Icon'
import "../../asset/styles/auth/auth.css"
import { useState } from 'react'


const Register = () => {

  const [values, handleValueChange] = useForm({
    password: '',
    email: '',
    username: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisiblity = () => {
    setShowPassword(!showPassword)
  }
  
  const inputType = showPassword ? 'text' : 'password'
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const { password, email, username } = values

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("email:", email, "password:", password)
    console.log('login')

  }

  return (
    <div className='registerWrapper'>
      <div className="registerFormWrap">
        <div className='userIcon'>
          <UserLoginIcon />
        </div>
        <h1 className='text-center formHeader'>Create an Account</h1>
        <form onSubmit={handleSubmit}>

          <div className='mb-3 inputWrapper'>
            <div className='iconWrap'>
              <User />
            </div>
            <input
              ref={inputRef}
              className='registerInput'
              name='username'
              value={username}
              onChange={handleValueChange}
              type={`text`}
              aria-label='Name'
              placeholder='Enter your username'
            />
          </div>
          <div className='mb-3 inputWrapper'>
            <div className='iconWrap'>
              <EmailIcon />
            </div>
            <input
              className='registerInput'
              name='email'
              value={email}
              onChange={handleValueChange}
              type={`email`}
              aria-label='email'
              placeholder='Enter your email'
            />
          </div>

          <div className='mb-3 inputWrapper'>
            <div className='iconWrap'>
              <PasswordIcon />
            </div>
            <input
              className='registerInput'
              name='password'
              value={password}
              onChange={handleValueChange}
              type={inputType}
              aria-label='password'
              placeholder='Enter your password'
            />
            <button
              disabled={password.length === 0}
              className='eye'
              type='button'
              onClick={togglePasswordVisiblity}
            >
              {showPassword ?
                <EyeSlashIcon />
                :
                <EyeIcon />
              }
            </button>
          </div>

          <button className='registerBtn btn-2'>Register</button>
        </form>
        <div className='mt-3 fs-6 fw-bold'>
          <p className='ques'>
            <span className='me-2 dont'> Already have an account?</span>
            <Link to={`/login`}>
              <span className='signUp'> Login</span>
            </Link>
          </p>
        </div>
        <div className='google' typeof='button' aria-label='button'>
          <div>
            <span className='me-4'>
              <GoogleIcon />
            </span>
            <span>Sign up with Google</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register