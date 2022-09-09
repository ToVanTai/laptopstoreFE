import React from "react";
import {product1} from "../../access/data/data"
const Cart = () => {
    return (
        <div className="userCarts__item">
            <input type="checkbox" className="userCarts__item-checkbox userCarts__checkbox"  />
            <div className="userCarts__item-img">
                <img src={product1} alt="" />
            </div>
            <div className="userCarts__item-name">
                LAPTOP GAMING DELL G15 5515 P105F004 70266674 LAPTOP GAMING DELL
                G15 5515 P105F004 70266674
            </div>
            <div className="userCarts__item-category">32GB/SSD 1TB</div>
            <div className="userCarts__item__price">
                <div className="userCarts__item__price-old">25.000.000 đ</div>
                <div className="userCarts__item__price-new">25.000 đ</div>
            </div>
            <div className="userCarts__item__quantities">
                <div className="userCarts__item__quantities-decrease disable">
                    <i className="bx bx-minus"></i>
                </div>
                <div className="userCarts__item__quantities-quantities">3</div>
                <div className="userCarts__item__quantities-crease">
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
