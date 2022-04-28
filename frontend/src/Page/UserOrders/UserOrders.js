import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux"
import axios from "axios"
import TopBar from "../../components/TopBar/TopBar"
import SideBar from "../../components/SideBar/SideBar"
import "./userOrder.css"
import timeago from '../../timeAgo';
function UserOrders() {
    const [orders,setOrders] = useState([])
    const user = useSelector(state => state.users.userInfo);
    
    useEffect(()=>{
        const fetchOrders = async ()=>{
            const res = await axios.get(`http://localhost:5000/api/orders/find/${user._id}`)
            setOrders(res.data)
        }
        fetchOrders();
    },[setOrders])
    console.log(orders)
    const deleteOrder = async(id)=>{
      await axios.delete(`http://localhost:5000/api/orders/${id}`)
    }
    return (
        <>
        <TopBar />        
        <div className='user-orders'>
        <SideBar />      
        <div className='user-orders-wrapper'>
          <div className='user-order-head'>
             <div className='user-order-head-title'>Tüm Siparişleriniz
          </div></div>
        {orders.length<1 ?<div>Hiç siparişiniz yok</div>:orders.reverse().map((order, id) => (
                  <div key={id} className="pending-order">
                    { 
                      <>                      
                        <div className="pending-order-top">
                          <img src="../assets/noavatar.jpg" alt="profil-resmi" />
                          <div className="pending-order-title">
                            <span><b>
                            {order.shop_id.name}
                          </b>
                          'in Dükkanı</span>                          
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
                          <button disabled={order.properties.confirmation} onClick={()=> deleteOrder(order._id)}  className="order-delete-btn">
                            İptal Et
                          </button>                        
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
        </>
    );
}

export default UserOrders;