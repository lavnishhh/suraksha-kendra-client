import React, { useContext, useEffect, useRef, useState } from "react"

import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { UserContext } from "../../constants/context";
import { GLOBAL_LOADING_STATE } from "../../constants/constsants";
import { spinner } from "../../constants/spinner";

function DashboardScreen(){

    const context = useContext(UserContext);
    const user = context.user;

    const [isSignUpMode, setIsSignUp] = useState(false)

    const [showOverlay, setShowOverlay] = useState(true);

    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const navigate = useNavigate()


    const overlayContent = useRef(spinner);

    useEffect(()=>{
        if(user == null){
            navigate('/login')
        }
        if(user != null){
            setShowOverlay(false);
        }
    }, [user])


    if (user === GLOBAL_LOADING_STATE) {
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

    if(!user){
        return <div className="flex justify-center flex-grow items-center">{spinner}</div>
    }

    return <>
        <div>
            <h1 className="text-2xl font-medium text-gray-600">Welcome, {user.displayName || user.email}</h1>
        </div>
    </>
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

export default DashboardScreen