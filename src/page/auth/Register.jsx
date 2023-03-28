import { useRef, useEffect } from "react";
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
import { useState, useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { validatePassword } from "../../constants/validatePassword";
import {} from "firebase/auth";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Redirect to login page
  const redirect = () => {
    navigate("/login");
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
  }, []);

  // Handle form submit
  const handleSubmit = useCallback(async (e) => {
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
        console.log(error.code);
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("Email is already in use", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            break;
          case "auth/invalid-email":
            toast.error("Invalid email", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            break;
          case "auth/weak-password":
            toast.error("Password is too weak", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            break;
          default:
            toast.error("Failed to create account. try again", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            break;
        }
      }
      setIsLoading(false);
    }
  }, []);

  // Handle google login
  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
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

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      switch (error.code) {
        case "auth/account-exists-with-different-credential":
          toast.error("Account already exists with different credential", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case "auth/invalid-credential":
          toast.error("Invalid credential", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case "auth/operation-not-allowed":
          toast.error("Operation not allowed", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case "auth/user-disabled":
          toast.error("Your account has been disabled", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case "auth/user-not-found":
          toast.error("Account does not exist", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case "auth/wrong-password":
          toast.error("Wrong password. Try again", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
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
        default:
          toast.error("Something went wrong", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      }
    }
  }, []);

  return (
    <div className="registerWrapper">
      <div className="registerFormWrap">
        <div className="userIcon">
          <UserLoginIcon />
        </div>
        <h1 className="text-center formHeader">Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 inputWrapper">
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

          <div className="mb-3 inputWrapper">
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

          <div className="mb-3 inputWrapper">
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
