import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { exitUser } from "../../redux/reducer/user";
import "./sidebar.css"
function SideBar() {

  const dispatch = useDispatch();
    const exitHandle = (e)=>{
        e.preventDefault();
        dispatch(exitUser())
    }
    const user = useSelector(state => state.users.userInfo)

    return (
        <div className="side-bar">
        <div className="side-bar-profile">
          <img
            src="/assets/noavatar.jpg"
            className="user-profile"
            alt="profil-resmi"
          />
          <div className="user-name">{user.name+" "+user.surname}</div>
          <span className="user-type">
            <b>Üye türü:</b> {user.customer ? "Müşteri" : "Esnaf"}
          </span>
        </div>
        <div className="side-bar-buttons">
          {user.customer ? 
          <>            
              <Link to={"/"}><i className="fa-solid fa-house"></i>Anasayfa</Link>          
              <Link to={"/profile"}><i className="fa-solid fa-user"></i>Hesabım</Link>          
              <Link to={"/user/order"}><i className="fa-solid fa-file-lines"></i>Siparişlerim</Link>            
              <Link onClick={exitHandle} to={"/login"}><i className="fa-solid fa-arrow-right-from-bracket"></i>Çıkış</Link>            
          </>
          :
          <>
            <Link to={"/"}><i className="fa-solid fa-house"></i>Anasayfa</Link>          
            <Link to={"/profile"}><i className="fa-solid fa-user"></i>Hesabım</Link>     
            <Link to={"/profile/shop/"}><i className="fa-solid fa-shop"></i>Dükkanım</Link>
            <Link to={"/shop/order"}><i className="fa-solid fa-file-lines"></i>Siparişler</Link>              
            <Link to={"/login"} onClick={exitHandle} ><i className="fa-solid fa-arrow-right-from-bracket"></i>Çıkış</Link>     
          </>

        }
        </div>
      </div>
    );
}

export default SideBar;