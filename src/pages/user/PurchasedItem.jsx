import React from "react";
import { Link } from "react-router-dom";
import { baseUrlImg } from "../../configs/configs";
import { numberWithComas } from "../../utils/utils";
const PurchasedItem = ({ data }) => {
    let totalPrice = data.orderDetails.reduce((current,item)=>{
        return current + Number(item.price)*Number(item.quantity)
    },0)
    return (
        <div className="user__purchased__item">
            <div className="user__purchased__item__heading">
                <div className="user__purchased__item__heading-left">
                    Mã đơn hàng: {data.orderId}
                </div>
                <div className="user__purchased__item__heading-right">
                    <i className="bx bx-car"></i>
                    {data.statusName}
                </div>
            </div>
            {data.orderDetails.map((item) => (
                <div className="user__purchased__item__content">
                    <Link
                        to={"/product-detail/"+item.productId}
                        className="user__purchased__item__content__img"
                    >
                        <img
                            src={`${baseUrlImg}${item.background}`}
                            alt=""
                        />
                    </Link>
                    <div className="user__purchased__item__content__about">
                        <div className="user__purchased__item__content__about-model">
                            {item.model}
                        </div>
                        <div className="user__purchased__item__content__about-capacity">
                            Loại: {item.capacityName}
                        </div>
                        <div className="user__purchased__item__content__about-quantities">
                            x{item.quantity}
                        </div>
                    </div>
                    <div className="user__purchased__item__content-price">
                        {numberWithComas(item.price)}đ
                    </div>
                </div>
            ))}
            <div className="user__purchased__item__footer">
                <p>
                    Tổng tiền: <span>{numberWithComas(totalPrice)} đ</span>
                </p>
                <p>
                    <button onClick={()=>alert("Chức năng chưa có sẵn!")}>Hủy đơn hàng</button>
                </p>
            </div>
        </div>
    );
};

export default PurchasedItem;
