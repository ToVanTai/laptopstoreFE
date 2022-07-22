//configs api
const baseUrlApi = "http://localhost/BTL_N8/api/";
const baseUrlApiAdmin = "http://localhost/BTL_N8/admin/controller/";
// configs some pictures
import logo from "./../access/images/logo.png";
import product1 from "./../access/images/OIP.jpg";
import product2 from "./../access/images/product1.png";
import product3 from "./../access/images/product11-300x300.jpg";
import sale from "./../access/images/sale.webp";
import anonymous from "./../access/images/user.png";
// configs some regularExpression
//for admin
const regDiscount = "/^[0-9]{0,2}$/"; //0->99
const regPrice = "/^[0-9]{1,}$/"; //1->
const regQuantity = "/^[0-9]{0,}$/"; //0->
//for user
let accountReg = /^[a-z0-9]{3,15}$/;//Tên tài khoản: dài từ 3->15 ký tự, bao gồm số hoặc chữ thường, không chứa ký tự đặc biệt!\n
let passwordReg = /^\S{3,15}$/;//Mật khẩu: dài từ 3->15 ký tự, không được có khoảng trắng!\n
let nameReg = /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u; //name
let phoneNumberReg = /^0{1}[0-9]{8,12}$/; //phone_number
let emailReg =/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //email
// exports
export { baseUrlApi, baseUrlApiAdmin };
export { logo, product1, product2, product3, sale, anonymous };
export {regDiscount, regPrice, regQuantity};
export {accountReg, passwordReg, nameReg, phoneNumberReg, emailReg};
