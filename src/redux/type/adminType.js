const sliceName = 'adminSlice';

const adminType = {
    //quan ly tai khoan nguoi dung type
    GET_ACCOUNT_LIST: 'GET_ACCOUNT_LIST',
    CREATE_ACCOUNT: 'CREATE_ACCOUNT',
    GET_PROFILE: 'GET_PROFILE',
    FIND_ACCOUNT: 'FIND_ACCOUNT',
    DELETE_ACCOUNT: 'DELETE_ACCOUNT',
    GET_COURSE_LIST: 'GET_COURSE_LIST',
    SET_IS_ALERT_ERR: 'SET_IS_ALERT',
    SET_IS_ALERT_SUCCESS: 'SET_IS_ALERT_SUCCESS',
    GET_COURSE_STUDENT: 'GET_COURSE_STUDENT',
    IS_ERROR: 'IS_ERROR',
    GET_DETAIL_COURSE_EDIT: 'GET_DETAIL_COURSE_EDIT'

}

Object.keys(adminType).forEach(key => {
    adminType[key] = sliceName + '/' + adminType[key];
});

export default adminType;