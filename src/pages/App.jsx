import React, { useLayoutEffect} from "react";
import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import Overlay from "../components/Overlay";
import Sidebar from "../components/Sidebar";
import "../css/pages/home/home.css";
import { useDispatch } from "react-redux";
import { getUserDataOnFirstLoad } from "../pages/user/UserSlice";
import { getBrandsDataOnFirstLoad } from "../pages/home/brandsSlice";
import { baseUrlApi } from "../configs/configs";
const App = () => {
    const dispatch = useDispatch();
    /**
     * gọi 1 lần duy nhất dùng để kiểm tra login, và lấy các slide chạy.....
     */
    useLayoutEffect(() => {
        /**lấy thông tin giở hàng, role_id để chuyển sang trang admin, thông tin user */
        dispatch(getUserDataOnFirstLoad(`${baseUrlApi}checklogin.php`));
        /**lấy thông tin slide chạy .... */
        dispatch(getBrandsDataOnFirstLoad(`${baseUrlApi}brands.php`));
    }, []);
    return (
        <div>
            <Sidebar />
            <Navbar />
            <Overlay />
            <Container>
                <Outlet />
                <Footer />
            </Container>
        </div>
    );
};

export default App;
