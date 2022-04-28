import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./shop.css";
import ShopForm from "./ShopForm";
import { format} from 'timeago.js';
import  timeago  from "../../timeAgo";
function Shop() {
  const user = useSelector((state) => state.users.userInfo);
  const [shop, setShop] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/api/shops/userShop/${user._id}`)
        .then(async (res) => {
          setShop(res.data);
          if (res.data) {
            const resOrders = await axios.get(
              `http://localhost:5000/api/orders/${res.data._id}`
            );
            setOrders(resOrders.data);        
          }
        });
    };
    fetchData();
  }, [setShop]);


let activeOrder = 0;
let rejectiveOrder = 0;
let confirmationOrder = 0;

if(orders.length > 0){
  orders.map(item =>{
    if(item.properties.active) activeOrder++;
    if(item.properties.rejective) rejectiveOrder++;
    if(item.properties.confirmation) confirmationOrder++;
  })
 
}
const orderConfirm = async(id)=>{
  await axios.patch(`http://localhost:5000/api/orders/${id}`,{properties:{confirmation:true,rejective:false,active:false}})
}
const orderReject = async(id)=>{
  await axios.patch(`http://localhost:5000/api/orders/${id}`,{properties:{confirmation:false,rejective:true,active:false}})
}
  // var orderBody = document.querySelector("#pending-order-center")
  // orderBody.scrollTop = orderBody.scrollHeight - orderBody.clientHeight

  return (
    <div className="shop">
      <div className="shop-wrapper">
        {shop ? (
          <div className="user-shop">
            <div className="shop-head-title"><h1>Merhaba <b>{shop.name}</b></h1></div>
            <div className="shop-statistics">
              <div className="grid-item">
                <b>Toplam Sipariş</b>
                <br />
                <div><i className="fa-solid total-icon fa-clipboard-list"></i>
                <span>{orders.length}</span>
               </div>
              </div>
              <div className="grid-item">
                <b>Bekleyen Sipariş</b>
                <br />
                <div>
                <i className="fa-solid wallet-icon fa-wallet"></i>
                <span style={{ color: "#474747" }}>{activeOrder}</span>
                </div>
              </div>
              <div className="grid-item">
                <b>Onaylanan Sipariş</b>
                <br />
                <div>
                 <i className="fa-solid confirm-icon fa-calendar-check"></i>
                 <span style={{ color: "#474747" }}>{confirmationOrder}</span>
                </div>
              </div>
              <div className="grid-item">
                <b>Reddedilen Sipariş</b>
                <br />
                <div>
                <i className="fa-solid rejective-icon fa-calendar-xmark"></i>
                <span style={{ color: "#474747" }}>{rejectiveOrder}</span>
              </div>
              </div>
            </div>
            <div className="shop-unconfirmed-order">
              <h1><b>{shop.name}</b> Bekleyen siparişleriniz {activeOrder>0 ? 'var!':'yok'}</h1> <br />
              <div className="pending-order-wrapper">
                {orders.reverse().map((order, id) => (
                   order.properties.active == true &&
                  <div key={id} className="pending-order">
                    { 
                      <>
                        <div className="pending-order-top">
                          <img src="../assets/noavatar.jpg" alt="profil-resmi" />
                          <div className="pending-order-title">
                            <span><b>
                            {order.user_id.name + " " + order.user_id.surname}
                          </b>
                          'in siparişi</span>
                          
                          <div  style={{display:"inline-block",marginLeft:"6px"}}>
                            <div className="new">Yeni</div></div>
                          </div>                          
                          <div className="pending-order-buttons"> 
                          <span><i className="fa-regular fa-clock"></i> {timeago(order.createdAt)}</span>
                          <button className="order-message-btn">Mesaj At</button>
                          <button onClick={()=>orderReject(order._id)} className="order-rejection-btn">
                            Reddet
                          </button>
                          <button onClick={()=>orderConfirm(order._id)} className="order-confirm-btn">Onayla</button>
                         
                         </div>
                        </div>
                        <div className="pending-order-center">
                          <table>
                            <thead>
                             { orders[id].meals.length>0 && <tr style={{color:"white",backgroundColor:"rgb(104 104 104)"}}>
                                <th>Yiyecek</th>
                                <th>Adet</th>
                                <th>Adet Fiyatı</th>
                              </tr>}
                            </thead>
     
                            <tbody>
                              { orders[id].meals.map((item,i) =>
                                 <tr key={i}>
                                <td className="order-meal-item">{item.name}</td>
                                <td className="order-meal-item">{item.quantity}</td>
                                <td className="order-meal-item">{item.price}₺</td>
                                </tr>                                                              
                             )}
                               
                               { orders[id].drinks.length>0 &&<tr style={{color:"white",backgroundColor:"rgb(104 104 104)"}}>
                                <td className="order-meal-item"><b>İçecek</b></td>
                                <td className="order-meal-item"><b>Adet</b></td>
                                <td className="order-meal-item"><b>Adet Fiyatı</b></td>
                              </tr>}
                               
                                {orders[id].drinks.map((item,i) =>
                                <tr key={i}>
                                <td className="order-meal-item">{item.name}</td>
                                <td className="order-meal-item">{item.quantity}</td>
                                <td className="order-meal-item">{item.price}₺</td>
                              </tr>
                                )}                              
                            </tbody>
                          </table>
                         
                        </div>
                        <div className="pending-order-btm">
                        <div className="pending-order-info">
                            <div className="pending-order-address">
                              <b>Address: </b>
                              <p>{order.address}</p>
                            </div>
                            <div className="pending-order-description">
                              <b>Not: </b>
                              <p>{order.description}</p>
                            </div>
                          </div>   
                          <div className="pending-order-btm-container">
                              <div>
                                <span style={{color:"#737980",fontSize:"17px",fontWeight:"bold"}}>Toplam</span>
                                <span><i class="fa-solid fa-box"></i><p>{orders[id].total.quantity} Adet</p></span>
                                <span>
                                  <i className="fa-solid fa-wallet"></i><p>{orders[id].total.totalAmount} ₺</p>
                                  </span>
                              </div>
                            </div>                            
                        </div>
                      </>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ShopForm />
        )}
      </div>
    </div>
  );
}

export default Shop;
