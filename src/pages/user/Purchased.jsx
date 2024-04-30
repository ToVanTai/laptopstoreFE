import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRoleId } from "../../redux/selectors";
import PurchasedItem from "./PurchasedItem";
import { baseUrlApi } from "../../configs/configs";
import {getOptionsv2, getOptions} from '../../axios/baseRequest';
const Purchased = () => {
    let [orders, setOrders] = useState([])
    let navigate = useNavigate();
    let roleId = useSelector(getRoleId);
    useEffect(() => {
        if (roleId === null) {
            navigate("../login");
        }
    });
    useEffect(()=>{
        fetch(`${baseUrlApi}orders.php`,getOptions('GET')).then(res=>res.json().then(res=>setOrders(res)))
    },[])
    return (
        <div className="user__purchased__container">
            <div className="user__heading">Thông tin đặt hàng</div>
            {orders.map(order=><PurchasedItem key={order.orderId} data={order}/>)}
        </div>
    );
};

export default Purchased;
