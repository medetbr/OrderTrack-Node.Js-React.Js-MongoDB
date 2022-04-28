import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getUserAsync} from "../../redux/reducer/user"
import "./login.css"
import TopBar from '../../components/TopBar/TopBar';
import Footer from '../../components/Footer/Footer';
function Login() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e)=>{
      e.preventDefault();
      dispatch(getUserAsync({username:username,password:password}))
    }
    const loading = useSelector(state => state.users.isLoading)
    const error = useSelector(state => state.users.error)

    return (
      <> <TopBar/>
        <div className='login'>
          <p className='description'> <b>Sipariş Takip</b>'e üye olarak çevrenizdeki yakın esnaflardan 
          yiyecek ve içecek siparişi<br/>  verebilirsiniz ve
          sipariş durumunuzun kontrolünü sağlayabilirsiniz ya da esnaf olarak üye olup,<br/>
          gelen siparişleri sistem üzerinden görüntüleyip, siparişleri eksiksiz<br/> ve zamanında hedef noktasına ulaştırabilirsiniz.  
          </p>
          <div className='login-wrapper'>
            <h3 className='login-title'>Giriş</h3>
            
              <label className='username-label' htmlFor='username'>Kullanıcı adı
              <input autoFocus placeholder='Kullanıcı adı giriniz..' onChange={e => setUsername(e.target.value)} className='username-input' id='username' type="text"/></label>

              <label className='password-label' htmlFor='password'>Şifre
              <input placeholder='Şifre giriniz..' onChange={e => setPassword(e.target.value)} className='password-input' id='password' type="password"/></label>

              <div className='buttons'>
                <button onClick={handleSubmit} className='button-login'>{loading ? <i className="fa-solid fa-spinner"></i> :"Giriş"}</button>
              </div>
              <a href='/#' className='password-forget'>Şifrenizi mi unuttunuz?</a>
              <br/>
              <div className='error'>{error && error}</div>
            
          </div>
        </div><Footer/></>
    );
}

export default Login;