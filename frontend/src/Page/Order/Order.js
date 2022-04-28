import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar/TopBar";
import "./order.css";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

function Order() {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [total, setTotal] = useState(0);
  const [drinks, setDrinks] = useState([]);
  const [meals, setMeals] = useState([]);
  const user = useSelector((state) => state.users.userInfo);

  useEffect(() => {
    const fetchData = async () => {
      const resShop = await axios.get(`http://localhost:5000/api/shops/${id}`);
      setShop(resShop.data);
      setLoading(false);
    };
    fetchData();
  }, [setShop]);
  const addToBillDrink = (e) => {
    e.preventDefault();
    const findItem = shop.drinks.filter((item, id) => id == e.target.id);
    const isItem = drinks.find((item) => item.name == findItem[0].name);
    if (!isItem) {
      const newObje = {
        id: nanoid(),
        name: findItem[0].name,
        price: parseInt(findItem[0].price),
        quantity: 1,
      };
      setDrinks([...drinks, newObje]);
    }
  };
  const addToBillMeal = (e) => {
    e.preventDefault();
    const findItem = shop.meals.filter((item, id) => id == e.target.id);
    const isItem = meals.find((item) => item.name == findItem[0].name);
    if (!isItem) {
      const newObje = {
        id: nanoid(),
        name: findItem[0].name,
        price: parseInt(findItem[0].price),
        quantity: 1,
      };
      setMeals([...meals, newObje]);
    }
  };
  const mealsItemDelete = (id) => {
    const updatedMeals = meals.filter((item) => item.id !== id);
    setMeals(updatedMeals);
  };
  const drinksItemDelete = (id) => {
    const updatedDrinks = drinks.filter((item) => item.id !== id);
    setDrinks(updatedDrinks);
  };
  const mealQuantity = (id, value) => {
    const updatedMeals = meals.map((item) => {
      if (item.id === id) {
        item.quantity = value;
        return item;
      } else return item;
    });
    setMeals(updatedMeals);
  };
  const drinkQuantity = (id, value) => {
    const updatedDrinks = drinks.map((item) => {
      if (item.id === id) {
        item.quantity = value;
        return item;
      } else return item;
    });
    setDrinks(updatedDrinks);
  };
  useEffect(() => {
    let total = 0;
    meals.map((item) => {
      total += item.price * item.quantity;
    });
    drinks.map((item) => {
      total += item.price * item.quantity;
    });
    setTotal(total);
  }, [drinks, meals]);

  const createBill = async () => {
    if (window.confirm("Siparişi onaylıyor musunuz?")) {
      const orderObj = {
        user_id: user._id,
        shop_id: shop._id,
        meals: convertMeals(meals),
        drinks: convertMeals(drinks),
        address,
        description: note,
      };
      await axios.post("http://localhost:5000/api/orders/", orderObj);
      setAddress("");
      setNote("");
      setDrinks([]);
      setMeals([]);
    }
  };
  const convertMeals = (e) => {
    var newObj = [];
    e.map((item) => {
      const { id, ...others } = item;
      newObj.push({ ...others });
    });
    return newObj;
  };
  return (
    <>
      <TopBar />

      <div className="order">
        <SideBar />

        <div className="order-wrapper">
          {!loading && (
            <>
              <div className="order-wrapper-left">
                <div className="left-container">
                  <div className="order-title">
                    <p>{shop.name}</p>
                  </div>
                  <div className="order-img">
                    <img src="/assets/foto2.jpg" alt="dükkan-resim" />
                  </div>
                  <div className="order-description">
                    <h3>Dükkan Hakkında</h3>
                    <p>{shop.description}</p>
                  </div>
                  <div className="order-address">
                    <h3>Adres</h3>
                    <p>{shop.address}</p>
                  </div>
                </div>
                {//yorum kısmı
                  /*
                <div style={{ marginTop: "35px" }} className="left-container">
                  <div className="reviews-head">
                    <div className="reviews-title">Beğeni ve Yorumlar</div>
                  </div>
                   <div className="review-comments">
                    <div>
                      <div style={{ display: "flex" }}>
                        <span>
                          <img
                            className="comment-user-profile"
                            src="/assets/noavatar.jpg"
                            alt="profil-resim"
                          />
                        </span>
                        <div className="comment-user-name">
                          <span>
                            <p>Medetb</p>
                          </span>
                        </div>
                        <p className="comment-date">2 gün önce</p>
                      </div>
                      <div className="comment-text">
                        <p style={{color:"#878d94"}}>Fiyatlar uygun,yemekler güzel tavsiye ederim</p>
                      </div>

                      <div className="reply-comment">
                        <div style={{ display: "flex",alignItems:"center" }}>
                          <span>
                            <img
                              className="comment-user-profile"
                              src="/assets/noavatar.jpg"
                              alt="profil-resim"
                            />
                          </span>
                        </div>
                        <div className="reply-comment-text-wrapper">
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            <span style={{marginTop:"6px",color:"rgb(75, 79, 82)"}}>Aliusta</span>
                          </div>
                          <div style={{display:"flex"}}>
                            <span className="reply-comment-text">Çok teşekkür ederim :)</span>
                          </div>
                        </div>

                      </div>
                      <div className="seperator"></div>
                    </div>
                    <div>
                      <div style={{ display: "flex" }}>
                        <span>
                          <img
                            className="comment-user-profile"
                            src="/assets/noavatar.jpg"
                            alt="profil-resim"
                          />
                        </span>
                        <div className="comment-user-name">
                          <span>
                            <p>Medetb</p>
                          </span>
                        </div>
                        <p className="comment-date">2 gün önce</p>
                      </div>
                      <div className="comment-text">
                        <p style={{color:"#878d94"}}>Fiyatlar uygun,yemekler güzel tavsiye ederim</p>
                      </div>                      
                      <div className="seperator"></div>
                    </div>
                  </div> 
                </div>*/}
              </div>
              <div className="order-wrapper-right">
                <div className="right-container">
                  <div className="order-right-title">
                    <p>Menü</p>
                  </div>
                  <div className="order-menu-meals">
                    <p
                      style={{
                        fontSize: "23px",
                        color: "#4e5e4e",
                        textAlign: "center",
                        marginBottom: "5px",
                      }}
                    >
                      Yiyecekler
                    </p>
                    <div className="order-menu-container">
                      {shop.meals.map((item, i) => (
                        <div key={i} className="meal-card">
                          <div className="card-img">
                            <img src="/assets/foto2.jpg" alt="yemek-resim" />
                          </div>
                          <div className="card-title">
                            <p>{item.name}</p>
                            <p
                              style={{
                                height: "25px",
                                fontSize: "20px",
                                margin: "4px 0",
                                color: "#5e5e5e",
                                fontWeight: "600",
                              }}
                            >
                              {item.price} ₺
                            </p>
                          </div>
                          <div className="card-button">
                            <button id={i} onClick={addToBillMeal}>
                              Seç
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="order-menu-meals">
                    <p
                      style={{
                        fontSize: "23px",
                        color: "#4e5e4e",
                        textAlign: "center",
                        margin: "15px",
                      }}
                    >
                      İçecekler
                    </p>
                    <div className="order-menu-container">
                      {shop.drinks.map((item, i) => (
                        <div key={i} className="meal-card">
                          <div className="card-img">
                            <img src="/assets/noimage.jpg" alt="yemek-resim" />
                          </div>
                          <div className="card-title">
                            <p>{item.name}</p>
                            <p
                              style={{
                                height: "25px",
                                fontSize: "20px",
                                margin: "4px 0",
                                color: "#5e5e5e",
                                fontWeight: "600",
                              }}
                            >
                              {item.price} ₺
                            </p>
                          </div>
                          <div className="card-button">
                            <button id={i} onClick={addToBillDrink}>
                              Seç
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {(meals.length > 0 || drinks.length > 0) && (
                  <div
                    style={{
                      height: "600px",
                      backgroundSize: "106%",
                      backgroundImage: "url('/assets/invoice.png')",
                    }}
                    className="right-container"
                  >
                    <div className="order-right-title">
                      <p style={{ marginTop: "5px" }}>Faturanız</p>
                    </div>
                    <div className="order-bill">
                      {meals.length > 0 && (
                        <table>
                          <thead>
                            <tr>
                              <th>Yiyecekler</th>
                              <th>Fiyat</th>
                              <th>Adet</th>
                            </tr>
                          </thead>
                          <tbody>
                            {meals.map((item, i) => (
                              <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.price}₺</td>
                                <td>
                                  <input
                                    type="number"
                                    onChange={(e) =>
                                      mealQuantity(item.id, e.target.value)
                                    }
                                    value={item.quantity}
                                    min={1}
                                  />
                                </td>
                                <td
                                  onClick={() => mealsItemDelete(item.id)}
                                  className="item-delete-button"
                                >
                                  {" "}
                                  <i className="fa-solid fa-trash-can"></i>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      {drinks.length > 0 && (
                        <table>
                          <thead>
                            <tr>
                              <th>İçecekler</th>
                              <th>Fiyat</th>
                              <th>Adet</th>
                            </tr>
                          </thead>
                          <tbody>
                            {drinks.map((item, i) => (
                              <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.price}₺</td>
                                <td>
                                  <input
                                    type="number"
                                    onChange={(e) =>
                                      drinkQuantity(item.id, e.target.value)
                                    }
                                    value={item.quantity}
                                    min={1}
                                  />
                                </td>
                                <td
                                  onClick={() => drinksItemDelete(item.id)}
                                  className="item-delete-button"
                                >
                                  {" "}
                                  <i className="fa-solid fa-trash-can"></i>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                    <div className="order-card-right-btm">
                      <div className="order-info">
                        <div className="info-address">
                          Adres:
                          <textarea
                            onChange={(e) => setAddress(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="info-description">
                          Not:
                          <textarea
                            onChange={(e) => setNote(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <button onClick={createBill} className="order-bill-btn">
                        Siparişi Onayla <b>({total} ₺)</b>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Order;
