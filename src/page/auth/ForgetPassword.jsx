import React from 'react'
import { EmailIcon } from '../../asset/icon/Icon'
import { useRef, useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import '../../asset/styles/auth/auth.css'
import {BeatLoader} from "react-spinners"
import { useNavigate } from 'react-router-dom'


const ForgetPassword = () => {

    const [isLoading, setIsloading] = useState(false)
    //focus on input field
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const navigate = useNavigate()

    const redirect = () => {
        navigate('/login')
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsloading(true);
        const email = e.target.email.value;
        try {
          await sendPasswordResetEmail(auth, email);
          toast.success('Password reset link sent to your email', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          e.target.email.value = ''; 
          setTimeout(() => {
            redirect();
          }, 2000);
        } catch (error) {
          // handle errors
        }
        setIsloading(false);
      };
      

    return (
        <div className='forgetWrapper'>
            <div className='mb-3'>
                <h2>Reset Password</h2>
            </div>

            <form onSubmit={handleResetPassword}>
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
                    />
                </div>
                <button className='loginBtn btn-2'>
                   {
                    isLoading?
                    <BeatLoader color="#fff" />
                    :
                    "Reset Password"
                   }

                </button>
            </form>
        </div>
    )
}

export default ForgetPassword  