import { useRef, useEffect } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { EmailIcon, UserLoginIcon, PasswordIcon, GoogleIcon, EyeIcon, EyeSlashIcon } from '../../asset/icon/Icon'
import "../../asset/styles/auth/auth.css"
import { useState } from 'react'

const Login = () => {

  const navigate = useNavigate()


    const [values, handleValueChange] = useForm({
        password: '',
        email: '',
    })

    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisiblity = () => {
        setShowPassword(!showPassword)
        console.log('hello')
    }


    const inputType = showPassword ? 'text' : 'password'

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const { password, email } = values

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("email:", email, "password:", password)
        console.log('login')
        navigate ('/')
    }

    return (
        <div className='loginWrapper'>
            <div className='userIcon'>
                <UserLoginIcon />
            </div>
            <h1 className='text-center formHeader'>Login</h1>
            <form onSubmit={handleSubmit}>

                <div className='mb-3 inputWrapper'>
                    <div className='iconWrap'>
                        <EmailIcon />
                    </div>
                    <input
                        ref={inputRef}
                        required
                        aria-required='true'
                        className='loginInput'
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
                        required
                        aria-required='true'
                        className='loginInput'
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

                <div className='mb-2'>
                    <input id='check' type="checkbox" />
                    <label htmlFor="check" className='ms-2 check'>Remember Me</label>
                </div>

                <button className='loginBtn btn-2'>Login</button>
            </form>
            <div className='mt-3 fs-6 fw-bold'>
                <p className='ques text-center'>
                    <span className='me-2 dont'> Dont Have an account yet?</span> <br />
                    <Link to={`/register`}>
                        <span className='signUp'> Create an Account</span>
                    </Link>
                </p>
            </div>
            <div className='google' typeof='button' aria-label='button'>
                <div>
                    <span className='me-4'>
                        <GoogleIcon />
                    </span>
                    <span>Sign in with Google</span>
                </div>
            </div>
        </div>
    )
}

export default Login