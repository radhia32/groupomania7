import React, { useState} from 'react'
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Auth = () => {
    const [currentForm, setCurrentForm] = useState('signup');
    return (
        <div>
            <button onClick={() => setCurrentForm("signup")}>s'inscrire</button>
            <button onClick={() => setCurrentForm("signin")}>Se connecter</button>
            {currentForm ==='signup' ? <Signup setCurrentForm={setCurrentForm}/> : <Login/>}
        </div>
    )
}

export default Auth;