import produce from "immer";
import adminType from "../../type/adminType";





const initialState = {
    accountList: null,
    isAlertErr: null,
    isAlertSuccess: null,
    detailAccount: null,

}



const reducer = (state = initialState, {
    type,
    payload
}) => {

    return produce(state, (draft) => {
        switch (type) {
            case adminType.GET_ACCOUNT_LIST:
                draft.accountList = payload;
                break;
            case adminType.ADD_ACCOUNT:
                draft.accountList = payload;
                break;
            
            case adminType.FIND_ACCOUNT:
                draft.accountList = payload;
                break;
            case adminType.DELETE_ACCOUNT:
                draft.accountList = payload;
                break;
            case adminType.EDIT_ACCOUNT:
                draft.accountList = payload;
                break;

            case adminType.SET_IS_ALERT_ERR:
                draft.isAlertErr = payload;
                break;

            case adminType.SET_IS_ALERT_SUCCESS:
                draft.isAlertSuccess = payload;
                break;
            case adminType.GET_PROFILE:
                draft.detailAccount = payload;
                break;

            default:
                break;
        }
    })
};

export default reducer;