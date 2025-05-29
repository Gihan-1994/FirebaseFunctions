import {useState, useEffect} from 'react';
import AuthButton from "../components/authButton.tsx";
import {uploadImage} from "../services/uploadService.ts";


const ImageUploadScreen = () => {

    const [image, setImage] = useState <File|null>(null);
    const [url, setUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);

    useEffect(() => {
        if (!image) {
            setUrl('');
            return;
        }

        const objectUrl = URL.createObjectURL(image);
        setUrl(objectUrl);

        // Clean up
        return () => {
            URL.revokeObjectURL(objectUrl);
        }
    }, [image]);


    const handleUpload =async () => {
        setLoading(true);
        try {
            if (!image) return;
            const response = await uploadImage(image);
            if (response.success) {
                console.log('😍Image uploaded successfully:', response.url);
                const imageUrl = response.url;
                console.log('🤐Image Url:', imageUrl);
                setTimeout(() => {
                    setImage(null);
                }, 5000);

                setIsUploaded(true);
            } else {
                console.error('Image upload failed:', response.message);
            }
        } catch (error) {
            setImage(null);
            if (error instanceof Error) {
                console.error('Error uploading image:', error.message);
            } else {
                console.error('Unknown error:', error);
            }
        }finally {

                setLoading(false);
        }


    }
    return (
        <div className='Relative'>
            <div  className='w-full h-full flex flex-col justify-center items-center  gap-10 py-10 pt-[200px]'>
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
                        loading = {loading}
                        variant = "secondary"
                        colour = "green"

                    >Upload</AuthButton>

                </div>
                <div>
                    {url && (
                        <div className="w-1/2 flex flex-col items-center gap-4">
                            <h3 className="text-lg font-semibold">Image Preview</h3>
                            <img
                                src={url}
                                alt="Preview"
                                className="max-w-full max-h-60 border-2 rounded"
                            />
                        </div>
                    )}
                </div>
                <div>
                   <span
                       className={`${isUploaded ? 'block' : 'hidden'} text-lg font-bold text-white `}>
                    Image Upload Successful
                </span>
                </div>

            </div>
        </div>


    )
}
export default ImageUploadScreen
