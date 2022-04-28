import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RightBar from "../../components/RightBar/RightBar";
import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar/TopBar";
import { updateUserAsync } from "../../redux/reducer/user";
import "./profil.css";

function Profil() {
  const user = useSelector((state) => state.users.userInfo);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPasswordChange, setErrorPasswordChange] = useState(null);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [surname, setSurname] = useState(user.surname);

  const dispatch = useDispatch();
  const error = useSelector(state => state.users.error)
  const successful = useSelector(state => state.users.successful)

  const profilSave = (e) => {
    if (password.length > 0 || confirmPassword.length > 0) {
      if (
        password === confirmPassword &&
        password.length > 5 &&
        confirmPassword.length > 5
      ) {
        dispatch(
          updateUserAsync({
            user_id: user._id,
            name,
            surname,
            email,
            password,
          })
        );
      }else{
        setErrorPasswordChange("Girdiğiniz şifreler aynı ve en az 6 karakterden oluşmalı.")
      } 
    } else {
      dispatch(
        updateUserAsync({
          user_id: user._id,
          name,
          surname,
          email,
        })
      )
    }
  };

  return (
    <>
      <TopBar />

      <div className="user-interface">
        <SideBar />
        <div className="feed" style={{flex:"10.3"}}>
          <div className="profil">
            <div className="profil-head">
              <h1> Hesabım </h1>
              <div className="profil-img">
                <img src="../assets/noavatar.jpg" alt="profil-resmi" />
                <br />
                <span className="profil-change">değiştir</span>
              </div>
            </div>
            
            <div className="profil-center">
              {error && <div className="profil-update-error">{ error}</div>}
              {errorPasswordChange && <div className="profil-update-error">{ errorPasswordChange}</div>}
              {successful && <div className="profil-update-succesful" >{successful}</div>}

              <label className="label-name">
                Adı
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                />
              </label>
              <label className="label-surname">
                Soyadı
                <input
                  onChange={(e) => setSurname(e.target.value)}
                  value={surname}
                  type="text"
                />
              </label>
              <label className="label-email">
                E-Mail
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                />
              </label>
              <label className="label-username">
                Username
                <input value={user.username} disabled type="text" />
              </label>
              <div style={{color:"red",margin:"20px 0"}}>Şifrenizi değiştirmek istemiyorsanız alttaki boşlukları boş bırakın</div>
              <label className="label-password">
                Şifre
                <input
                placeholder="Yeni şifreni gir"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </label>
              <label className="label-password">
                Şifre Onayla
                <input
                placeholder="Şifrenizi tekrar girin"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                />
              </label>
              <button onClick={profilSave} className="profil-save-btn">
              Kaydet
              </button>
            </div>
          </div>
        </div >
       
      </div>
    </>
  );
}

export default Profil;
