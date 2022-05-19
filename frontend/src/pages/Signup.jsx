import React, { useState } from 'react';
import axios from "axios";


function Signup ({ setCurrentForm }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setNom] = useState('');         
    const [prenom, setPrenom] = useState('');
    const [error, setError] = useState (false)
    return (
        <div>   

            <h3>Inscription</h3>
            <input 
               className='inputForm'
              name='email'
              placeholder='Entrer votre email'
              value={email} 
              onChange={(e) => setEmail(e.target.value)}

            />
            <input 
               className='inputForm'
              name='nom'
              placeholder='Entrer votre nom'
              value={nom} 
              onChange={(e) => setNom(e.target.value)}
              
            />

            <input 
              className='inputForm'
              name='prenom'
              placeholder='Entrer votre prenom'
              value={prenom} 
              onChange={(e) => setPrenom(e.target.value)}
              
            />
            <input
              className='inputForm'
              name='password' 
              placeholder='Entrer votre password'
              value={password}
              type="password"
              // onChange la fonction qui sera executer au moment de saisie
              // setPassword la fonction qui permet de changer le password
              // e.target.value valeur taper dans l'input
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
             className='inputForm'
              onClick={async() => {
                try {
        const user = await axios.post('http://localhost:4000/api/user/signup', {email, password,nom,prenom, role: 'user'})
        console.log("user", user)
        if(user.status === 201) { 
           setError(false)
           setCurrentForm("signin")
        } 
        
        }
        
          catch (err ) {setError(true)
           
        }        
            }}>Inscription</button>
        {error && <p>verifier vos données</p> }
        </div>
    )
}

export default Signup;