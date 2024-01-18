
// action lấy danh mục khóa học 

import coursesService from "../../services/courseService";
import courseType from "../type/courseListType";
import { createAction } from "./createAction";
import { isLoadingAction } from "./userAction";


// action lay danh muc khoa hoc
export const fetchApiCategoryListAction = async (dispatch) => {
    try {
        dispatch(isLoadingAction(true));
        const res = await coursesService.fetchApiCategory();
        dispatch(createAction(courseType.CATEGORY_LIST, res.data));
    } catch (err) {
        // console.log(err);
    } finally {
        dispatch(isLoadingAction(false));
    }
};


// action lay khoa hoc theo danh muc

export const fetchApiCoursesWithCategoryAction = (category) => async (dispatch) => {
    try {

        dispatch(createAction(courseType.COURSE_LOADING, true));

        const res = await coursesService.fetchApiCoursesCategory(category);

        dispatch(createAction(courseType.GET_COURSES_CATEGORY, res.data));
    } catch (err) {
        // console.log(err);
    } finally {
        dispatch(createAction(courseType.COURSE_LOADING, false))
    }
};

// action lay danh sach khoa hoc pho bien

export const fetchApiPopularCoursesAction = (page) => async (dispatch) => {
    try{
        dispatch(createAction(courseType.POPULAR_COURSE_LOADING, true));

        const res = await coursesService.fetchApiPopularCourses(page);

        dispatch(createAction(courseType.GET_POPULAR_COURSE, res.data));
        
    } catch (err) {
        // console.log(err);
    } finally {
        dispatch(createAction(courseType.POPULAR_COURSE_LOADING, false));
    }
}

// lấy thông tin chi tiết khóa học
export const fetchApiDetailCourseAction = (maKH) => async (dispatch) => {
    try {
        
        dispatch(isLoadingAction(true));
        const res = await coursesService.fetchApiDetailCourse(maKH);

        dispatch(createAction(courseType.GET_DETAIL_COURSE, res.data));

    } catch (err) {
        // console.log(err);
    } finally {
        dispatch(isLoadingAction(false));
    };
};


// action lấy danh sách khóa học theo danh mục cho trang danh mục khóa học
export const fetchApiCategoryCoursesAction = (maDM) => async (dispatch) => {
    try {
        dispatch(isLoadingAction(true));
        const res = await coursesService.fetchApiCoursesCategory(maDM);
        dispatch(createAction(courseType.GET_COURSES_CATEGORY, res.data));
    } catch (err) {
        // console.log(err);
    } finally {
        dispatch(isLoadingAction(false));
    };
};

// edit khoa hoc
export const editCourseApi = (formData) => async (dispatch) => {
    try {
        dispatch(isLoadingAction(true));
        const res = await coursesService.fetchApiEditCourse(formData);

        // console.log(res)
    } catch (err) {
        // console.log(err.response);
    } finally {
        dispatch(isLoadingAction(false));
    }

}