import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import React, {  useState } from "react";
import { useSelector } from "react-redux";
import "./shop.css";
function ShopForm() {
  const user = useSelector((state) => state.users.userInfo);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [meal, setMeal] = useState("");
  const [mealPrice, setMealPrice] = useState("");
  const [meals, setMeals] = useState([]);
  const [drink, setDrink] = useState("");
  const [drinkPrice, setDrinkPrice] = useState("");
  const [drinks, setDrinks] = useState([]);

  const drinkCreateHandle = (e) => {
    e.preventDefault();
    const isItem = drinks.find(item => item.name == drink)
    if (drink.length > 0 && drinkPrice.length > 0 && !isItem) {
      const obj = {
        id:nanoid(),
        name: drink,
        price: drinkPrice,
      };
      setDrinks([...drinks, obj]);
      setDrinkPrice("")
      setDrink("")
    }
  };
  const mealCreateHandle = (e) => {
    e.preventDefault();
    const isItem = meals.find(item => item.name == meal)
    if (meal.length > 0 && mealPrice.length > 0 && !isItem) {
      const obj = {
        id:nanoid(),
        name: meal,
        price: mealPrice,
      }; 
      setMeals([...meals, obj]);
      setMeal("")
      setMealPrice("")
    }
  };
  const convertMeals = (e)=>{
    var newObj = []
    e.map(item => {
      const {id,...others} = item
      newObj.push(others)
    })
    return newObj
  }
  const shopCreateHandle = () => { 
    const createdShop = {
      user_id: user._id,
      name,
      description,
      address,
      meals:convertMeals(meals),
      drinks:convertMeals(drinks),
    };
    axios.post(`http://localhost:5000/api/shops/`, createdShop);
  };
  const mealsItemDeleteHandle =(id)=>{
   const updatedMeals = meals.filter((item) => item.id != id)
   setMeals(updatedMeals)
  }
  const drinksItemDeleteHandle =(id)=>{
    const updatedDrinks = drinks.filter((item) => item.id != id)
   setDrinks(updatedDrinks)
  }
 
  return (
    <div className="shop">
      <div className="shop-wrapper">
          <div className="shop-form">
            <h2>Sipariş alabilmek için lütfen iş yerinizi giriniz.</h2>
            <form onSubmit={shopCreateHandle} className="shop-form-wrapper">
              <label className="shop-name-label" htmlFor="name">
                Ad
                <input
                  required={true}
                  placeholder="İş yeri adını giriniz.."
                  onChange={(e) => setName(e.target.value)}
                  className="shop-name-input"
                  id="name"
                  type="text"
                />
              </label>
              <label className="shop-address-label" htmlFor="address">
                Adres
                <textarea
                  required={true}
                  placeholder="İş yeri adresini giriniz.."
                  onChange={(e) => setAddress(e.target.value)}
                  className="shop-address-input"
                  id="address"
                  type="text"
                ></textarea>
              </label>
              <label className="shop-description-label" htmlFor="description">
                Açıklama
                <textarea
                  required={true}
                  placeholder="İş yeri açıklamanızı bu kısma giriniz.."
                  onChange={(e) => setDescription(e.target.value)}
                  className="shop-description-input"
                  id="description"
                  type="text"
                ></textarea>
              </label>
              <label className="shop-meal-label" htmlFor="meal">
                <span>Yiyecek</span>
                <input
                  placeholder="İş yeriniz için yiyecek giriniz.."
                  onChange={(e) => setMeal(e.target.value)}
                  className="shop-meal-input"
                  id="meal"
                  type="text"
                  value={meal}
                />
              </label>
              <label className="shop-price-label" htmlFor="mealPrice">
                <span style={{ marginLeft: "24px" }}>Fiyat</span>
                <input
                  placeholder="Fiyatını giriniz.."
                  onChange={(e) => setMealPrice(e.target.value)}
                  className="shop-price-input"
                  id="mealPrice"
                  type="number"
                  value={mealPrice}
                />
                <button
                  onClick={mealCreateHandle}
                  className="shop-create-meal-button"
                >
                  
                  Ekle
                </button>
              </label>
              {meals.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Yiyecek</th>
                      <th>Fiyat</th>
                    </tr>
                  </thead>

                  <tbody>
                    {meals.map((item,id) => (
                      <tr key={id}>
                        <td className="meal-item">{item.name}</td>
                        <td className="meal-item">{item.price}</td>
                        <td className="item-delete-button">
                          <i onClick={()=>mealsItemDeleteHandle(item.id)}  className="fa-solid fa-trash-can"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ):null}
              <label className="shop-drink-label" htmlFor="drink">
                <span style={{ marginLeft: "10px" }}>İçecek</span>
                <input
                  placeholder="İş yeriniz için içecek giriniz.."
                  onChange={(e) => setDrink(e.target.value)}
                  className="shop-drink-input"
                  id="drink"
                  type="text"
                  value={drink}
                />
              </label>
              <label className="shop-price-label" htmlFor="drinkPrice">
                <span style={{ marginLeft: "25px" }}>Fiyat</span>
                <input
                  placeholder="Fiyatını giriniz.."
                  onChange={(e) => setDrinkPrice(e.target.value)}
                  className="shop-price-input"
                  id="drinkPrice"
                  type="number"
                  value={drinkPrice}
                />
                <button
                  onClick={drinkCreateHandle}
                  className="shop-create-meal-button"
                >
                  
                  Ekle
                </button>
              </label>
              {drinks.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>İçecek</th>
                      <th>Fiyat</th>
                    </tr>
                  </thead>
                  <tbody>
                   
                    {drinks.map((item,id) => (
                      <tr key={id}>
                        <td className="meal-item">{item.name}</td>
                        <td className="meal-item">{item.price}</td>
                        <td className="item-delete-button">
                          <i onClick={()=>drinksItemDeleteHandle(item.id)} className="fa-solid fa-trash-can"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ):null}
              <button className="shop-create-button"> Dükkanı Oluştur</button>
            </form>
          </div>
        
      </div>
    </div>
  );
}

export default ShopForm;
