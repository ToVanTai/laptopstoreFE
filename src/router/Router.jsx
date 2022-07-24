import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../pages/home/App";
import Helmet from "../components/Helmet";
import User from "../pages/user/User";
import About from "../pages/user/About";
import Carts from "../pages/user/Carts";
import ChangePassword from "../pages/user/ChangePassword";
import Purchased from "../pages/user/Purchased";
import Register from "../pages/user/Register";
import Products from "../pages/products/Products";
import ProductDetailContainer from "../pages/productDetail/ProductDetailContainer";
import ProductDetail from "../pages/productDetail/ProductDetail";
import Admin from "../pages/admin/Admin";
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<App />}>
                    {/* for user */}
                    <Route
                        path="user"
                        element={
                            <Helmet title="Trang cá nhân">
                                <User />
                            </Helmet>
                        }
                    >
                        <Route
                            path="register"
                            element={
                                <Helmet title="Trang đăng ký tài khoản">
                                    <Register />
                                </Helmet>
                            }
                        />
                        <Route
                            path="about"
                            element={
                                <Helmet title="Trang thông tin cá nhân">
                                    <About />
                                </Helmet>
                            }
                        />
                        <Route
                            path="change-password"
                            element={
                                <Helmet title="Trang đổi mật khẩu">
                                    <ChangePassword />
                                </Helmet>
                            }
                        />
                        <Route
                            path="carts"
                            element={
                                <Helmet title="Trang giỏ hàng">
                                    <Carts />
                                </Helmet>
                            }
                        />
                        <Route
                            path="purchased"
                            element={
                                <Helmet title="Trang sản phẩm đã mua">
                                    <Purchased />
                                </Helmet>
                            }
                        />
                    </Route>
                    {/* for product detail */}
                    <Route
                        path="product-detail"
                        element={
                            <Helmet title="Trang chi tiết sản phẩm">
                                <ProductDetailContainer />
                            </Helmet>
                        }
                    >
                        <Route
                            path=":productId"
                            element={<ProductDetail />}
                        ></Route>
                    </Route>
                    {/* for Products */}
                    <Route
                        path=""
                        element={
                            <Helmet title="Trang chủ">
                                <Products />
                            </Helmet>
                        }
                    ></Route>
                </Route>
                {/* for admin */}
                <Route
                    path="admin"
                    element={
                        <Helmet title="Trang admin">
                            <Admin />
                        </Helmet>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
