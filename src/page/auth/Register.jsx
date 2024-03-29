import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  EmailIcon,
  UserLoginIcon,
  PasswordIcon,
  GoogleIcon,
} from "../../asset/icon/Icon";
import "../../asset/styles/auth/auth.css";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { validatePassword } from "../../helpers/validatePassword";
import { checkRegisterError, checkGoogleError } from "../../helpers/checkError";

const Register = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  // Redirect to login page
  const redirect = () => {
    navigate("/");
  };

  // Toggle password visibility
  const inputType = showPassword ? "text" : "password";
  const togglePasswordVisiblity = () => {
    setShowPassword(!showPassword);
  };

  // Focus on input field
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  // Handle form submit
  const handleSubmit = async (e) => {
    const { email, password, confirmPassword } = e.target.elements;
    e.preventDefault();

    if (validatePassword(password.value, confirmPassword.value)) {
      setIsLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        toast.success("Account created successfully", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        email.value = "";
        password.value = "";
        confirmPassword.value = "";

        setTimeout(() => {
          redirect();
        }, 2500);
      } catch (error) {
        checkRegisterError(error.code)

      }
      setIsLoading(false);
    }
  };

  // Handle google login
  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      toast.success("Logged in successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      checkGoogleError(error.code);
    }
  };

  return (
    <div className="registerWrapper">
      <div className="registerFormWrap">
        <div className="userIcon">
          <UserLoginIcon />
        </div>
        <h1 className="text-center formHeader">Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 registerInputWrapper">
            <div className="iconWrap">
              <EmailIcon />
            </div>
            <input
              ref={inputRef}
              className="registerInput"
              name="email"
              type={`email`}
              aria-label="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3 registerInputWrapper">
            <div className="iconWrap">
              <PasswordIcon />
            </div>
            <input
              className="registerInput"
              name="password"
              type={inputType}
              aria-label="password"
              placeholder="Enter your password"
            />
            <button
              className="eye"
              type="button"
              onClick={togglePasswordVisiblity}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>

          <div className="mb-3 registerInputWrapper">
            <div className="iconWrap">
              <PasswordIcon />
            </div>
            <input
              className="registerInput"
              name="confirmPassword"
              type={inputType}
              aria-label="confirm password"
              placeholder="confirm password"
            />
            <button
              className="eye"
              type="button"
              onClick={togglePasswordVisiblity}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>

          <button className="registerBtn btn-2">
            {isLoading ? <BeatLoader color="#fff" size={20} /> : "Register"}
          </button>
        </form>
        <div className="mt-3 fs-6 fw-bold">
          <p className="ques">
            <span className="me-2 dont"> Already have an account?</span>
            <Link to={`/login`}>
              <span className="signUp"> Login</span>
            </Link>
          </p>
        </div>
        <div
          className="google"
          typeof="button"
          aria-label="button"
          onClick={handleGoogleLogin}
        >
          <div>
            <span className="me-4">
              <GoogleIcon />
            </span>
            <span>Continue with Google</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
