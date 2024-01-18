import { Table } from 'antd';
import clsx from 'clsx';
import React, { Fragment } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { isLoadingAction } from '../../../redux/action/userAction';
import adminService from '../../../services/adminSevice';
import userServices from '../../../services/userService';
import formData from '../../../utils/formData';
import styles from '../accountManager/Admin.module.scss';


const WaitingApprovalStudent = (props) => {

    const params = useParams();
    const dispatch = useDispatch();

    const [approvalStudentList, setApprovalStudentList] = useState([]);

    // lấy danh sách học viên chờ xet duyệt khóa học
    const getApiApprovalStudentList = async (maKhoaHoc) => {
        try {

            dispatch(isLoadingAction(true));

            const res = await adminService.fetchApiApprovalStudentList(maKhoaHoc);

            setApprovalStudentList(res.data);

        } catch (err) {
            // console.log(err);
        } finally {
            dispatch(isLoadingAction(false));
        }
    }

    useEffect(() => {

        getApiApprovalStudentList(params.course);

    }, [params.course]);

    // xét duyệt học viên
    const handleApprovedStudent = async ( maKhoaHoc, taiKhoan) => {
        try {

            dispatch(isLoadingAction(true));

            const data = formData.dataRegisterCourse(maKhoaHoc, taiKhoan);

            const res = await adminService.fetchApiApprovalCourse(data);
            
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.data,
                showConfirmButton: false,
                timer: 1500
            });

            await getApiApprovalStudentList(params.course);

        } catch (err) {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: err.response.data,
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            dispatch(isLoadingAction(false))
        };
    };


    // hủy đăng ký khóa học
    const handleUnsubscribe = async ( taiKhoan) => {
        try {

            dispatch(isLoadingAction(true));

            const newData = formData.dataUnsubscribeCourse(params.course, taiKhoan);
            const res = await userServices.fetchApiUnsubscribeCourse(newData);

            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.data,
                showConfirmButton: false,
                timer: 1500
            });
            await getApiApprovalStudentList(params.course);;
        } catch (err) {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: err.response.data,
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            dispatch(isLoadingAction(false));
        }; 
    };

    // data table
    const data = approvalStudentList;

    const columns = [
        {
            title: 'Họ Tên',
            dataIndex: 'hoTen',
            key: '1',
            sorter: (a, b) => {
                let tenA = a.hoTen.toLowerCase().trim();
                let tenB = b.hoTen.toLowerCase().trim();
                if (tenA > tenB) {
                    return 1
                } else {
                    return -1;
                }
            },
            render: (text, user) => {
                return <Fragment>
                    <h4 className={clsx(styles.gradientText, 'font-medium text-lg')}>{user.hoTen}</h4>
                </Fragment>
            },
            sortDirection: ['descend', 'ascend'],
            width: '20%',
        },
        {
            title: 'Tài Khoản',
            key: '2',
            dataIndex: 'taiKhoan',
            width: '20%',
            render: (text, user, index) => {
                return <Fragment>
                    <p>{user.taiKhoan}</p>
                </Fragment>
            },

        },
        {
            title: 'Bí Danh',
            key: '3',
            dataIndex: 'biDanh',
            width: '20%',
            render: (text, user, index) => {
                return <Fragment>
                    <p>{user.biDanh}</p>
                </Fragment>
            }
        },
        {
            title: 'Tác Vụ',
            key: '6',
            dataIndex: 'taiKhoan',
            width: '40%',
            render: (text, user, index) => {
                return <Fragment>
                    <button onClick={() => handleApprovedStudent(params.course, user.taiKhoan)} className={styles.btnGradient}>Xét Duyệt Học Viên</button>
                    <button onClick={() => handleUnsubscribe(user.taiKhoan)} className={styles.btnGradient}>Từ Chối Học Viên</button>
                </Fragment>
            }
        },

    ];



    return (
        <div>
            <div className="flex justify-between mb-5 md:mb-10" >
                <h3 className='text-teal-600 text-xl font-semibold'>Quản Lý Học Viên Khóa Học</h3>

            </div>
            <Table rowKey={'taiKhoan'} columns={columns} dataSource={data} />
        </div>
    )
}

export default WaitingApprovalStudent