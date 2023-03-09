import { useState, useContext } from 'react';
import { Image } from 'cloudinary-react';
import Axios from 'axios';
import { useAppCtx } from '../../utils/AppContext';
import cloudinary from 'cloudinary-core';

export default function ProfileImage() {
    //Setting the state of the image
    const [imageSelected, setImageSelected] = useState('');

    //Destructuring the 'user' object from the util folder
    const { user, updateUserContext } = useAppCtx();

    //Setting the 'user._id' as a variable for easier acess
    const user_id = user._id;

    //Using the 'cloudinary-react' package to get the full url
    const cld = new cloudinary.Cloudinary({cloud_name: 'diwhrgwml'});

    //Setting local state to figure out if an image has been uploaded by the user
    const [userUrl, setUserUrl] = useState(null);

    //!Original -> This should work with no other function. See the end of the this video for base solution that works:
    //! https://www.youtube.com/watch?v=Y-VgaRwWS3o&ab_channel=PedroTech
    
    //The get user ID from server
    //^ Technically we do not need this function, since the 'user' state permeates through our code
    const getUser = async (user_id) => {
        try {
            const response = await fetch(`/api/user/${user_id}`);
            console.log(response)
            if (!response.ok) {
            throw new Error(response.statusText);
            }
            const user = await response.json();
            console.log(user)
            return user;
        } catch (error) {
            console.error('Error getting user:', error);
        }
    };

    const updateUser = async (userId, publicId) => {
        try {
            const response = await fetch(`/api/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    profileImage: {url: cld.url(publicId)}
                })
            });

            if (!response.ok) {
            const error = await response.json();
                throw new Error(error.message);
            }
            
            const updatedUser = await response.json();
            
            //Setting the state to the full url link
            setUserUrl(cld.url(publicId))
            console.log(userUrl)

            console.log(cld.url(publicId))
            console.log('User updated:', updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const uploadImage = async () => {
        //See "AddPetForm.jsx" for full description on what is happenning
        try {
            const formData = new FormData();
            formData.append("file", imageSelected);
            formData.append("upload_preset", "fxbnekpl");
        
            const response = await Axios.post("https://api.cloudinary.com/v1_1/diwhrgwml/image/upload", formData);
            const publicId = response.data.public_id;
            console.log(`Image uploaded successfully! public_id: ${publicId}`);
            await getUser(user_id);
            await updateUser(user_id, publicId);
        } catch (err) {
            console.log(err);
        }
    }
      
    return (
        <div style={{color: "white"}}>
            <input type="file" onChange={(event) => setImageSelected(event.target.files[0])}/>
            <button onClick={uploadImage}>Upload Image</button>

            {/* If the state has been changed (aka if the user successfully uploaded an image), display the image */}
            {userUrl && <Image style={{width: "200px"}} cloudName="diwhrgwml" publicId={userUrl}/>}
        </div>
    )
};