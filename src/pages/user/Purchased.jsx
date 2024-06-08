import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRoleId } from "../../redux/selectors";
import PurchasedItem from "./PurchasedItem";
import { baseUrlApi } from "../../configs/configs";
import {getOptionsv2, getOptions} from '../../axios/baseRequest';
import { loading, unLoading } from "../..//utils/utils";
import { toast, Toaster } from 'react-hot-toast';
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
        refreshData();
    },[]);
    let refreshData = ()=>{
        loading();
        fetch(`${baseUrlApi}orders.php`,getOptions('GET')).then(res=>res.json().then(res=>{
            setOrders(res);
            unLoading();
        }))
    }
    let onChangeStatus = (itemCart)=>{
        try {
            if(Number(itemCart.statusId) == 1){
                loading();
                let dataBodyRes = {
                    statusChange: 2, 
                    orderId: itemCart.orderId
                }
                fetch(`${baseUrlApi}orders.php?crud_req=updateOrders`,getOptions('POST', JSON.stringify(dataBodyRes)))
                .then(res=>{
                    unLoading();
                    if(res.status==203){
                        toast.error("Hủy đơn hàng thất bại.")
                    }else{
                        toast.success("Hủy đơn hàng thành công.");
                        refreshData();
                    }
                }).catch(ex=>{
                    toast.error("Hủy đơn hàng thất bại.")
                    unLoading();    
                })
            }
        } catch (error) {
            unLoading();
        }
    }
    return (
        <div className="user__purchased__container">
            <div className="user_purchser_item_list">
                {orders.map(order=><PurchasedItem key={order.orderId} onChangeStatus={onChangeStatus} data={order}/>)}
            </div>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 5000,
                    style: {
                        width: '500px'
                    },
                }}
            />
        </div>
    );
};

export default Purchased;
