import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import "./topbar.css"

function TopBar({props}) {
    const user = useSelector(state => state.users.userInfo)
    return (
        <div className='topbar' >
            <Link to={"/"} className='logo'>SiparişTakip</Link>            
            <div className='right'>
                {!user ? 
                <div className='buttons-tb'>                    
                <Link className='login-button-tb' to={"/login"}>Giriş</Link>
                <Link className='register-button-tb' to={"/register"}>Kaydol</Link>
                </div>
                : 
                <div className='interface-center'>
                {props === "user" &&
                <div className='interface-search-bar'>
                <label htmlFor="searchicon"><i className="fas searchbar-icon fa-search"></i></label>
                    <input id="searchicon" className="searchbar-input" 
                    placeholder="Aramak istediğinizi birkaç kelime ile buraya yazın..."/>
                    <button className='search-button'>Ara</button>
                </div>}
               </div>
                }
            </div>
        </div>
    );
}

export default TopBar;