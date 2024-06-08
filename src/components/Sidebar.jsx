/**
 * phần sidebar của chương trình
 */
import React, {useState} from "react";
import { logo } from "../access/data/data";
import { Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sidebarStatusSelector } from "../redux/selectors";
import sideBarSlice from "../components/SidebarSlice.js";
import overlaySlice from "../components/OverlaySlice";
import { CLOSE_OVERLAY, CLOSE_SIDEBAR } from "../redux/constants";
import userSlice, { setUserDataAfterLogout } from "../pages/user/UserSlice";
import { getRoleId, getBrands, getCarts } from "../redux/selectors";
import { baseUrlApi } from "../configs/configs";
import {generateQuantityCart} from "../utils/utils"
const SideBar = () => {
    let navigate = useNavigate();//chuyển trang khi cần 
    const sidebarStatus = useSelector(sidebarStatusSelector);//trạng thái đóng, mở của slide bar
    const dispatch = useDispatch();
    const roleId = useSelector(getRoleId);//roleId của người dùng để check chuyển sang trang admin
    const brands = useSelector(getBrands);//lấy ra banner chạy chạy
    const carts = useSelector(getCarts);//lấy các thông tin giỏ hàng
    const handleCloseSideBar = () => {//tắt, bật sideBar
        dispatch(sideBarSlice.actions[CLOSE_SIDEBAR]());
        dispatch(overlaySlice.actions[CLOSE_OVERLAY]());
    };
    const handleLogout = () => {//xét lại giá trị mặc định của user...giỏ hàng, tt user, loại người dùng
        dispatch(setUserDataAfterLogout(`${baseUrlApi}usernew.php`));
    };
    const [searchText, setSearchText] = useState("")//chuỗi tìm kiếm
    const [isShowSearchInput, setIsShowSearchInput] = useState(false)//trạng thái đóng, mở ô tìm kiếm
    let params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    const handleToggleSearchInputStatus = ()=>{//đóng, mở ô tìm kiếm
        setIsShowSearchInput(prev=>!prev)
    }
    const handleChangeSearchInput = (event)=>{//xét lại value biến tìm kiếm
        setSearchText(event.target.value)
    }
    /**
     * khi ấn vào nút tìm kiếm
     */
    const handleSubmitSearchInput = (event)=>{
        if(event.key==="Enter"&&searchText.trim().length>0){
            if(params["category-name"]||params["search"]){
                window.scrollTo(0,0)//2 trang này không có slide chạy nên cuộn lên đầu
            }else{
                if(document.documentElement.clientWidth<=768){
                    //giao diện mobile thì cuộn lên dưới navbar
                    window.scrollTo(0,(document.documentElement.clientWidth/2)+78)
                }else{
                    //giao diện bth thì cuộn xuống dưới slide chạy
                    window.scrollTo(0,((document.documentElement.clientWidth - 270) / 2))
                }
            }
            // setSearchText("")
            setIsShowSearchInput(false)
            //chuyển sang trang tìm kiếm sản phẩm => nên vẫn ở searchinput
            navigate("/search-products?search="+searchText.trim())
        }
    }
    const handleClearSearchInput = ()=>{
        if(params["category-name"]||params["search"]){
            window.scrollTo(0,0)//2 trang này không có slide chạy nên cuộn lên đầu
        }else{
            if(document.documentElement.clientWidth<=768){
                //giao diện mobile thì cuộn lên dưới navbar
                window.scrollTo(0,(document.documentElement.clientWidth/2)+78)
            }else{
                //giao diện bth thì cuộn xuống dưới slide chạy
                window.scrollTo(0,((document.documentElement.clientWidth - 270) / 2))
            }
        }
        setSearchText("")
        setIsShowSearchInput(false)
        //chuyển sang trang tìm kiếm sản phẩm => nên vẫn ở searchinput
        navigate("/search-products");
    }
    return (
        <>
            <div className={sidebarStatus ? "sidebar show" : "sidebar"}>
                <div
                    className="sidebar__icon__close"
                    onClick={handleCloseSideBar}
                >
                    <i className="bx bx-window-close"></i>
                </div>
                <div className="sidebar__logo">
                    <div className="sidebar__logo__image">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                </div>
                <ul className="sidebar__actions">
                    <li className="" onClick={handleToggleSearchInputStatus}>
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
                    {roleId !== null ? (
                        <li>
                            <i
                                className="bx bx-log-out"
                                onClick={handleLogout}
                            ></i>
                        </li>
                    ) : (
                        ""
                    )}
                </ul>
                <ul className="sidebar__brands">
                    {/* <li className="sidebar__brands__item">
                <Link to="search-products?brands=sfsf">
                    Dell
                </Link>
            </li> */}
                    {brands.data &&
                        brands.data.map((brand) => (
                            <li
                                key={brand.id}
                                className="sidebar__brands__item"
                            >
                                <Link
                                    to={
                                        "search-products?category-name=" +
                                        brand.name
                                    }
                                >
                                    {brand.name}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
            <div className={isShowSearchInput?"searchInput__mobile show":"searchInput__mobile"}>
                <div className="searchInput__mobile__content">
                    <div className="searchInput__mobile__content_container">
                        <input type="text" placeholder="Enter để tìm" onKeyPress={handleSubmitSearchInput} onChange={handleChangeSearchInput} value={searchText}  name="nameProduct"  />
                        <div className="close" onClick={handleClearSearchInput}>x</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
