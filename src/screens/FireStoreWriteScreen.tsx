import { useState, useRef } from "react"
import AuthButton from "../components/authButton.tsx";
import{db} from "../config/firebase-config.ts";
import { doc, setDoc } from "firebase/firestore";

const FireStoreWriteScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const idRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLTextAreaElement>(null);
    const ageRef = useRef<HTMLTextAreaElement>(null);
    const cityRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async () => {
        setIsLoading(true);
       try{
           if(!idRef.current?.value) {
               alert("Please enter an ID");
               return;
           }else {
               await setDoc(doc(db, "Users", `${idRef.current.value}`), {
                   name: nameRef.current?.value || " ",
                   age: ageRef.current?.value || " ",
                   city: cityRef.current?.value || " ",
               });
           }
        setLoaded(true);
       }
       catch (error: unknown) {
            console.log(error);
        }
        setIsLoading(false);
    }
    return (
        <div className='Relative'>
        <div className='relative w-full h-[600px] flex flex-col justify-center items-center  gap-10 py-10 mt-[2px]'>
            <div className='w-2/3 h-full p-5 px-20 col-end-1 flex flex-col gap-x-10 border-2 justify-between place-items-stretch bg-blue-200'>
                <div className='flex flex-row justify-between items-center gap-x-10'>
                    <h2 className='text-2xl font-bold font-sans bg-gradient-to-r from-indigo-300 to-purple-300 py-2 px-2 rounded-2xl w-1/3 text-center text-wrap '>
                        Enter ID
                    </h2>
                    <input
                        type="text"
                        ref={idRef}
                        value={idRef.current?.value}
                        placeholder={"Enter ID..."}
                        className='border-1 border-gray-500 rounded-md px-2 py-4 w-1/2'
                    />
                </div>
                <div className='flex flex-row justify-between items-center gap-x-10'>
                    <h2 className='text-2xl font-bold font-sans bg-gradient-to-r from-indigo-300 to-purple-300 py-2 px-2 rounded-2xl w-1/3 text-center text-wrap '>
                        Enter Name
                    </h2>
                    <textarea
                        ref={nameRef}
                        placeholder={"Enter text..."}
                        className='border-1 border-gray-500 rounded-md px-2 py-4 w-1/2'
                    />
                </div>
                <div className='flex flex-row justify-between items-center gap-x-10'>
                    <h2 className='text-2xl font-bold font-sans bg-gradient-to-r from-indigo-300 to-purple-300 py-2 px-2 rounded-2xl w-1/3 text-center text-wrap '>
                        Enter Age
                    </h2>
                    <textarea
                        ref={ageRef}
                        placeholder={"Enter text..."}
                        className='border-1 border-gray-500 rounded-md px-2 py-4 w-1/2'
                    />
                </div>
                <div className='flex flex-row justify-between items-center gap-x-10'>
                    <h2 className='text-2xl font-bold font-sans bg-gradient-to-r from-indigo-300 to-purple-300 py-2 px-2 rounded-2xl w-1/3 text-center text-wrap '>
                        Enter City
                    </h2>
                    <textarea
                        ref={cityRef}
                        placeholder={"Enter text..."}
                        className='border-1 border-gray-500 rounded-md px-2 py-4 w-1/2'
                    />
                </div>


            </div>
            <AuthButton
                type = "button"
                onClick={handleSubmit}
                disabled = {false}
                loading = {isLoading}
                variant = "secondary"
                colour = "blue"
            >Submit Text</AuthButton>
            <div className='mb-4 pb-5 '>
                        <span
                            className={`${loaded ? 'block' : 'hidden'} text-lg font-bold text-gray-700  bottom-0 right-0`}>
                        User Data added to Database
                    </span>
            </div>
        </div>
        </div>
    )
}
export default FireStoreWriteScreen
