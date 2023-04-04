import profileImg from "../../asset/images/profileImg.jpg"
import { BackArrow } from '../../asset/icon/Icon'
import { Link, useNavigate } from 'react-router-dom'
import "../../asset/styles/profile/profile.css"
import { PhotoIcon } from "../../asset/icon/Icon"
import { useForm } from "../../hooks/useForm"
import { useState, useEffect, useRef } from 'react';
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import Loader from "../../component/Loader"
import { updateProfile, updateEmail, EmailAuthProvider } from "firebase/auth"
import { reauthenticateWithCredential } from "firebase/auth"
import { toast } from "react-toastify"
import { storage } from "../../firebase"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"


const Profile = () => {
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false)

    const [user, loading] = useAuthState(auth);
    const [authenticated, setAuthenticated] = useState(false);
    const [values, handleValueChange] = useForm({
        displayName: '' || user?.displayName,
        email: '' || user?.email,
    })
    const [updatedDisplayName, setUpdatedDisplayName] = useState('')
    const [url, setUrl] = useState('')
    const [updateUrl, setUpdateUrl] = useState('')

    //currentUser is the user that is currently logged in
    const currentUser = user?.auth?.currentUser
    const imageRef = useRef(null)

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

    // console.log(user)

    const { displayName, email } = values

    const img = user?.photoURL
    // console.log(img)

    // console.log(currentUser?.providerData)

    const handleSubmit = (e) => {
        e.preventDefault()
        //user that signed in with google
        if (currentUser?.providerData[0]?.providerId === 'google.com') {

            //check if the user has changed their email to throw an error message
            if (email !== user?.email) {
                toast.error('You cannot change your email address', {
                    position: 'top-center',
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }

            // check if the user has changed their display name
            if (displayName !== user?.displayName) {
                updateProfile(currentUser, { displayName })
                    .then(() => {
                        // console.log('display name updated')
                        toast.success('Display name updated successfully', {
                            position: 'top-center',
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                        setUpdatedDisplayName(displayName)
                    })
                    .catch((error) => {
                        // console.log(error)
                        switch (error.code) {
                            case 'auth/invalid-display-name':
                                toast.error('Display name must be between 3 and 50 characters', {
                                    position: 'top-center',
                                    autoClose: 1000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                })
                                break;
                            default:
                                break;
                        }
                    })
            }
        }

        else {
            //Ask for the user's current password to reauthenticate
            const password = prompt('Please enter your password to verify your identity')
            if (!password) {
                return // Exit if the user cancels the prompt
            }

            //credentials to reauthenticate
            const credentials = EmailAuthProvider.credential(
                user?.email,
                password
            )

            //reauthenticate the user that signed in with email and password
            reauthenticateWithCredential(currentUser, credentials)
                .then(() => {
                    //check if the user has changed their email 
                    if (email !== user?.email) {
                        updateEmail(currentUser, email)
                            .then(() => {
                                // console.log('email updated')
                                toast.success('Email updated successfully', {
                                    position: 'top-center',
                                    autoClose: 1000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                })
                            })
                            .catch((error) => {
                                // console.log(error)
                            })
                    }
                    // check if the user has changed their display name
                    if (displayName !== user?.displayName) {
                        updateProfile(currentUser, { displayName })
                            .then(() => {
                                // console.log('display name updated')
                                toast.success('Display name updated successfully', {
                                    position: 'top-center',
                                    autoClose: 1000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                })
                                setUpdatedDisplayName(displayName)
                            })
                            .catch((error) => {
                                // console.log(error)
                                switch (error.code) {
                                    case 'auth/invalid-display-name':
                                        toast.error('Display name must be between 3 and 50 characters', {
                                            position: 'top-center',
                                            autoClose: 1000,
                                            hideProgressBar: true,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        })
                                        break;
                                    default:
                                        break;
                                }
                            })
                    }
                })
                .catch((error) => {
                    // console.log(error)
                    switch (error.code) {
                        case 'auth/wrong-password':
                            toast.error('Wrong password', {
                                position: 'top-center',
                                autoClose: 1000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            })
                            break;
                        default:
                            break;
                    }
                })
        }
    }


    const handleImageUpload = (e) => {
        const file = imageRef.current.files[0];

        const storageRef = ref(storage, `profile/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
        }, (error) => {
            // console.log(error)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setUrl(downloadURL)
                updateProfile(currentUser, { photoURL: downloadURL })
                    .then(() => {
                        // console.log('photo url updated')
                        toast.success('Profile image updated successfully', {
                            position: 'top-center',
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                        //get the updated photo url
                        setUpdateUrl(downloadURL)
                    })
                    .catch((error) => {
                        // console.log(error)
                    })
            });
        });
    }


    return (
        <section>
            <div className='profileHeader'>
                {
                    user?.displayName && user?.email
                        ? <h1 className='userDisplayName'>{updatedDisplayName || user?.displayName}</h1>
                        : <h1>{user?.email || user?.displayName}</h1>
                }
                <div className='back'>
                    <Link className='link' to={`/`}><BackArrow /></Link>
                </div>
                <div>
                    <input
                        type="file"
                        name="image-upload"
                        ref={imageRef}
                        id="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <label htmlFor='image'>
                        <div className="imageContainer"
                            role="button"
                            title="Change Profile Image"
                        >
                            <img src={updateUrl || img || profileImg} alt="Profile User" />
                            <div className="photoIcon">
                                <PhotoIcon />
                            </div>
                        </div>
                    </label>

                </div>
            </div>

            {
                !showForm &&
                (<div className="editProfile">
                    <button
                        onClick={() => setShowForm(!showForm)}
                    >
                        Edit Profile
                    </button>
                </div>)
            }

            {
                showForm &&
                (
                    <div className="details">
                        <form onSubmit={handleSubmit}>
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
                            <button className="mt-3">Save Changes</button>
                        </form>

                    </div>
                )
            }
        </section>
    )
}

export default Profile