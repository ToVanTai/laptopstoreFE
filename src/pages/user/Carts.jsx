import React, { useEffect, useState } from "react";
import { deleteCart, changeQuantitiesCart, updateCart } from "./UserSlice";
import { useNavigate } from "react-router-dom";
import { getRoleId, getCarts } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { baseUrlApi } from "../../configs/configs";
import { Link } from "react-router-dom";
import { getOptionsv2, getOptions } from '../../axios/baseRequest'
import Cart from "./Cart";
import { numberWithComas } from "../../utils/utils";
import { loading, unLoading } from "../..//utils/utils";
import { toast, Toaster } from 'react-hot-toast';
const Carts = () => {
    const [cartsSelected, setCartsSelected] = useState([])
    let navigate = useNavigate();
    let roleId = useSelector(getRoleId);
    useEffect(() => {
        if (roleId === null) {
            navigate("../login");
        }
    });
    let carts = useSelector(getCarts)
    let cartQuantities = carts.reduce((result, cart) => {
        let indexFind = cartsSelected.findIndex(item => Number(cart.productId) === Number(item.productId) && Number(cart.capacityId) === Number(item.capacityId))
        return indexFind === -1 ? result : result + Number(cart.quantity)
    }, 0)
    let cartPrice = carts.reduce((result, cart) => {
        let indexFind = cartsSelected.findIndex(item => Number(cart.productId) === Number(item.productId) && Number(cart.capacityId) === Number(item.capacityId))
        return indexFind === -1 ? result : result + (Number(cart.quantity) * Number(cart.detail.newPrice))
    }, 0)
    const dispatch = useDispatch()
    const handleDeleteCart = async (productId, capacityId) => {
        if (window.confirm("Bạn có muấn thực hiện chức năng xóa!")) {
            let url = `${baseUrlApi}carts.php?crud_req=updateCarts`;
            loading();
            await dispatch(deleteCart({ productId, capacityId, carts, url }))
            unLoading();
        }
    }
    const handleChangeQuantity = async (productId, capacityId, isIncrease = true) => {
        let indexChange = carts.findIndex(cart => Number(cart.productId) === Number(productId) && Number(cart.capacityId) === Number(capacityId))
        let isAllowCallApi = true;
        if (isIncrease) {
            if (Number(carts[indexChange].detail.quantityRemain) <= Number(carts[indexChange].quantity)) {
                isAllowCallApi = false
            }
        } else {
            if (Number(carts[indexChange].quantity) === 1) {
                isAllowCallApi = false
            }
        }
        if (isAllowCallApi) {
            let url = `${baseUrlApi}carts.php?crud_req=updateCarts`
            loading();
            await dispatch(changeQuantitiesCart({ productId, capacityId, carts, url, isIncrease }))
            unLoading();
        }
    }
    const handleToggleStatus = (productId, capacityId) => {
        let indexFind = cartsSelected.findIndex((cart) => Number(cart.productId) === Number(productId) && Number(cart.capacityId) === Number(capacityId))
        if (indexFind === -1) {//o tim thay
            setCartsSelected(pre => [...pre, { productId, capacityId }])
        } else {//tim thay
            setCartsSelected(pre => {
                let newCarts = pre.reduce((result, item, index) => {
                    if (index === indexFind) {
                        return result
                    } else {
                        return [...result, { ...item }]
                    }
                }, [])
                return newCarts
            })
        }
    }
    const handleSelectedAll = () => {
        //1 cái chưa checked=>check all
        //hủy check all
        let isNotChecked = carts.some(cart => {
            let indexFind = cartsSelected.findIndex(item => Number(cart.productId) === Number(item.productId) && Number(cart.capacityId) === Number(item.capacityId))
            return indexFind === -1 ? true : false
        })
        if (isNotChecked) {
            setCartsSelected(() => {
                let newCarts = carts.reduce((result, item) => {
                    return [...result, { productId: item.productId, capacityId: item.capacityId }]
                }, [])
                return newCarts
            })
        } else {
            setCartsSelected([])
        }
    }
    const isCheckedAll = () => {
        let isNotChecked = carts.some(cart => {
            let indexFind = cartsSelected.findIndex(item => Number(cart.productId) === Number(item.productId) && Number(cart.capacityId) === Number(item.capacityId))
            return indexFind === -1 ? true : false
        })
        return !isNotChecked
    }
    const handleBuy = () => {
        if (cartsSelected.length === 0) {
            toast.error("Vui lòng chọn sản phẩm!");
        } else {
            loading();
            fetch(`${baseUrlApi}usernew.php`, getOptions("GET"))
                .then(res => res.json().then(res => {
                    if (res.name === null || res.phone_number === null || res.account === null || res.address === null) {
                        toast.error("Vui lòng cập nhật thông tin cá nhân!");
                    } else {
                        let cartsBuy = carts.reduce((result, cart) => {
                            let indexFind = cartsSelected.findIndex(item => Number(cart.productId) === Number(item.productId) && Number(cart.capacityId) === Number(item.capacityId))
                            return indexFind === -1 ? result : [...result, cart]
                        }, [])
                        let cartsRemain = carts.reduce((result, cart) => {
                            let indexFind = cartsSelected.findIndex(item => Number(cart.productId) === Number(item.productId) && Number(cart.capacityId) === Number(item.capacityId))
                            return indexFind !== -1 ? result : [...result, cart]
                        }, []);

                        fetch(`${baseUrlApi}carts.php?crud_req=updateCarts`,
                            getOptions("POST", JSON.stringify(cartsBuy))
                        ).then(res => {
                                if (res.status === 200 || res.status === 201) {
                                    fetch(`${baseUrlApi}orders.php`,
                                        getOptions("POST")
                                    )
                                        .then(res => {
                                            if (res.status === 200 || res.status === 201) {
                                                toast.success("Đặt hàng thành công")
                                                //call api đẩy cartRemain to global state
                                                let url = `${baseUrlApi}carts.php?crud_req=updateCarts`
                                                let dataBody = cartsRemain
                                                function redirectPurchasedPage() {
                                                    navigate("../purchased");
                                                }
                                                dispatch(updateCart({ url, dataBody, redirectPurchasedPage }))
                                            } else {
                                                toast.error("Lỗi hệ thống")
                                            }
                                        })
                                } else {
                                    toast.error("Lỗi hệ thống!")
                                }
                            })
                    }
                }));
            unLoading();

            //b0: call api xem thông tin user api/usernew.php// name, phonenumber, address, email->trống=>thông báo
            //B1: đẩy cartsBuy lên session và không làm thay đổi global store.
            //B2: callApi đặt hàng
            //B3: callApi cập nhật giỏ hàng=>thông báo thành công
            //b4: chuyển tra trang đã đặt hàng
        }
    }
    return (
        <>
            <div className="cartUser-list">
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
                        {carts.map(cart => <Cart key={cart.capacityId} onChangeQuantities={handleChangeQuantity} onToggleStatus={handleToggleStatus} onDeleteCart={handleDeleteCart} data={cart} cartsSelected={cartsSelected} />)}
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
                                <button className={cartsSelected.length === 0 ? "disable" : ""} onClick={handleBuy}>Mua Hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
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
        </>
    );
};

export default Carts;
