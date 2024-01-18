
// api path đăng ký đăng nhập

export const apiPathUser = {
    USER_LOGIN: '/api/QuanLyNguoiDung/DangNhap',
    USER_REGISTER: '/api/QuanLyNguoiDung/DangKy',
    GET_ACCOUNT_PROFILE: '/api/QuanLyNguoiDung/ThongTinTaiKhoan',
    REGISTER_COURSE: '/api/QuanLyKhoaHoc/DangKyKhoaHoc',
    UNSUBSCRIBE_COURSE: '/api/QuanLyKhoaHoc/HuyGhiDanh',
    EDIT_PROFILE: '/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
}

// api path lay danh sach khoa hoc, danh muc, khóa học theo danh mục

export const apiPathCourseList = {
    CATEGORY_LIST: '/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc',
    GET_COURSES_CATEGORY: '/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc',
    GET_POPULAR_COURSES: '/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang',
    GET_COURSE_DETAIL: '/api/QuanLyKhoaHoc/LayThongTinKhoaHoc',
    GET_COURSE_DETAIL_STUDENT: '/api/QuanLyKhoaHoc/LayThongTinHocVienKhoaHoc',
    GET_CATEGORY_COURSE: '/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc',
    SEARCH_COURSES: '/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc',
    CREATE_COURSES: '/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh',
    
}

//api path quan ly nguoi dung
export const apiPathAdminList = {
    GET_API_ACCOUNT_LIST: '/api/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang',
    ADD_ACCOUNT: '/api/QuanLyNguoiDung/ThemNguoiDung',
    GET_ACCOUNT_PROFILE: '/api/QuanLyNguoiDung/ThongTinTaiKhoan',
    DELETE_ACCOUNT: 'api/QuanLyNguoiDung/XoaNguoiDung',
    GET_APPROVED_COURSE_LIST: '/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet',
    GET_WAITING_APPROVAL_COURSE_LIST: '/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet',
    APPROVAL_COURSE: '/api/QuanLyKhoaHoc/GhiDanhKhoaHoc',
   
}

//api path quan ly khoa hoc
export const apiPathCourseManagerList = {
    GET_API_COURSE_LIST: '/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang',
    DELETE_COURSE: '/api/QuanLyKhoaHoc/XoaKhoaHoc',
    GET_COURSE_STUDENT: '/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc',
    GET_APPROVAL_STUDENT_LIST: '/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet',
    EDIT_COURSES: '/api/QuanLyKhoaHoc/CapNhatKhoaHocUpload',
    GET_EDIT_COURSE_DETAIL: '/api/QuanLyKhoaHoc/LayThongTinKhoaHoc',
}