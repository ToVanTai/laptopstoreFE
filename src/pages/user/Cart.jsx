import React from "react";
import { Link } from "react-router-dom";
import {baseUrlImg} from "../../configs/configs"
import {generateNewPrice,generateOldPrice, numberWithComas} from "../../utils/utils"
import {product1} from "../../access/data/data"
const Cart = ({data}) => {
    return (
        <div className="userCarts__item">
            <input type="checkbox" className="userCarts__item-checkbox userCarts__checkbox"  />
            <Link to={"/product-detail/"+data.productId} className="userCarts__item-img">
                <img src={baseUrlImg+data.detail.background} alt="" />
            </Link>
            <Link to={"/product-detail/"+data.productId} className="userCarts__item-name">
                {data.detail.model}
            </Link>
            <div className="userCarts__item-category">{data.detail.capacityName}</div>
            <div className="userCarts__item__price">
                <div className="userCarts__item__price-old">{Number(data.detail.oldPrice)!==Number(data.detail.newPrice)?numberWithComas(data.detail.oldPrice)+" đ":""}</div>
                <div className="userCarts__item__price-new">{numberWithComas(data.detail.newPrice)} đ</div>
            </div>
            <div className="userCarts__item__quantities">
                <div className={Number(data.quantity)===1?"userCarts__item__quantities-decrease disable":"userCarts__item__quantities-decrease"}>
                    <i className="bx bx-minus"></i>
                </div>
                <div className="userCarts__item__quantities-quantities">{data.quantity}</div>
                <div className={Number(data.detail.quantityRemain)<=Number(data.quantity)?"userCarts__item__quantities-crease disable":"userCarts__item__quantities-crease"}>
                    <i className="bx bx-plus"></i>
                </div>
            </div>
            <div className="userCarts__item-delete">
                <i className="bx bx-trash"></i>
            </div>
        </div>
    );
};

export default Cart;
