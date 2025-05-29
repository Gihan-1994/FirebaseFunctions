import {useState} from 'react';
import AuthButton from "../components/authButton.tsx";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../config/firebase-config.ts";


const ImageUploadScreen = () => {

    const [image, setImage] = useState <File|null>(null);

    const handleUpload =async () => {
      console.log(image);
      try {
        if(image){
         // const url = await uploadImage(image);
          //console.log(url);
            const storageRef = ref(storage, `images/${image.name}`);

            uploadBytes(storageRef, image).then((snapshot) => {
                console.log('Uploaded a blob or file!', snapshot.ref);
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            });
        }
      } catch (error) {
          console.error("Upload failed:", error);
      }

    }
    return (
        <div className='Relative'>
            <div  className='w-full h-full flex flex-col justify-center items-center  gap-10 py-10 mt-[200px]'>
                <div className='w-1/2 h-[200px] p-5 px-20 flex flex-row flex-wrap gap-x-10 border-2 justify-between items-center bg-blue-200'>
                    <h2 className='text-2xl font-bold font-sans'>Upload Image</h2>
                    <input
                        type = "file"
                        onChange = {(e) => setImage(e.target.files? e.target.files[0]: null)}
                        className='w-1/2 h-1/4 p-5 px-20  gap-x-10 border-2  bg-violet-400 hover:bg-violet-200 rounded-full'
                    />
                    <AuthButton
                        type = "button"
                        onClick={handleUpload}
                        disabled = {false}
                        loading = {false}
                        variant = "secondary"
                        colour = "green"
                    >Upload</AuthButton>

                </div>
            </div>
        </div>


    )
}
export default ImageUploadScreen
