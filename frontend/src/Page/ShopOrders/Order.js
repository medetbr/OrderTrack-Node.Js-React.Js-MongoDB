import axios from "axios";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar/TopBar";
import "./order.css"
import { useSelector } from "react-redux";
import timeago from "../../timeAgo";

function Order() {
  const user = useSelector((state) => state.users.userInfo);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/api/shops/userShop/${user._id}`)
        .then(async (res) => {
          if (res.data) {
            const resOrders = await axios.get(
              `http://localhost:5000/api/orders/${res.data._id}`
            );
            setOrders(resOrders.data);        
          }
        });
    };
    fetchData();
  }, [setOrders]);


const orderConfirm = async(id)=>{
  await axios.patch(`http://localhost:5000/api/orders/${id}`,{properties:{confirmation:true,rejective:false,active:false}})
}
const orderReject = async(id)=>{
  await axios.patch(`http://localhost:5000/api/orders/${id}`,{properties:{confirmation:false,rejective:true,active:false}})
}

  return (
    <>
    
      <TopBar />
      
      <div className="order">
          <SideBar />
                   
          {orders.length<1 ? 
          <div style={{flex:"10", textAlign:"center", fontSize:"20px"}}><h1>Tüm Sipariş Geçmişi</h1> Hiç siparişiniz yok :(

          </div> :
          <div className="shop-order-wrapper"> 
             <h1>Tüm Sipariş Geçmişi</h1>          
                {orders.reverse().map((order, id) =>  (
                  <div key={id} className="pending-order">
                    {       
                      <>                      
                      <div className="pending-order-top">
                        <img src="../assets/noavatar.jpg" alt="profil-resmi" />
                        <div className="pending-order-title">
                          <span><b>
                          {order.user_id.name + " " + order.user_id.surname}
                        </b>
                        'in Siparişi</span>                          
                        <div  style={{display:"inline-block",marginLeft:"6px"}}>
                          <div className={`${
                            order.properties.active && "active" ||
                            order.properties.confirmation && "confirmed" ||
                            order.properties.rejective && "denied" 
                            }`}>{
                              order.properties.active && "Bekleniyor" ||
                              order.properties.confirmation && "Onaylandı" ||
                              order.properties.rejective && "Reddedildi" 
                              }</div></div>
                        </div>                          
                        <div className="pending-order-buttons"> 
                        <span><i className="fa-regular fa-clock"></i> {timeago(order.createdAt)}</span>
                         <button className="order-message-btn">Mesaj At</button>
                         { order.properties.active ? <> <button onClick={()=>orderReject(order._id)} className="order-rejection-btn">
                            Reddet
                          </button>
                          <button onClick={()=>orderConfirm(order._id)} className="order-confirm-btn">Onayla</button> </>
                          :<button onClick={()=>orderConfirm(order._id)} className="order-confirm-btn">Gönder</button>}                   
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
              </div>}
            </div>
    </>
  );
}

export default Order;
