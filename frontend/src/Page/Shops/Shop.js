import React from "react";
import { Link } from "react-router-dom";
import "./shop.css";
function Shop({props}) {
 
  let minPrice = 0;
  props.meals.map((meal,id) =>{
    if(id === 0) minPrice = parseInt(meal.price) ;
    else if(minPrice > parseInt(meal.price)) minPrice = parseInt(meal.price) ;
  }) 
  console.log(props)
  return (
    <div className="shops">
      <div className="star-area">
          <i className="fa-solid fa-star"></i>
          <p className="rate">{props.raiting}</p>
          <p className="count">(25)</p>
        </div>
      <div className="shops-img">
        <img src="./assets/foto3.jpg" alt="resim" />
      </div>
        <div className="shops-center">
          <div>
          <div className="shop-item-profile"><img src="./assets/noavatar.jpg" alt="resim" /></div>
          <div className="shop-item-profile-wrapper">
            <div className="shop-item-profile-name">
              <p style={{color:"black",fontWeight:"700"}}>{props.name}</p>
              <p style={{color:"#8b95a1",lineHeight:"1.6"}}>{props.user_id.name}</p>
            </div>
            <div className="shop-item-profile-price">
              <p className="min-price">{minPrice}<span>TL</span></p>
              <p className="begining">İle başlayan</p>
            </div>
          </div>
          </div>
         
          
        </div>
        <div className="shops-description">
             <p style={{marginBottom:"5px"}}>
             {props.description.charAt(0).toUpperCase()+props.description.slice(1)}
             </p>
             <p>
               <b>Adres:</b>
             {" "+props.address.charAt(0).toUpperCase()+props.address.slice(1)}
             </p>
             <i style={{marginTop:"3px",fontSize:"13px",position:"absolute",right:"5px",color:"#919190"}}>Haliliye/Şanlıurfa</i>
          </div>
          <div className="shop-item-bottom">
             <p></p>
             <Link className="shops-bottom" to={`/order/${props.user_id._id}`}>
             Sipariş Ver
            </Link>
          </div>
        
      
     </div>
  );
}

export default Shop;
