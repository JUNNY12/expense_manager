import { toast } from 'react-toastify'

export const validatePassword = (password, confirmPassword) => {
    let isValid = true
    if (password !== confirmPassword) {
      isValid = false
      toast.error('Password does not match', {
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
    return isValid
  }