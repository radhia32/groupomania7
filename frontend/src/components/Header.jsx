import React from 'react';
import logo from "../icon-left-font.png"
const Header = () => { 
    return(
    <div className='headerprofil'>
    
    <img className="logo" alt="" src={logo}/>
    <div className='header-right'>

     <a className="header-link" href='/'>Home</a>
     {localStorage.getItem("ROLE") ==="admin" &&<a className='header-link' href='/users'>admin</a>}

    <p>{localStorage.getItem("NAME")} {localStorage.getItem("LASTNAME")}</p>
    <button onClick={() => {
        localStorage.clear()
        window.location.replace("/")
    }}>deconnexion</button>

    </div>

    </div>)

}

export default Header