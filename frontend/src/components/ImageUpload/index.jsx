import {useState, useEffect } from "react";
import {storage} from "../../data/firebaseSetup"
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage"

export const UploadImage = ({onImageUpload}) => {
    const [imageUpload, setImageUpload] = useState(null);

    const handleImageChange = (event) => {
        setImageUpload(event.target.files[0]);
    };

    const handleImageUpload = () => {
        if (imageUpload) {
        const vendorId = localStorage.getItem('userId');
        const imageRef = ref(storage, `${vendorId}/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert('Image uploaded')
            return getDownloadURL(imageRef);
        })
        .then((url) => {
          onImageUpload(url);
        })
        .catch((error) => {
          console.log(error);
        });
        return getDownloadURL()
        }
    };

    return(
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Upload</button>
        </div>
    );
}

export const GetImageURL = ({imageName}) => {
    const vendorId= localStorage.getItem('userId')
    const imageRef = ref(storage, `${vendorId}/${imageName}`);
    listAll(imageRef).then((response)=>{
        response.items.forEach((item)=>{
            getDownloadURL(item).then((url)=>{
                return url;
            })
        })
    })
}
