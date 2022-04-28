import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync } from "../../redux/reducer/user";
import Footer from "../../components/Footer/Footer";
import TopBar from "../../components/TopBar/TopBar";
import "./register.css";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [isCustomer, setIsCustomer] = useState(true);
  const dispatch = useDispatch();

  const registerHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUserAsync({
        username: username,
        password: password,
        customer: isCustomer,
        email:email,
        name:name,
        surname:surname
      }));
  };
  
  const error = useSelector(state => state.users.createUser.error)
  const loading = useSelector(state => state.users.createUser.isLoading)

  return (
    <> 
    <TopBar/>
    <div className="register">
    <p className='descriptin'> <b>Sipariş Takip</b>'e üye olarak çevrenizdeki yakın esnaflardan 
          yiyecek ve içecek siparişi<br/>  verebilirsiniz ve
          sipariş durumunuzun kontrolünü sağlayabilirsiniz ya da esnaf olarak üye olup,<br/>
          gelen siparişleri sistem üzerinden görüntüleyip, siparişleri eksiksiz<br/> ve zamanında hedef noktasına ulaştırabilirsiniz.  
          </p>
      <div className="register-wrapper">
        <h3 className="register-title">Kaydol</h3>
      <form onSubmit={registerHandleSubmit}>
        <label className="name-label" htmlFor="name">
          Ad
          <input
            required={true}
            placeholder="Ad giriniz.."
            onChange={(e) => setName(e.target.value)}
            className="name-input"
            id="name"
            type="text"
          />
        </label>
        <label className="surname-label" htmlFor="surname">
          Soyad
          <input
            required={true}
            placeholder="Soyad giriniz.."
            onChange={(e) => setSurname(e.target.value)}
            className="surname-input"
            id="surname"
            type="text"
          />
        </label>

        <label className="username-label" htmlFor="username">
          Kullanıcı adı
          <input
            required={true}
            placeholder="Kullanıcı adı giriniz.."
            onChange={(e) => setUsername(e.target.value)}
            className="username-input"
            id="username"
            type="text"
          />
        </label>
        <label className="password-label" htmlFor="password">
          Şifre
          <input
            required={true}
            placeholder="Şifre giriniz.."
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
            id="password"
            type="password"
          />
        </label>
        <label className="email-label" htmlFor="email">
          E-mail
          <input
            required={true}
            placeholder="E-mail giriniz.."
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
            id="email"
            type="email"
          />
        </label>
        <label className="customer-radio"><input name="customer" onChange={()=> setIsCustomer(true)} defaultChecked={true}  type="radio"/>Müşteri</label>
        <label className="shop-radio"><input name="customer" onChange={()=> setIsCustomer(false)} type="radio"/>Esnaf</label>
        <div className="buttons">
          <button  className="button-registr">{loading ? <i class="fa-solid fa-spinner"></i> :"Kaydol"}</button>
        </div>
        </form>
        <div className='error'>{error && error}</div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Register;
