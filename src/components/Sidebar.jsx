import React from 'react'
import logo from "../access/images/logo.png"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {sidebarStatusSelector} from "../redux/selectors"
import sideBarSlice from "../components/SidebarSlice.js"
import overlaySlice from "../components/OverlaySlice"
import {CLOSE_OVERLAY, CLOSE_SIDEBAR} from "../redux/constants"
const SideBar = () => {
    const sidebarStatus = useSelector(sidebarStatusSelector)
    const dispatch = useDispatch()
    const handleCloseSideBar = ()=>{
        dispatch(sideBarSlice.actions[CLOSE_SIDEBAR]())
        dispatch(overlaySlice.actions[CLOSE_OVERLAY]())
    }
  return (
    <div className={sidebarStatus? "sidebar show" : "sidebar"} >
        <div className="sidebar__icon__close" onClick={handleCloseSideBar}>
            <i className='bx bx-window-close'></i>
        </div>
        <div className="sidebar__logo">
            <div className="sidebar__logo__image">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
        </div>
        <ul className="sidebar__actions">
            <li>
                <Link to="/user">
                    <i className='bx bx-user-circle'></i>
                </Link>
            </li>
            <li>
                <i className='bx bx-search'></i>
            </li>
            <li>
                <Link to="/user/carts">
                    <i className='bx bx-cart'></i>
                    <span className="sidebar__actions__cart-quantity">
                        3
                    </span>
                </Link>
            </li>
            <li>
                <Link to=""></Link>
            </li>
        </ul>
        <ul className="sidebar__brands">
            <li className="sidebar__brands__item">
                <Link to="">
                    Dell
                </Link>
            </li>
            <li className="sidebar__brands__item">
                <Link to="">
                    Dell
                </Link>
            </li>
            <li className="sidebar__brands__item">
                <Link to="">
                    Dell
                </Link>
            </li>
            <li className="sidebar__brands__item">
                <Link to="">
                    Dell
                </Link>
            </li>
            <li className="sidebar__brands__item">
                <Link to="">
                    Dell
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default SideBar