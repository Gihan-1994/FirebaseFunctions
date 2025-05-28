import { useState, useEffect } from "react";
import AuthButton from "../components/authButton.tsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../config/firebase-config.ts";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { FirebaseError } from "firebase/app";

//import { signInWithRedirect, getRedirectResult } from "firebase/auth";


const AuthScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [googleEmail, setGoogleEmail] = useState<string | null>('');
    const [facebookEmail, setFacebookEmail] = useState<string | null>('');



    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            setError('');
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const email = user.email;
            setGoogleEmail(email);
            setIsAuthenticated(true);
            return user;
        } catch (error :  unknown) {
            console.error("Google Sign-In Error:", error);
            // Only show error if it's not a user cancellation
            if ( error instanceof FirebaseError && error.code === 'auth/popup-blocked') {
                console.log('Popup blocked, trying redirect...');
                // Fallback to redirect
                //await signInWithRedirect(auth, googleProvider);
            }
            else if (error instanceof FirebaseError && error.code !== 'auth/popup-closed-by-user') {
                setError('Google sign-in failed. Please try again.');
            } else {
                console.error("Sign-in error:", error);
            }
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // const handleGoogleSignIn =  () => {
    //     signInWithPopup(auth, googleProvider)
    //         .then((result) => {
    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             const token = credential?.accessToken;
    //             console.log(token);
    //             // The signed-in user info.
    //             const user = result.user;
    //             console.log(user);
    //             setGoogleEmail(user.email);
    //             console.log(googleEmail);
    //             // IdP data available using getAdditionalUserInfo(result)
    //             // ...
    //         }).catch((error) => {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         console.log(errorCode);
    //         const errorMessage = error.message;
    //         console.log(errorMessage);
    //         // The email of the user's account used.
    //         const email = error.customData.email;
    //         console.log(email);
    //         // The AuthCredential type that was used.
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //         console.log(credential);
    //
    //     });
    // };


    const handleFacebookSignIn = async () => {
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential?.accessToken;
                console.log(accessToken);
                setFacebookEmail(user.email);
                console.log(facebookEmail);
                setIsAuthenticated(true);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                console.log(errorMessage);
                // The email of the user's account used.
                const email = error.customData.email;
                console.log(email);
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                console.log(credential);

                // ...
            });
    }

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        } else {
            setError('');
            setIsLoading(true);
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {

                const user = userCredential.user;
                console.log(user);
                setIsAuthenticated(true);

            }).catch((error: Error) => {
                throw new Error(`user signup failed with error: ${error}`);
            });
        }
        // Perform authentication logic here
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
    };
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleClear = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    return (
        <div className='Relative'>
            <div className='w-full flex flex-col justify-center items-center  gap-5 py-10'>
                <div
                    className='w-1/2 h-1/4 p-5 px-20 flex flex-row gap-x-10 border-2 justify-between items-center bg-blue-200'>
                    <h2 className='text-2xl font-bold font-sans bg-gradient-to-r from-indigo-300 to-purple-300 py-2 px-2 rounded-2xl w-1/3 text-center '>E-mail</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border-1 border-gray-500 rounded-md px-2 py-4 w-1/2'
                    />
                </div>
                <div
                    className='w-1/2 h-1/4 p-5 px-20 flex flex-row gap-x-10 border-2 justify-between items-center bg-blue-200'>
                    <h2 className='text-2xl font-bold font-sans bg-gradient-to-r from-indigo-300 to-purple-300 py-2 px-2 rounded-2xl w-1/3 text-center '>Password</h2>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border-1 border-gray-500 rounded-md px-2 py-4 w-1/2'
                    />
                </div>
                <div
                    className='relative  w-1/2 h-1/4 p-5 px-20  flex flex-row gap-x-10 border-2 justify-between items-center bg-blue-200'>
                    <h2 className='text-2xl font-bold font-sans bg-gradient-to-r from-indigo-300 to-purple-300 py-2 px-2 rounded-2xl w-1/3 text-center text-wrap '>Confirm
                        Password</h2>
                    <input
                        type="password"
                        placeholder="Re enter Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='border-1 border-gray-500 rounded-md px-2 py-4 w-1/2'
                    />
                    <span
                        className={`${error ? 'block' : 'hidden'} text-sm font-bold text-red-500 absolute bottom-0  right-0`}> {error} </span>
                    {/* Error Message */}
                    {error && (
                        <div className='w-1/2 px-20'>
                            <span className='text-sm font-bold text-red-600 bg-red-100 px-3 py-2 rounded-md block'>
                                {error}
                            </span>
                        </div>
                    )}



                </div>
                <div className='relative w-1/2 h-1/4 p-5 px-20 gap-x-5 flex flex-row justify-between items-center '>
                    <AuthButton
                        type="button"
                        disabled={false}
                        loading={isLoading}
                        variant="primary"

                        onClick={() => {
                            handleSubmit()
                        }}
                    >Submit </AuthButton>

                    <AuthButton
                        type="button"
                        disabled={isLoading}
                        loading={isLoading}
                        variant="primary"
                        onClick={handleGoogleSignIn}
                    >
                        Google Sign In
                    </AuthButton>

                    <AuthButton
                        type="button"
                        disabled={false}
                        loading={isLoading}
                        variant="primary"

                        onClick={() => {
                            handleFacebookSignIn().then((result) => {
                                console.log('Google Sign-In successful:', result);
                            }).catch((error: Error) => {
                                console.error('Google Sign-In failed:', error);
                            });
                        }}
                    >FaceBook Sign IN </AuthButton>

                    <AuthButton
                        type="button"
                        disabled={false}
                        loading={false}
                        variant="primary"
                        onClick={() => {
                            handleClear()
                        }}
                    >Cancel </AuthButton>
                    <span
                        className={`${googleEmail || facebookEmail ? 'block' : 'hidden'} text-sm font-bold text-green-700 absolute bottom-0 right-0`}>
                        {googleEmail ? `New Google email: ` : `New Facebook email: `}
                        <span className='text-amber-900'>
                            {googleEmail || facebookEmail}
                        </span> added to firebase database
                    </span>
                </div>
            </div>

        </div>
    )
}
export default AuthScreen
