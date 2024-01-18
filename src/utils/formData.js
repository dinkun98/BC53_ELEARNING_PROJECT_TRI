class FormData {
    // đăng ký khóa học
    dataRegisterCourse = (maKH, taiKhoan) => {
        return {maKhoaHoc: maKH, taiKhoan: taiKhoan}
    };
    // hủy đăng ký khóa học
    dataUnsubscribeCourse = (maKH, taiKhoan) => {
        return {maKhoaHoc: maKH, taiKhoan: taiKhoan}
    };
};

const formData = new FormData();

export default formData;