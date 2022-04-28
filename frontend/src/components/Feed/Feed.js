import axios from "axios";
import React, { useEffect,useState } from "react";
import Shop from "../../Page/Shops/Shop";

function Feed() {
    const [shops,setShops] = useState([])
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await axios.get("http://localhost:5000/api/shops/");
            setShops(res.data)
        }
        fetchData();
      },[setShops])
    return (
        <div className='container'>
            <div className="list-container">
            { shops.map((shop)=>
                <Shop props={shop} key={shop._id}/>
            )}
        </div>
        </div>
    );
}

export default Feed;