import produce from "immer"
import courseType from "../type/courseListType";

const initialState = {
    categoryList: [],
    categoryCourse: [],
    courseLoading: false,
    popularCourseLoading: false,
    popularCourses: null,
    detailCourse: null,
}

const reducer = (state = initialState, {type, payload}) => {

    return produce (state, (draft) => {
        switch(type){
            case courseType.CATEGORY_LIST:
                draft.categoryList = payload;
                break;

            case courseType.GET_COURSES_CATEGORY:
                draft.categoryCourse = payload;
                break;

            case courseType.COURSE_LOADING:
                draft.courseLoading = payload;
                break;

            case courseType.POPULAR_COURSE_LOADING:
                draft.popularCourseLoading = payload;
                break;
            
            case courseType.GET_POPULAR_COURSE:
                draft.popularCourses = payload;
                break;

            case courseType.GET_DETAIL_COURSE:
                draft.detailCourse = payload;
                break;
            
            default:
                break;
        }
    })
};

export default reducer;