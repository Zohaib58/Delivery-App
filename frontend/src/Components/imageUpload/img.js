import {useState, useEffect } from "react";
import {storage} from "../../util/firebaseSetup"
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage"

const UploadImage = () => {
    const [imageUpload, setImageUpload] = useState(null)

    if(imageUpload == null){
        return;
    }
    const vendorId= localStorage.getItem('userId')
    const imageRef = ref(storage, `${vendorId}/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then(()=>{
        alert("Image uploaded")
    });

    return(
        <div>
            <input type="file" onChange={(event)=>{setImageUpload(event.target.files[0]);}}/>
        </div>
    )
}

const GetImageURL = ({imageName}) => {
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