import userServices from "../../services/userService";
import statusCode from "../../utils/statusCode";
import userType from "../type/userType";
import { createAction } from "./createAction";

// user login fetch api action
export const fetchApiLoginAction = (data) => async (dispatch) => {
    try {

        const res = await userServices.fetchApiLogin(data);

        if (res.status === statusCode.SUCCESS) {
            await localStorage.setItem('Token', res.data.accessToken);
        }
        await dispatch(createAction(userType.GET_PROFILE, res.data));

    } catch (err) {
        throw err;
    }
};



// action lay thong tin tai khoan
export const fetApiProfileAction = async (dispatch) => {
    try {

        const res = await userServices.fetchApiProfile();
        await dispatch(createAction(userType.GET_PROFILE, res.data));

    } catch (err) {
        // console.log(err);
    };
}

// action loading
export const isLoadingAction = (value) =>
    ({ type: userType.IS_LOADING, payload: value });

// actiion thay đổi tab active key
export const defaultTabActiveKeyAction = (value) =>
    ({ type: userType.SET_TAB_ACTIVE_KEY, payload: value });









