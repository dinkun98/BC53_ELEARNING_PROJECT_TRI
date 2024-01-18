import { apiPathUser } from "../utils/apiPath"
import requester from "./apiRequester"

class UserServices {
    // dang nhap
    fetchApiLogin = (data) => {
        return requester({
            url: apiPathUser.USER_LOGIN,
            method: 'POST',
            data: data
        });
    };
    // dang ky
    fetchApiRegister = (data) => {
        return requester({
            url: apiPathUser.USER_REGISTER,
            method:'POST',
            data: data,
        })
    };

    // lay thong tin tai khoan
    fetchApiProfile = () => (
        requester({
            url: apiPathUser.GET_ACCOUNT_PROFILE,
            method: 'POST',
        })
    ) 

    // dang ky khoa hoc
    fetchApiRegisterCourse = (data) => {
        return requester({
            url: apiPathUser.REGISTER_COURSE,
            method: 'POST',
            data: data,
        })
    };

    // cập nhật thông tin tài khoản
    fetchApiEditProfile = (data) => (
        requester({
            url: apiPathUser.EDIT_PROFILE,
            method: 'PUT',
            data: data,
        })
    );
    // hủy đăng ký khóa học
    fetchApiUnsubscribeCourse = (data) => (
        requester({
            url: apiPathUser.UNSUBSCRIBE_COURSE,
            method: 'POST',
            data: data,
        })
    );
};

const userServices = new UserServices();

export default userServices;