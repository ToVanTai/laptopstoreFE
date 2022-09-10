import React, { useEffect, useState } from "react";
import { deleteCart,changeQuantitiesCart } from "./UserSlice";
import { useNavigate } from "react-router-dom";
import { getRoleId,getCarts } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { baseUrlApi } from "../../configs/configs";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import {numberWithComas} from "../../utils/utils"
const Carts = () => {
    let navigate = useNavigate();
    let roleId = useSelector(getRoleId);
    useEffect(() => {
        if (roleId === null) {
            navigate("../login");
        }
    });
    let carts = useSelector(getCarts)
    let cartQuantities = carts.reduce((result, item)=>{
        return result+Number(item.quantity)
    },0)
    let cartPrice = carts.reduce((result, item)=>{
        return result+(Number(item.quantity)*Number(item.detail.newPrice))
    },0)
    const dispatch = useDispatch()
    const handleDeleteCart = (productId, capacityId)=>{
        if(window.confirm("Bạn có muấn thực hiện chức năng xóa!")){
                let url = `${baseUrlApi}carts.php?crud_req=updateCarts`
                dispatch(deleteCart({productId, capacityId,carts,url}))
        }
    }
    const handleChangeQuantity = (productId, capacityId,isIncrease=true)=>{
        let indexChange = carts.findIndex(cart=>Number(cart.productId)===Number(productId)&&Number(cart.capacityId)===Number(capacityId))
        let isAllowCallApi=true;
        if(isIncrease){
            if(Number(carts[indexChange].detail.quantityRemain)<=Number(carts[indexChange].quantity)){
                isAllowCallApi=false
            }
        }else{
            if(Number(carts[indexChange].quantity)===1){
                isAllowCallApi=false
            }
        }
        if(isAllowCallApi){
            let url = `${baseUrlApi}carts.php?crud_req=updateCarts`
            dispatch(changeQuantitiesCart({productId, capacityId,carts,url,isIncrease}))
        }
    }
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
                        {carts.map((cart,index)=><Cart key={cart.capacityId} onChangeQuantities={handleChangeQuantity} onDeleteCart = {handleDeleteCart} data={cart}/>)}
                    </div>
                    <div className="userCarts__footer">
                        <div className="userCarts__footer__left">

                        </div>
                        <div className="userCarts__footer__right">
                            <div className="userCarts__footer__right-title">
                                Tổng: 
                            </div> 
                            <div className="userCarts__footer__right-quantities">
                                {cartQuantities} sản phẩm
                            </div>
                            <div className="userCarts__footer__right-price">
                                {numberWithComas(cartPrice)}đ
                            </div>
                            <div className="userCarts__footer__right-buy">
                                <button className="disable">Mua Hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carts;
