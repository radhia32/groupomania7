import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState (false)
    const navigate = useNavigate()
    return (
        <div>   
   
            <h3>Login</h3>
            <input 
              name='email'
              placeholder='Entrer votre email'
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name='password' 
              placeholder='Entrer votre password'
              value={password}
              // onChange la fonction qui sera executer au moment de saisie
              // setPassword la fonction qui permet de changer le password
              // e.target.value valeur taper dans l'input
              onChange={(e) => setPassword(e.target.value)}

              />
<button onClick={async() => {       
try {const user =await axios.post('http://localhost:4000/api/user/login', {email, password})

if(user.status === 200) {  setError(false)
  //pour stocker nos information ds le local storage pour persister les données
    localStorage.setItem("TOKEN", user.data.token);
    localStorage.setItem("USERID", user.data.userId);
    localStorage.setItem("NAME", user.data.lastName);
    localStorage.setItem("LASTNAME", user.data.firstName);
    navigate("/")}   

console.log("user =====", user)

}

  catch (err ) {setError(true)
    console.log(err)
    console.log("err =====", err)
    
  }           
            }}>Connexion</button>{error && <p>verifier vos credentiels</p> }


        </div>
    )
}

export default Login;