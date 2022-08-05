import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { OPEN_OVERLAY, OPEN_SIDEBAR} from "../redux/constants";
import overlaySlice from "./OverlaySlice"
import sideBarSlice from "./SidebarSlice"
const NavBar = () => {
    let dispatch = useDispatch()
    const handleOpenSideBar = ()=>{
        dispatch(overlaySlice.actions[OPEN_OVERLAY]())
        dispatch(sideBarSlice.actions[OPEN_SIDEBAR]())
    }
    return (
        <div className="navBar">
            <div className="navBar__openSideBar" onClick={handleOpenSideBar}>
                <i className="bx bx-menu"></i>
            </div>
            <div className="navBar__actions">
                <ul className="navBar__actions__list">
                    <li>
                        <i className="bx bx-search"></i>
                    </li>
                    <li>
                        <Link to="/user/carts">
                            <i className="bx bx-cart"></i>
                            <span className="sidebar__actions__cart-quantity">
                                3
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user">
                            <i className="bx bx-user-circle"></i>
                        </Link>
                    </li>
                    
                    
                    <li>
                        <Link to="">
                            <i className='bx bx-log-out'></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
