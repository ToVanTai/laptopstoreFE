import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoleId } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { baseUrlApi } from "../../configs/configs";
import { Link } from "react-router-dom";
import Cart from "./Cart";
const Carts = () => {
    let navigate = useNavigate();
    let roleId = useSelector(getRoleId);
    useEffect(() => {
        if (roleId === null) {
            navigate("../login");
        }
    });
    
    // const handleDeleteCart = (productId, capacityId)=>{
    //     let indexDelete = 0;
    //     for(var i=0;i<carts.length; i++){
    //         if(Number(carts[i].productId) === Number(productId) && Number(carts[i].capacityId) === Number(capacityId)){
    //             break;
    //         }else{
    //             indexDelete++;
    //         }
    //     }
    //     carts.splice(indexDelete,1)
    //     setCarts([...carts]);
    // }
    return (
        <>
            <div>
                {/* <div className="user__heading">Giỏ hàng</div> */}
                <div className="userCarts">
                    <div className="userCarts__header">
                        <div className="userCarts__header__left">
                            <input type="checkbox" className="userCarts__checkbox" />
                            Sản Phẩm
                        </div>
                        <div className="userCarts__header__right">
                            <div className="userCarts__header__right-item">
                                Loại
                            </div>
                            <div className="userCarts__header__right-item">
                                Số tiền
                            </div>
                            <div className="userCarts__header__right-item">
                                Số lượng
                            </div>
                            <div className="userCarts__header__right-item">
                                Thao tác
                            </div>
                        </div>
                    </div>
                    <div className="userCarts__content">
                        <Cart/>
                        <Cart/>
                        <Cart/>
                        <Cart/>
                        <Cart/>
                        <Cart/>
                        <Cart/>
                    </div>
                    <div className="userCarts__footer">
                        kk
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carts;
