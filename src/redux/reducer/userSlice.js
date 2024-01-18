import produce from "immer"
import userType from "../type/userType";

const initialState = {
    profile: null,
    globalLoading: false,
    activeKeyTab: '1',
}

const reducer = (state = initialState, {type, payload}) => {
    return produce (state, (draft) => {
        switch(type){
            case userType.GET_PROFILE:
                draft.profile = payload;
                break;
                
            case userType.IS_LOADING: 
                draft.globalLoading = payload;
                break; 
            
            case userType.SET_TAB_ACTIVE_KEY:
                draft.activeKeyTab = payload;
                break;

            default:
                break;
        }
    })

}

export default reducer;