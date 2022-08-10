import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_OVERLAY, OPEN_SIDEBAR } from "../redux/constants";
import overlaySlice from "./OverlaySlice";
import sideBarSlice from "./SidebarSlice";
import userSlice, { setUserDataAfterLogout } from "../pages/user/UserSlice";
import { getRoleId, getCarts } from "../redux/selectors";
import { baseUrlApi } from "../configs/configs";

const Navbar = () => {
    let dispatch = useDispatch();
    const handleOpenSideBar = () => {
        dispatch(overlaySlice.actions[OPEN_OVERLAY]());
        dispatch(sideBarSlice.actions[OPEN_SIDEBAR]());
    };
    const roleId = useSelector(getRoleId);
    const carts = useSelector(getCarts)
    const handleLogout = () => {
        dispatch(setUserDataAfterLogout(`${baseUrlApi}user.php`));
    };

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
                                {carts.length}
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
            </div>
        </div>
    );
};

export default Navbar;
