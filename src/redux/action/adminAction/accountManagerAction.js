import adminService from '../../../services/adminSevice';
import adminType from '../../type/adminType';
import { createAction } from '../createAction';
import { isLoadingAction } from '../userAction';





//lấy danh sách tài khoản người dùng AJAX
export const fetchApiAccountAction = (page, tuKhoa) => {
    return async (dispatch) => {
        try {
            dispatch(isLoadingAction(true));

            const res = await adminService.getApiAccountList(page, tuKhoa);

            dispatch(createAction(adminType.GET_ACCOUNT_LIST, res.data));

        } catch (err) {
            // console.log(err);
        } finally {
            dispatch(isLoadingAction(false));
        };
    };
};

//lay thong tin tai khoan
export const fetApiProfileAction = (taiKhoan) => async (dispatch) => {
    try {
        const res = await adminService.getAccountProfile(taiKhoan);
        dispatch(createAction(adminType.GET_PROFILE, res.data));
    } catch (err) {
        // console.log(err);
    }
}

// them nguoi dung
export const fetchApiCreateAccountAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const res = await adminService.getApiCreateAccount(taiKhoan);
            // console.log(res.data);
            dispatch(createAction(adminType.CREATE_ACCOUNT, res.data));
        } catch (err) {
            // console.log(err);
        }
    };
};


// sua thong tin nguoi dung
export const fetchApiAccountProfile = async (taiKhoan) => {
    
    return async (dispatch) => {
        try {
            
            const res = await adminService.fetchApiAccountProfile(taiKhoan);
            dispatch(createAction(adminType.EDIT_ACCOUNT, res.data));
        } catch (err) {
            // console.log(err);
        }
    }
}


// set is alert err
export const isAlertActionERR =  (data) => ({type: adminType.SET_IS_ALERT_ERR, payload: data})

//set is alert success
export const isAlertActionSuccess = (data) => ({type: adminType.SET_IS_ALERT_SUCCESS, payload: data});

// xóa tài khoản người dùng
export const fetchApiDeleteAccount = (taiKhoan) => {
    return async (dispatch) => {
        try {

            await adminService.getApiDeleteAccount(taiKhoan);
            
        } catch (err) {
            throw err.response.data           
        }
    };
};