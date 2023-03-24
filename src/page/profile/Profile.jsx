import profileImage from "../../asset/images/profileImage.webp"
import { BackArrow } from '../../asset/icon/Icon'
import { Link } from 'react-router-dom'
import "../../asset/styles/profile/profile.css"
import { PhotoIcon } from "../../asset/icon/Icon"
import { useForm } from "../../hooks/useForm"

const Profile = () => {

    const [values, handleValueChange] = useForm({
        displayName: '',
        email: '',
        firstName: '',
        lastName: '',
        address:''
    })

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
                            />
                    </div>

                    <div className="profileInput">
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email"
                         name="email"
                          id="email" 
                          value={email
                          }/>
                    </div>

                    <div className="profileInput">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                        type="text"
                         name="firstName"
                          id="firsName" 
                          value={firstName}
                          />
                    </div>

                    <div className="profileInput">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                        type="text"
                         name="lastName"
                          id="lastName"
                          value={lastName}
                          />
                    </div>

                    <div className="profileInput">
                        <label htmlFor="address">Address</label>
                        <textarea 
                        name="address"
                         id="address"></textarea>
                    </div>

                    <button>Save Changes</button>
                </form>

            </div>


        </section>
    )
}

export default Profile