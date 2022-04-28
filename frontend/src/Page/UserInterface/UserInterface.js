import "./userinterface.css";
import TopBar from "../../components/TopBar/TopBar";
import Feed from "../../components/Feed/Feed";
import SideBar from "../../components/SideBar/SideBar";
import RightBar from "../../components/RightBar/RightBar";
import Shop from "../Shop/Shop";
import { useDispatch, useSelector } from "react-redux";
import { getShopAsync } from "../../redux/reducer/shop";
import { useEffect } from "react";

function UserInterface() {
   
  const user = useSelector(state => state.users.userInfo)

  const dispatch = useDispatch();

  useEffect(() => {
    if(!user.customer){
      dispatch(getShopAsync(user._id)); 
    } 
  }, [dispatch]);
  return (
    <>
      {" "}
      <TopBar props={"user"} />
        {!user.customer  ? <div className="shop-interface">
           <SideBar/>
            <div className='shop-inteface-center'>
            <Shop/>
            </div>    
          </div>
          :
          <div className="user-interface"><SideBar />
           <Feed />
           <RightBar />
        </div>
        }
    </>
  );
}

export default UserInterface;
