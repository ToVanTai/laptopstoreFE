import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../css/pages/product/product.css";
import { baseUrlApi } from "../../configs/configs";
import { baseUrlImg } from "../../configs/configs";
const ProductDetail = () => {
    const { productId } = useParams();
    const [productData, setProductData] = useState();
    useEffect(() => {
        fetch(`${baseUrlApi}products.php?id=${productId}`, {
            method: "GET",
            credentials: "include",
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then((res) => setProductData(res));
            }
        });
    }, []);
    return (
        productData&&(
            <>
                <div className='productDetail row'>
                    <div className="productDetail__left col col-xs-12 col-sm-12 col-md-12 col-lg-5">
                        <div className="productDetail__left__container">
                            picture
                        </div>
                    </div>
                    <div className="productDetail__right col col-xs-12 col-sm-12 col-md-12 col-lg-7">
                        <div className="productDetail__right__container">
                            about
                        </div>
                    </div>
                </div>
                <div className="product__navigate">
                    <div className="product__navigate__item">Tổng quan</div>
                    <div className="product__navigate__item active">Đánh giá</div>
                    <div className="product__navigate__item">Hỏi đáp</div>
                    <div className="product__navigate__item">Dành cho bạn</div>
                </div>
                <div className="productAbout">
                    <div className="productAbout__overview">Tổng quan</div>
                    <div className="productAbout__feedback">Đánh giá</div>
                    <div className="productAbout__QA">Hỏi đáp</div>
                    <div className="productAbout__offer">Dành cho bạn</div>
                </div>
            </>
        )
    );
};

export default ProductDetail;
