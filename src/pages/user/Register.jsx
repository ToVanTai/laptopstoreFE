import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { baseUrlApi, accountReg, passwordReg } from "../../configs/configs";
import {getRoleId} from "../../redux/selectors"
import {useDispatch , useSelector } from "react-redux";
import { loading, unLoading } from "../..//utils/utils";
import { toast, Toaster } from 'react-hot-toast';
const Register = () => {
    let navigate = useNavigate()
    let roleId = useSelector(getRoleId)
    useEffect(()=>{
        if(roleId!==null){
        navigate('../about')
    }
    })
    
    const {register, formState: {errors}, handleSubmit} = useForm()
    
    const handleLogin = ()=>{
        let formData = new FormData(loginForm.current);
        loading();
        fetch(`${baseUrlApi}usernew.php`,{
            method:"POST",
            body: formData
        }).then(res=>{
            if(res.status===200||res.status===201){
                unLoading();
                toast.success("Yêu cầu đăng ký tài khoản đã được gủi về email của bạn. Bạn vui lòng kiểm tra email trong vòng 5 phút!");
                setTimeout(() => {
                    navigate("../login")
                }, 2000);
            }else{//failed
                unLoading();
                res.text().then(res=>{
                    toast.error(res);
                })
            }
        }).catch(err=>{
            unLoading();
        })
        
    }
    let loginForm = useRef(null)
    //đăng nhập thành công->call api lấy thông tin user đã đăng nhập rồi lưu vào store
    return (
        <div className="user__register__container">
            <h2 className="user__heading">Đăng ký</h2>
            <form
                className="user__form"
                ref={loginForm}
                onSubmit={handleSubmit(handleLogin)}
                action=""
            >
                <div className="user__input__field">
                    <input
                        {...register("account", {
                            required: "Không được bỏ trống!",
                            minLength: {
                                value: 5,
                                message: "Dài tối thiểu 5 ký tự",
                            },
                            maxLength: {
                                value: 50,
                                message: "Dài tối đa 50 ký tự",
                            },
                            pattern: {
                                value: accountReg,
                                message:
                                    "Tên tài khoản phải là email!",
                            },
                        })}
                        type="text"
                        className={
                            errors.account ? "user__input show" : "user__input"
                        }
                        placeholder="Email của bạn"
                        id=""
                    />
                    <span className="user__input__field__icon">
                        <i className="bx bx-user"></i>
                    </span>
                    <span
                        className={
                            errors.account
                                ? "user__input__field__error show"
                                : "user__input__field__error"
                        }
                    >
                        {errors.account ? errors.account.message : ""}
                    </span>
                </div>
                <div className="user__input__field">
                    <input
                        {...register("password", {
                            required: "Không được bỏ trống!",
                            minLength: {
                                value: 5,
                                message: "Dài tối thiểu 15 ký tự",
                            },
                            maxLength: {
                                value: 18,
                                message: "Dài tối đa 20 ký tự",
                            },
                            pattern: {
                                value: passwordReg,
                                message:
                                    "Mật khẩu không được chứa khoảng trắng",
                            },
                        })}
                        type="password"
                        className={
                            errors.password ? "user__input show" : "user__input"
                        }
                        placeholder="Mật khẩu của bạn"
                        id=""
                    />
                    <span className="user__input__field__icon">
                        <i className="bx bx-lock-alt"></i>
                    </span>
                    <span
                        className={
                            errors.password
                                ? "user__input__field__error show"
                                : "user__input__field__error"
                        }
                    >
                        {errors.password ? errors.password.message : ""}
                    </span>
                </div>
                <input type="hidden" name="crud_req" value="register" />
                <button
                    className={
                        Object.keys(errors).length > 0
                            ? "user__btn__action"
                            : "user__btn__action active"
                    }
                >
                    Đăng ký
                </button>
            </form>
            <div className="user__register__forgotPassword">
                <Link to="../reset-password">Quên mật khẩu?</Link>
            </div>
            <div className="user__register__more__actions">
                <div className="user__register__more__actions__createAccount">
                    <Link to="../login">Đăng nhập</Link>
                    <Link to="../need-help">Cần giúp đỡ?</Link>
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
        </div>
    );
};

export default Register;
