import requester from "./apiRequester"
import { apiPathAdminList, apiPathCourseManagerList } from '../utils/apiPath';
import { maNhom } from '../utils/index';

class AdminService {

    // lấy danh sách tài khoản người dùng
    getApiAccountList = (page = 1, tuKhoa = null) => {
        return requester({
            url: apiPathAdminList.GET_API_ACCOUNT_LIST,
            method: 'GET',
            params: {
                MaNhom: maNhom,
                pageSize: 10,
                page: page,
                tuKhoa,
            },
        });
    };

    // them nguoi dung
    getApiCreateAccount = (formData) => {
        return requester({
            url: apiPathAdminList.ADD_ACCOUNT,
            method: 'POST',
            data: formData,
        });
    };


    // xóa tài khoản nguoi dùng
    getApiDeleteAccount = (taiKhoan) => {
        return requester({
            url: apiPathAdminList.DELETE_ACCOUNT,
            method: 'DELETE',
            params: {
                TaiKhoan: taiKhoan,
            },
        });
    };


    // call api lấy thông tin chi tiết khóa học
    fetchApiEditDetailCourse = (maKH) => {
        return requester({
            url: apiPathCourseManagerList.GET_EDIT_COURSE_DETAIL,
            method: 'GET',
            params: {
                maKhoaHoc: maKH,
            },
        });
    };


    //edit khoa hoc
    fetchApiEditCourse = (formData) => {
        return requester({
            url: apiPathCourseManagerList.EDIT_COURSES,
            method: 'POST',
            data: formData,
        })
    }

    // xóa khóa học
    getApiDeleteCourse = (MaKhoaHoc) => (
        requester({
            url: apiPathCourseManagerList.DELETE_COURSE,
            method: 'DELETE',
            params: {
                MaKhoaHoc: MaKhoaHoc
            },
        })
    );

    // lấy danh sách học viên khóa học;
    fetchApiCourseStudent = (MaKhoaHoc) => {
        return requester({
            url: apiPathCourseManagerList.GET_COURSE_STUDENT,
            method: 'POST',
            data: {
                MaKhoaHoc: MaKhoaHoc,
            }
        });
    };


    // lấy danh sách khóa học đã xét duyệt
    fetchApiApprovedCourseList = (taiKhoan) => (
        requester({
            url: apiPathAdminList.GET_APPROVED_COURSE_LIST,
            method: 'POST',
            data: {
                TaiKhoan: taiKhoan,
            }
        })
    );

    // lấy danh sách khóa học chờ xét duyệt
    fetchApiWaitingApprovalCourseList = (taiKhoan) => (
        requester({
            url: apiPathAdminList.GET_WAITING_APPROVAL_COURSE_LIST,
            method: 'POST',
            data: {
                TaiKhoan: taiKhoan,
            }
        })
    );

    //xét duyệt ghi danh khóa học
    fetchApiApprovalCourse = (formData) => (
        requester({
            url: apiPathAdminList.APPROVAL_COURSE,
            method: 'POST',
            data: formData
        })
    )

    // lấy danh sách học viên chờ xét duyệt
    fetchApiApprovalStudentList = (maKhoaHoc) => (
        requester({
            url: apiPathCourseManagerList.GET_APPROVAL_STUDENT_LIST,
            method: 'POST',
            data: {
                MaKhoaHoc: maKhoaHoc,
            },
        })
    );


};

const adminService = new AdminService();

export default adminService;