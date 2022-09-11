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
    const [cartsSelected,setCartsSelected] = useState([])
    let navigate = useNavigate();
    let roleId = useSelector(getRoleId);
    useEffect(() => {
        if (roleId === null) {
            navigate("../login");
        }
    });
    let carts = useSelector(getCarts)
    let cartQuantities = carts.reduce((result, cart)=>{
        let indexFind = cartsSelected.findIndex(item=>Number(cart.productId)===Number(item.productId)&&Number(cart.capacityId)===Number(item.capacityId))
        return indexFind===-1?result:result+Number(cart.quantity)
    },0)
    let cartPrice = carts.reduce((result, cart)=>{
        let indexFind = cartsSelected.findIndex(item=>Number(cart.productId)===Number(item.productId)&&Number(cart.capacityId)===Number(item.capacityId))
        return indexFind===-1?result: result+(Number(cart.quantity)*Number(cart.detail.newPrice))
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
    const handleToggleStatus = (productId, capacityId)=>{
        let indexFind = cartsSelected.findIndex((cart)=>Number(cart.productId)===Number(productId)&&Number(cart.capacityId)===Number(capacityId))
        if(indexFind===-1){//o tim thay
            setCartsSelected(pre=>[...pre,{productId,capacityId}])
        }else{//tim thay
            setCartsSelected(pre=>{
                let newCarts = pre.reduce((result, item,index)=>{
                    if(index===indexFind){
                        return result
                    }else{
                        return [...result,{...item}]
                    }
                },[])
                return newCarts
            })
        }
    }
    const handleSelectedAll = ()=>{
        //1 cái chưa checked=>check all
        //hủy check all
        let isNotChecked = carts.some(cart=>{
            let indexFind = cartsSelected.findIndex(item=>Number(cart.productId)===Number(item.productId)&&Number(cart.capacityId)===Number(item.capacityId))
            return indexFind===-1?true:false
        })
        if(isNotChecked){
            setCartsSelected(()=>{
                let newCarts = carts.reduce((result,item)=>{
                    return [...result,{productId:item.productId, capacityId:item.capacityId}]
                },[])
                return newCarts
            })
        }else{
            setCartsSelected([])
        }
    }
    const isCheckedAll = ()=>{
        let isNotChecked = carts.some(cart=>{
            let indexFind = cartsSelected.findIndex(item=>Number(cart.productId)===Number(item.productId)&&Number(cart.capacityId)===Number(item.capacityId))
            return indexFind===-1?true:false
        })
        return !isNotChecked
    }
    const handleBuy = ()=>{
        if(cartsSelected.length===0){
            alert("Vui lòng chọn sản phẩm!")
        }else{
            let cartsBuy = carts.reduce((result,cart)=>{
                let indexFind = cartsSelected.findIndex(item=>Number(cart.productId)===Number(item.productId)&&Number(cart.capacityId)===Number(item.capacityId))
                return indexFind===-1? result:[...result,cart]
            },[])
            let cartsRemain = carts.reduce((result,cart)=>{
                let indexFind = cartsSelected.findIndex(item=>Number(cart.productId)===Number(item.productId)&&Number(cart.capacityId)===Number(item.capacityId))
                return indexFind!==-1? result:[...result,cart]
            },[])
            console.log(cartsBuy);
            console.log(cartsRemain);
            // call api : đặt hàng và cập nhật giỏ hàng
            //nếu chưa cập nhật thông tin =>alert
            //cập nhật thông tin=> thành công và cập nhật giỏ hàng tiếp.
        }
    }
    return (
        <>
            <div>
                {/* <div className="user__heading">Giỏ hàng</div> */}
                <div className="userCarts">
                    <div className="userCarts__header">
                        <div className="userCarts__header__left">
                            <input type="checkbox" checked={isCheckedAll()} onChange={handleSelectedAll} className="userCarts__checkbox" />
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
                        {carts.map(cart=><Cart key={cart.capacityId} onChangeQuantities={handleChangeQuantity} onToggleStatus={handleToggleStatus} onDeleteCart = {handleDeleteCart} data={cart} cartsSelected={cartsSelected}/>)}
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
                                <button className={cartsSelected.length===0?"disable":""} onClick={handleBuy}>Mua Hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carts;
