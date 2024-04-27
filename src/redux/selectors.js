/**lấy ra store global */
import { createSelector } from "@reduxjs/toolkit";
//trạng thái đóng mở của slide bar
export const sidebarStatusSelector = state=>state.sideBar.isOpen
export const overlayStatusSelector = state=>state.overlay.isOpen
//lấy quyền của người dùng admin hay user
export const getRoleId = state=>state.user.roleId
//lấy ra banner chạy chạy
export const getBrands = state=>state.brands
export const getCarts = state=>state.user.carts