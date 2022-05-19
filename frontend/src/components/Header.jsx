import React from 'react';
import logo from "../icon-left-font.png"
const Header = () => { 
    return(
    <div className='headerprofil'>
    
    <img className="logo" src={logo}/>
    <div className='header-right'>

     <a href='/'>Home</a>
     {localStorage.getItem("ROLE") ==="admin" &&<a href='/users'>admin</a>}

    <p>{localStorage.getItem("NAME")} {localStorage.getItem("LASTNAME")}</p>
    <button onClick={() => {
        localStorage.clear()
        window.location.replace("/")
    }}>deconnexion</button>

    </div>

    </div>)

}

export default Header