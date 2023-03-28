import profileImage from "../../asset/images/profileImage.webp"
import { BackArrow } from '../../asset/icon/Icon'
import { Link, useNavigate } from 'react-router-dom'
import "../../asset/styles/profile/profile.css"
import { PhotoIcon } from "../../asset/icon/Icon"
import { useForm } from "../../hooks/useForm"
import { useState, useEffect } from 'react';
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import Loader from "../../component/Loader"


const Profile = () => {
    const navigate = useNavigate();
    const [values, handleValueChange] = useForm({
        displayName: '',
        email: '',
        firstName: '',
        lastName: '',
        address:''
    })
    
    const [user, loading] = useAuthState(auth);
    const [authenticated, setAuthenticated] = useState(false);
  
    //redirect to login if user is not authenticated
    useEffect(() => {
      if (!user && !loading) {
        navigate('/login');
      }
      setAuthenticated(user ? true : false);
    }, [user, loading, navigate]);
  
    //show loader if loading
    if (loading) {
      return <Loader />;
    }
  
    //return null if user is not authenticated to prevent glitch of the page
    if (!authenticated) {
      return null;
    }

  

    const { displayName, email, firstName, lastName, address } = values
    return (
        <section>
            <div className='profileHeader'>
                <h1>Johnnie</h1>
                <div className='back'>
                    <Link className='link' to={`/`}><BackArrow /></Link>
                </div>
                <div>
                    <input
                        type="file"
                        name="image-upload"
                        id="image"
                        accept="image/*"
                    />
                    <label htmlFor='image'>
                        <div className="imageContainer"
                            role="button"
                            title="Change Profile Image"
                        >
                            <img src={profileImage} alt="Profile User" />
                            <div className="photoIcon">
                                <PhotoIcon />
                            </div>
                        </div>
                    </label>

                </div>
            </div>

            <div className="details">
                <form>
                    <div className="profileInput">
                        <label htmlFor="displayName">Display Name</label>
                        <input 
                            type="text" 
                            name="displayName"
                            id="displayName" 
                            value={displayName}
                            onChange={handleValueChange}
                            />
                    </div>

                    <div className="profileInput mt-3">
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email"
                         name="email"
                          id="email" 
                          value={email}
                          onChange={handleValueChange}
                          />
                    </div>

                    <div className="profileInput mt-3">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                        type="text"
                         name="firstName"
                          id="firsName" 
                          value={firstName}
                          onChange={handleValueChange}
                          />
                    </div>

                    <div className="profileInput mt-3">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                        type="text"
                         name="lastName"
                          id="lastName"
                          value={lastName}
                            onChange={handleValueChange}

                          />
                    </div>

                    <div className="profileInput mt-3">
                        <label htmlFor="address">Address</label>
                        <textarea 
                            name="address"
                            value={address}
                            id="address"
                            onChange={handleValueChange}
                            />
                        
                    </div>
                    <button className="mt-3">Save Changes</button>
                </form>

            </div>


        </section>
    )
}

export default Profile