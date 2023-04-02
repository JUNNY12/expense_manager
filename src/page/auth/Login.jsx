import { useRef, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { EmailIcon, UserLoginIcon, PasswordIcon, GoogleIcon, EyeIcon, EyeSlashIcon } from '../../asset/icon/Icon'
import "../../asset/styles/auth/auth.css"
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { BeatLoader } from "react-spinners"
import { checkGoogleError, checkLoginError } from '../../helpers/checkError'


const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [loginCredentials, setLoginCredentials] = useState({
        email: '',
        password: ''
    })

    //handle input Change
    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginCredentials(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    //toggle password visibility
    const inputType = showPassword ? 'text' : 'password'
    const togglePasswordVisiblity = () => {
        setShowPassword(!showPassword)
    }

    //handle remember me
    const handleRememberMe = (e) => {
        const { checked } = e.target
        setRememberMe(checked)
        localStorage.setItem('rememberMe', checked)
    }

    //ref for input field
    const inputRef = useRef(null)
    const passwordRef = useRef(null)

    //useEffect 
    useEffect(() => {
        inputRef.current.focus()

        //get login credentials from local storage
        if (localStorage.getItem('loginCredentials')) {
            const { email, password } = JSON.parse(localStorage.getItem('loginCredentials'))
            setLoginCredentials({
                email,
                password
            })
        }
        //get remember me value from local storage
        const rememberMeValue = localStorage.getItem('rememberMe')
        if (rememberMeValue) {
            setRememberMe(JSON.parse(rememberMeValue))
        }

    }, [])

    //handle login
    const handleLogin = async (e) => {
        const { email, password } = e.target.elements
        e.preventDefault()
        setIsLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email.value, password.value)
            toast.success('Login successful',
                {
                    position: 'top-center',
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            //redirect to home page
            setTimeout(() => {
                navigate('/')
            }, 1000)
            //save login credentials to local storage
            if (rememberMe) {
                localStorage.setItem('loginCredentials', JSON.stringify(loginCredentials))
            }
            else {
                localStorage.removeItem('loginCredentials')
            }

            //clear input field
            email.value = ''
            password.value = ''
        }
        catch (error) {
            checkLoginError(error.code)
        }
        setIsLoading(false)
    };

    //handle google login
    const provider = new GoogleAuthProvider()
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            toast.success('Logged in successfully',
                {
                    position: 'top-center',
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })

            setTimeout(() => {
                navigate('/')
            }, 2500)

        } catch (error) {
            checkGoogleError(error.code)
        }
    };

    return (
        <div className='loginWrapper'>
            <div className='loginFormWrap'>
                <div className='userIcon'>
                    <UserLoginIcon />
                </div>
                <h1 className='text-center formHeader'>Login</h1>
                <form onSubmit={handleLogin}>

                    <div className='mb-3 loginInputWrapper'>
                        <div className='iconWrap'>
                            <EmailIcon />
                        </div>
                        <input
                            ref={inputRef}
                            required
                            aria-required='true'
                            className='loginInput'
                            name='email'
                            type={`email`}
                            aria-label='email'
                            placeholder='Enter your email'
                            onChange={handleChange}
                            value={loginCredentials.email}
                        />
                    </div>

                    <div className='mb-3 loginInputWrapper'>
                        <div className='iconWrap'>
                            <PasswordIcon />
                        </div>
                        <input
                            ref={passwordRef}
                            required
                            aria-required='true'
                            className='loginInput'
                            name='password'
                            type={inputType}
                            aria-label='password'
                            placeholder='Enter your password'
                            onChange={handleChange}
                            value={loginCredentials.password}
                        />
                        <button
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

                    <div className='mb-2 flexCont'>
                        <div>
                            <input id='check'
                                type="checkbox"
                                checked={rememberMe}
                                onChange={handleRememberMe}
                            />
                            <label htmlFor="check" className='ms-2 check'>Remember Me</label>
                        </div>
                        <div>
                            <Link className='forgetPassword' to='/forgetPassword'>Forgot Password</Link>
                        </div>
                    </div>

                    <button className='loginBtn btn-2'>
                        {isLoading ?
                            <BeatLoader color='#fff' size={20} />
                            :
                            'Login'
                        }
                    </button>
                </form>
                <div className='mt-3 fs-6 fw-bold'>
                    <p className='ques text-center'>
                        <span className='me-2 dont'> Dont Have an account yet?</span> <br />
                        <Link to={`/register`}>
                            <span className='signUp'> Create an Account</span>
                        </Link>
                    </p>
                </div>
                <div
                    onClick={handleGoogleLogin}
                    className='google' typeof='button' aria-label='button'>
                    <div>
                        <span className='me-4'>
                            <GoogleIcon />
                        </span>
                        <span>Continue with Google</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login