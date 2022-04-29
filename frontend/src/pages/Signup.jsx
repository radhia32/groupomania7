import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'

 
function Signup () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setNom] = useState('');         
    const [prenom, setPrenom] = useState('');
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
              name='nom'
              placeholder='Entrer votre nom'
              value={nom} 
              onChange={(e) => setNom(e.target.value)}
              
            />

            <input 
              name='prenom'
              placeholder='Entrer votre prenom'
              value={prenom} 
              onChange={(e) => setPrenom(e.target.value)}
              
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
        const user = await axios.post('http://localhost:4000/api/user/signup', {email, password,nom,prenom, role: 'user'})
            navigate("/login")
                console.log("email =====", email)
                console.log("password =====", password)
            }}>Inscription</button>
        </div>
    )
}

export default Signup;