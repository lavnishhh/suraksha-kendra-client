import React, { useState, useEffect, useContext, useRef } from 'react';
// import { googleProvider, auth } from '../../firebase/main';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../constants/context';
import { auth, googleProvider } from '../../controllers/firebase/main';
import { spinner } from '../../constants/spinner';

function LoginScreen() {

    const context = useContext(UserContext);
    const user = context.user;


    const navigate = useNavigate()

    useEffect(() => {
        if (auth?.currentUser != null) {
            navigate('/')
        }
    }, [user])

    
    return <>
        <LogInComponent onSignInCallback={() => { navigate('/') }}></LogInComponent>
    </>
}

function LogInComponent(props) {

    const { onSignInCallback = () => { }, title = 'Create an account' } = props;

    const [showOverlay, setShowOverlay] = useState(true);
    const overlayContent = useRef(spinner);

    const context = useContext(UserContext);
    const user = context.user;

    const [isSignUpMode, setIsSignUp] = useState(false)

    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    useEffect(() => {
        if (user == null) {
            setShowOverlay(false);
        }
    }, [user])


    if (user === -1 || user != null) {
        // While the auth state is being determined
        return <><Overlay
            showOverlay={showOverlay}
            setShowOverlay={setShowOverlay}
            overlayContent={overlayContent}
        /></>;
    }

    const handleSignOut = () => {
        auth.signOut();
    };

    const showError = (error) => {
        overlayContent.current = generateSingleButtonModal(error, 'Try again', () => { setShowOverlay(false) })
    }

    const handleSignInWithEmailAndPassword = async () => {
        if (showOverlay) {
            return;
        }
        overlayContent.current = spinner;
        setShowOverlay(true);
        try {
            await signInWithEmailAndPassword(auth, emailText, passwordText);
            setShowOverlay(false);
            onSignInCallback();
        } catch (error) {
            console.log(error)
            const errorMessage = getErrorMessage(error.code);
            console.log(errorMessage);
            setShowOverlay(false);
            showError(errorMessage);
        }
    };

    const handleSignUpWithEmailAndPassword = async (passwordConfirmText) => {
        if (showOverlay) {
            return;
        }
        overlayContent.current = spinner;
        setShowOverlay(true);
        if (passwordConfirmText !== passwordText) {
            showError("Passwords do not match.");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, emailText, passwordText);
            setShowOverlay(false);
            onSignInCallback();
        } catch (error) {
            console.log(error)
            const errorMessage = getErrorMessage(error.code);
            console.log(errorMessage);
            setShowOverlay(false);
            showError(errorMessage);
        }
    };

    const handleSignInWithGoogle = async () => {
        if (showOverlay) {
            return;
        }
        overlayContent.current = spinner;
        setShowOverlay(true);
        try {
            await signInWithPopup(auth, googleProvider);
            setShowOverlay(false);
            onSignInCallback();

        } catch (error) {
            console.log(error)
            const errorMessage = getErrorMessage(error.code);
            console.log(errorMessage);
            setShowOverlay(false);
            showError(errorMessage);
        }
    };


    return (
        <>
            <Overlay
                showOverlay={showOverlay}
                setShowOverlay={setShowOverlay}
                overlayContent={overlayContent}
            />
            <section className="flex-grow inset-0">
                <div className="flex flex-col items-center justify-center md:px-6 md:py-8 lg:py-0">
                    <div className="md:mt-10 w-full bg-white rounded-lg sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-semibold text-gray-900 md:text-2xl">
                                {title}
                            </h1>
                            <div className='grid'>
                                <button onClick={handleSignInWithGoogle} className='flex justify-start items-center border border-gray-300 rounded-lg p-2.5 ps-4'>
                                    <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                                    <span className='text-sm font-medium text-gray-800'>Sign in with Google</span>
                                </button>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <hr className="h-px bg-gray-200 border-0 flex-grow"></hr>
                                <span className='font-medium text-gray-500'>OR</span>
                                <hr className="h-px bg-gray-200 border-0 flex-grow"></hr>
                            </div>
                            <form className=""  >
                                <div className='mb-2'>
                                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">Email</label>
                                    <input onChange={(e) => { setEmailText(e.target.value) }} value={emailText} type="email" id="email" className="peer w-full flex-grow block p-3 text-sm  border rounded-lg text-black disabled:cursor-not-allowed invalid:text-red-500 " placeholder="Type here" required />
                                    <p className="mt-1 invisible peer-invalid:visible text-pink-600 text-xs">Please provide a valid email.</p>
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900">Password</label>
                                    <input onChange={(e) => { setPasswordText(e.target.value) }} pattern="^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$" value={passwordText} type="password" id="password" className="peer w-full flex-grow block p-3 text-sm  border rounded-lg text-black disabled:cursor-not-allowed invalid:text-red-500 " placeholder="Type here" title="Password must be exactly 8 characters long, with at least one uppercase letter, one lowercase letter, and one digit." required />
                                    <p className="mt-1 invisible peer-invalid:visible text-pink-600 text-xs">Please provide a stronger password.</p>
                                </div>
                                {isSignUpMode
                                    ? <SignUpComponent onSubmit={handleSignUpWithEmailAndPassword} onModeChange={() => { setIsSignUp(false) }} passwordText={passwordText}></SignUpComponent>
                                    : <SignInComponent onSubmit={handleSignInWithEmailAndPassword} onModeChange={() => { setIsSignUp(true) }}></SignInComponent>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function SignInComponent(props) {

    const { onSubmit, onModeChange } = props;

    return <>
        <button type='submit' className="mt-5 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={onSubmit}>Sign In</button>
        <p className="text-sm mt-2 font-light text-gray-500">
            Don't have an account? <span onClick={onModeChange} className="font-medium text-primary-600 hover:underline cursor-pointer">Sign up</span>
        </p>
    </>
}

function SignUpComponent(props) {

    const { onSubmit, onModeChange, passwordText } = props;

    const passwordConfirmRef = useRef(null);


    return <>
        <div className='mb-2'>
            <label htmlFor="confirm-password" className="block mb-1 text-sm font-medium text-gray-900">Confirm password</label>
            <input ref={passwordConfirmRef} pattern={passwordText} type="password" id="confirm-password" className="peer w-full flex-grow block p-3 text-sm  border rounded-lg text-black disabled:cursor-not-allowed invalid:text-red-500 " placeholder="Type here" required />
            <p className="mt-2 invisible peer-invalid:visible text-primary-600 text-xs">Passwords do not match.</p>
        </div>

        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 accent-primary-500" required />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">I accept the <a className="font-medium text-primary-600 hover:underline" >Terms and Conditions</a></label>
            </div>
        </div>
        <button onClick={() => { onSubmit(passwordConfirmRef.current.value) }} className="mt-5 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" >Create an account</button>
        <p className="text-sm mt-2 font-light text-gray-500">
            Already have an account? <span className="font-medium text-primary-600 hover:underline cursor-pointer" onClick={onModeChange}>Login here</span>
        </p></>
}

const Overlay = ({ showOverlay, setShowOverlay, overlayContent, dismissable }) => {
    return showOverlay ? createPortal(
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-500 bg-opacity-60">
            {dismissable == true &&
                <div onClick={() => { setShowOverlay(false) }} className="bg-white rounded-full border p-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>}
            {overlayContent.current}
        </div>,
        document.body
    ) : null;
};


const getErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/invalid-credential':
            return 'The credentials are valid. Please Try again.';
        case 'auth/user-disabled':
            return 'The user account has been disabled.';
        case 'auth/user-not-found':
            return 'No user found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/email-already-in-use':
            return 'The email address is already in use by another account.';
        case 'auth/weak-password':
            return 'The password is too weak. It should be at least 6 characters long.';
        case 'auth/operation-not-allowed':
            return 'This operation is not allowed. Please contact support.';
        case 'auth/too-many-requests':
            return 'Too many requests. Please try again later.';
        case 'auth/popup-closed-by-user':
            return 'The popup was closed before the authentication was completed.';
        case 'auth/cancelled-popup-request':
            return 'The popup request was cancelled.';
        default:
            return 'An unknown error occurred. Please try again later.';
    }
};

export { LoginScreen, LogInComponent };
