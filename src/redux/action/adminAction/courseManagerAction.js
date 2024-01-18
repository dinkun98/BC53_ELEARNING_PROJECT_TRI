
import { createAction } from '../createAction';
import adminType from '../../type/adminType';
import courseService from '../../../services/courseService';
import { isLoadingAction } from '../userAction';
import adminService from '../../../services/adminSevice';

//lay danh sach khoa hoc
export const fetApiCourseAction = (page, tuKhoa) => {
    return async (dispatch) => {
        try {

            dispatch(isLoadingAction(true));

            const res = await courseService.fetchApiPopularCourses(page, tuKhoa);

            dispatch(createAction(adminType.GET_COURSE_LIST, res.data));
            dispatch(createAction(adminType.IS_ERROR, null));

        } catch (err) {

            dispatch(createAction(adminType.IS_ERROR, err.response.data));

        } finally {

            dispatch(isLoadingAction(false));

        }

    }
}

//them khoa hoc
export const fetchApiCreateCourseAction = (formData) => {
    return async (dispatch) => {
        try {

            await courseService.fetApiCreateCourse(formData);

        }catch(err){

            throw err

        }
    }
};

// action lấy chi tiết khóa học edit

export const fetchApiEditDetailCourseAction = (maKH) => async (dispatch) => {
    try {
        dispatch(isLoadingAction(true));
        const res = await adminService.fetchApiEditDetailCourse(maKH);
        dispatch(createAction(adminType.GET_DETAIL_COURSE_EDIT, res.data));
    } catch (err) {
        // console.log(err);
    } finally {
        dispatch(isLoadingAction(false));
    }
};


// lấy danh sách học viên khóa học
export const fetchApiCourseStudentAction = (maKH) => async(dispatch) => {
    try {

        dispatch(isLoadingAction(true));

        const res = await adminService.fetchApiCourseStudent(maKH);

        dispatch(createAction(adminType.GET_COURSE_STUDENT, res.data));

    } catch (err) {
        // console.log(err.response)
    } finally {
        dispatch(isLoadingAction(false));
    }
};
