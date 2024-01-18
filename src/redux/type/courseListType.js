const sliceName = 'courseListSlice';

const courseType = {
    CATEGORY_LIST: 'CATEGORY_LIST',
    GET_COURSES_CATEGORY: 'GET_COURSES_CATEGORY',
    COURSE_LOADING: 'COURSE_LOADING',
    POPULAR_COURSE_LOADING: 'POPULAR_COURSE_LOADING',
    GET_POPULAR_COURSE: 'GET_POPULAR_COURSE', 
    GET_DETAIL_COURSE: 'GET_DETAIL_COURSE',
};


Object.keys(courseType).forEach(key => {
    return courseType[key] = sliceName + '/' + courseType[key];
});

export default courseType;