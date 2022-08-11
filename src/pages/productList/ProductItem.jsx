import React from "react";
import { Link } from 'react-router-dom'
import {product1, saleIcon} from "../../access/data/data"
import {numberWithComas, formatString} from "../../utils/utils"
const ProductItem = (props) => {
    return (
        <div className="col col-xs-6 col-sm-6 col-md-6 col-lg-3">
            <div className="productList__item">{/* discount */}
            <Link to={"/product-detail/1"} className="productList__item__link">
                <div className="productList__item__link-img">
                    <img src={product1} alt="" />
                </div>
                <div className="productList__item__link__about">
                    <p className="productList__item__link__about-model">
                        Laptop Gaming Dell G15 5511
                    </p>
                    <p className="productList__item__link__about-screen">
                        15.6\" FHD (1920 x1080) 120Hz, 250 nits, WVA, Anti-Glare, LED Backlit, Narrow Border Display
                    </p>
                    <p className="productList__item__link__about-cpu">
                    Intel Core i5-11400H 2.7GHz up to 4.5GHz 12MB
                    </p>
                    <p className="productList__item__link__about-ram">
                    8GB (8x1) DDR4 3200MHz (2x SO-DIMM socket, up to 32GB SDRAM)
                    </p>
                </div>
                <div className="productList__item__link-link">
                    <i>Xem chi tiết</i>
                    <span>Đặt hàng</span>
                </div>
            </Link>
            <div className="productList__item__about">
                <p className="productList__item__about-name">
                    Laptop MSI Modern 14 B11MOU 1028VN Laptop MSI Modern 14
                    B11MOU 1028VN Laptop MSI Modern 14 B11MOU 1028VN Laptop MSI
                    Modern 14 B11MOU 1028VN
                </p>
                <p className="productList__item__about__price-old">
                    14,490,000<u>đ</u>
                </p>
                <p className="productList__item__about__price-new">
                    14,490,000<u>đ</u>
                </p>
                <span className="productList__item__about__discount">
                    <img
                        src={saleIcon}
                        className="productList__item__about__discount-img"
                        alt=""
                    />
                    <span className="productList__item__about__discount-percent">
                        -24%
                    </span>
                </span>
            </div>
        </div>
        </div>
    );
};

export default ProductItem;
