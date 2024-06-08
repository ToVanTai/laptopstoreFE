import React, { useLayoutEffect, useEffect } from "react";
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
import {getOptionsv2, getOptions} from '../axios/baseRequest';
const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const intervalId = setInterval(() => {
            //kiểm tra có context hay không
            let contextJSON = localStorage.getItem("context");
            let context = null;
            if(contextJSON){
                context = JSON.parse(contextJSON);
            }
            if(context){
                fetch(`${baseUrlApi}usernew.php?refresh-token=true`, getOptions('GET'))
                .then(res => res.json().then(res => {
                    localStorage.setItem('context', JSON.stringify(res));
                }));
            }
        }, 60 * 1000); //1 phút

        return () => {
            // Xóa interval khi component bị unmount
            clearInterval(intervalId);
        };
    }, []);
    /**
     * gọi 1 lần duy nhất dùng để kiểm tra login, và lấy các slide chạy.....
     */
    useLayoutEffect(async() => {
        const getDataOnFistLoad = async function(){
            try{
                await Promise.all([
                    /**lấy thông tin giở hàng, role_id để chuyển sang trang admin, thông tin user */
                    dispatch(getUserDataOnFirstLoad(`${baseUrlApi}checklogin.php`)),
                    /**lấy thông tin slide chạy .... */
                    dispatch(getBrandsDataOnFirstLoad(`${baseUrlApi}brands.php`)),
                ])
            }catch(ex){}
        };
        await getDataOnFistLoad();
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
