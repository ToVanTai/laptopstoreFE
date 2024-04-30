import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_OVERLAY, OPEN_SIDEBAR } from "../redux/constants";
import overlaySlice from "./OverlaySlice";
import sideBarSlice from "./SidebarSlice";
import userSlice, { setUserDataAfterLogout } from "../pages/user/UserSlice";
import { getRoleId, getCarts } from "../redux/selectors";
import { baseUrlApi } from "../configs/configs";
import {generateQuantityCart} from "../utils/utils"
/**phần navbar ngang ngang hiện ở giao diện mobile hoặc tablet
 * logic giống với sideBar
*/
const Navbar = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch();
    /**dùng để mở side bar */
    const handleOpenSideBar = () => {
        dispatch(overlaySlice.actions[OPEN_OVERLAY]());
        dispatch(sideBarSlice.actions[OPEN_SIDEBAR]());
    };
    const [searchText, setSearchText] = useState("")//value tìm kiếm
    const [isShowSearchInput, setIsShowSearchInput] = useState(false)//trạng thái đóng, mở ô tìm kiếm
    const roleId = useSelector(getRoleId);//roleId của người dùng để check chuyển sang trang admin
    const carts = useSelector(getCarts);//lấy các thông tin giỏ hàng
    let params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    // const handleLogout = () => {
    //     dispatch(setUserDataAfterLogout(`${baseUrlApi}usernew.php`));
    // };
    const handleToggleSearchInputStatus = ()=>{//đóng, mở ô tìm kiếm
        setIsShowSearchInput(prev=>!prev)
    }
    //xét lại value biến tìm kiếm
    const handleChangeSearchInput = (event)=>{
        setSearchText(event.target.value)
    }
    //xét lại value biến tìm kiếm
    const handleSubmitSearchInput = (event)=>{
        if(event.key==="Enter"&&searchText.trim().length>0){
            if(params["category-name"]||params["search"]){
                window.scrollTo(0,0)
            }else{
                if(document.documentElement.clientWidth<=768){
                    window.scrollTo(0,(document.documentElement.clientWidth/2)+78)
                }else{
                    window.scrollTo(0,((document.documentElement.clientWidth - 270) / 2))
                }
            }
            setSearchText("")
            setIsShowSearchInput(false)
            navigate("/search-products?search="+searchText.trim())
        }
    }
    return (
        <div className="navBar">
            <div className="navBar__openSideBar" onClick={handleOpenSideBar}>
                <i className="bx bx-menu"></i>
            </div>
            <div className="navBar__actions">
                <div className={isShowSearchInput?"navBar__actions__input show":"navBar__actions__input"}>
                    <input type="text" placeholder="Tìm tên sản phẩm" onKeyPress={handleSubmitSearchInput} onChange={handleChangeSearchInput} value={searchText}  name="nameProduct"  />
                </div>
                <ul className="navBar__actions__list">
                    <li onClick={handleToggleSearchInputStatus}>
                        <i className="bx bx-search"></i>
                    </li>
                    <li>
                        <Link to="/user/carts">
                            <i className="bx bx-cart"></i>
                            <span className="sidebar__actions__cart-quantity">
                                {generateQuantityCart(carts)}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/about">
                            <i className="bx bx-user-circle"></i>
                        </Link>
                    </li>
                    {/* {roleId !== null ? (
                        <li>
                            <i
                                className="bx bx-log-out"
                                onClick={handleLogout}
                            ></i>
                        </li>
                    ) : (
                        ""
                    )} */}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
