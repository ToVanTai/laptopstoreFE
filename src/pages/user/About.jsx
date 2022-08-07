import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRoleId } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { baseUrlApi, baseUrlImg } from "../../configs/configs";
import { anonymousIcon } from "../../access/data/data";
const About = () => {
    let navigate = useNavigate();
    let roleId = useSelector(getRoleId);
    useEffect(() => {
        if (roleId === null) {
            navigate("../login");
        }
    });
    const [isShowAbout, setIsShowAbout] = useState(true);
    const [dataUser, setDataUser] = useState(null);
    useLayoutEffect(() => {
        if (roleId !== null) {
            fetch(`${baseUrlApi}user.php`, {
                method: "GET",
                credentials: "include",
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    res.json().then((res) => setDataUser(res));
                }
            });
        }
    }, [isShowAbout]);

    let showTable = (data) => {
        if (data !== null && roleId !== null && isShowAbout) {
            //show all infor
            return (
                <>
                <table className="user__about__table" border="1">
                    <tbody>
                        <tr>
                            <td>Tên tài khoản</td>
                            <td>{data.account}</td>
                        </tr>
                        <tr>
                            <td>Họ và tên</td>
                            <td>{data.name}</td>
                        </tr>
                        <tr>
                            <td>Số điện thoại</td>
                            <td>{data.phone_number}</td>
                        </tr>
                        <tr>
                            <td>Địa chỉ</td>
                            <td>{data.address}</td>
                        </tr>
                        <tr>
                            <td>Ảnh đại diện</td>
                            <td>
                                <img
                                    src={
                                        data.avatar !== null
                                            ? `${baseUrlImg}${data.avatar}`
                                            : anonymousIcon
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{data.email}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="user__about__buttons">
                <div
                    className="user__btn__action small active"
                    onClick={() => setIsShowAbout(false)}
                >
                    Thay đổi
                </div>
            </div></>
            );
        }
    };
    let showActionChangeTable = () => {
        if(!isShowAbout){
            return (
                <div className="user__about__buttons">
                    <div className="user__btn__action small active">Lưu thay đổi</div>
                    <div
                        className="user__btn__action small active"
                        onClick={()=>setIsShowAbout(true)}
                    >
                        Hủy
                    </div>
                </div>
            )
        }
    };
    return (
        <div className="user__about__container">
            <h2 className="user__heading">
                {isShowAbout
                    ? "Thông tin cá nhân"
                    : "Chỉnh sửa thông tin cá nhân"}
            </h2>
            {showTable(dataUser)}

            {showActionChangeTable()}
        </div>
    );
};

export default About;
