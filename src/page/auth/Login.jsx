import { useRef, useEffect, useCallback, useState } from 'react'
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
import { useAuthState } from 'react-firebase-hooks/auth'

const Login = () => {
    const [user, loading, error] = useAuthState(auth)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    //toggle password visibility
    const inputType = showPassword ? 'text' : 'password'
    const togglePasswordVisiblity = () => {
        setShowPassword(!showPassword)
    }


    //focus on input field
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
    }, [])

    //handle login
    const handleLogin = useCallback(async (e) => {
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
            email.value = ''
            password.value = ''
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
        catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    toast.error('Invalid email address',
                        {
                            position: 'top-center',
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        }
                    )
                    break;
                case 'auth/user-disabled':
                    toast.error('Your account has been disabled',
                        {
                            position: 'top-center',
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        }
                    )

                    break;
                case 'auth/user-not-found':
                    toast.error('Account does not exist',
                        {
                            position: 'top-center',
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        }
                    )
                    break;
                case 'auth/wrong-password':
                    toast.error('Wrong password. Try again',
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
                    break;
                default:
                    toast.error('Something went wrong',
                        {
                            position: 'top-center',
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        }
                    )
            }
        }
        setIsLoading(false)
    }, [])

    //handle google login
    const provider = new GoogleAuthProvider()
    const handleGoogleLogin = useCallback(async () => {
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
            switch (error.code) {
                case 'auth/account-exists-with-different-credential':
                    toast.error('Account already exists with different credential', {
                        position: 'top-center',
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    break;
                case 'auth/invalid-credential':
                    toast.error('Invalid credential', {
                        position: 'top-center',
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    break;
                case 'auth/operation-not-allowed':
                    toast.error('Operation not allowed', {
                        position: 'top-center',
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    break;
                case 'auth/user-disabled':
                    toast.error('Your account has been disabled', {
                        position: 'top-center',
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    break;
                case 'auth/user-not-found':
                    toast.error('Account does not exist', {
                        position: 'top-center',
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    break;
                case "auth/popup-closed-by-user":
                    toast.warning("Popup closed by you", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    break;
                case 'auth/wrong-password':
                    toast.error('Wrong password. Try again', {
                        position: 'top-center',
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    break;
                default:
                    toast.error('Something went wrong', {
                        position: 'top-center',
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
            }
        }
    }, [])

    return (
        <div className='loginWrapper'>
            <div className='loginFormWrap'>
                <div className='userIcon'>
                    <UserLoginIcon />
                </div>
                <h1 className='text-center formHeader'>Login</h1>
                <form onSubmit={handleLogin}>

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
                            type={inputType}
                            aria-label='password'
                            placeholder='Enter your password'
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

                    <div className='mb-2'>
                        <input id='check' type="checkbox" />
                        <label htmlFor="check" className='ms-2 check'>Remember Me</label>
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