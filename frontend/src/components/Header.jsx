import React from 'react';

const Header = () => {
   return( <div style={{ display: 'flex', gap:'10px',position: 'relative',
   marginBottom: '180px',backgroundColor:'red'}}>
    <a>Home</a>
    <a>profil</a>
    <p>{localStorage.getItem("NAME")} {localStorage.getItem("LASTNAME")}</p>
    <button onClick={() => {
        localStorage.clear()
        window.location.replace("/login")
    }}>deconexion</button>
    </div>)
}

export default Header