import React, { useState } from 'react';
import { Col, Pagination, Row } from 'antd';
import styles from './RegisteredCourses.module.scss';
import { Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { removeAccents, truncateText } from '../../../utils/index';
import userServices from '../../../services/userService';
import formData from '../../../utils/formData';
import Swal from 'sweetalert2';
import { fetApiProfileAction } from '../../../redux/action/userAction';


const RegisteredCourses = () => {
    const [dataSearch, setDataSearch] = useState(null);
    const { chiTietKhoaHocGhiDanh } = useSelector(state => state.userSlice.profile);
    const { profile } = useSelector(state => state.userSlice);

    const dispatch = useDispatch();
    // pagination index
    const [currentPage, setCurrentPage] = useState(1);
    const [coursePerPage] = useState(4);
    const indexOfLastCourse = currentPage * coursePerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursePerPage;
    const currentCourse = chiTietKhoaHocGhiDanh.slice(indexOfFirstCourse, indexOfLastCourse);

    // tim kiem khoa hoc da dang ky
    const onSearch = (e) => {
        const keyWord = removeAccents(e.target.value.toLowerCase().trim());
        if (keyWord !== '') {
            const data = chiTietKhoaHocGhiDanh.filter(ele => removeAccents(ele.tenKhoaHoc.toLowerCase()) === keyWord);
            setDataSearch(data);
        } else if (keyWord === '') {
            setDataSearch(null)
        }
    };
    // phân trang handle click
    const handleChangePagination = (current) => {
        setCurrentPage(current);
    };

    // hủy đăng ký khóa học
    const handleUnsubscribeCourse = async (data) => {
        try {
            const res = await userServices.fetchApiUnsubscribeCourse(data);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.data,
                showConfirmButton: false,
                timer: 1500
            });
            dispatch(fetApiProfileAction);
        } catch (err) {
            // console.log(err)
        }
    }

    return (
        <div className='lg:px-10 px-5'>
            <div className={styles.content}>
                <h1 className={styles.title}>Khóa Học Đã Đăng Ký</h1>

                <form className="flex items-center mt-10 lg:mt-0">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                        </div>
                        <input onChange={onSearch} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                    </div>
                </form>

            </div>
            {!dataSearch && currentCourse?.map((course, index) => (
                <Row key={index} className='relative shadow-lg lg:shadow-none mt-10 lg:border-b border-solid border-gray-300 lg:py-5'>
                    <Col xs={24} lg={8} >
                        <img src={course.hinhAnh} alt={course.tenKhoaHoc} className='w-full block object-cover object-center' />
                    </Col>
                    <Col xs={24} lg={16} className='lg:pl-5 p-5 lg:p-0 lg:h-48'>
                        <h1 className='my-2 lg:mt-0 text-[18px] lg:text-xl font-semibold'>{course.tenKhoaHoc}</h1>
                        <p className='text-justify text-[16px] font-medium text-gray-500'>{truncateText(course.moTa, 300)}</p>
                        <Row className='flex justify-between items-end text-[16px] mt-3 lg:absolute lg:bottom-0 lg:right-0 w-full lg:pl-5'>
                            <Col xs={24} md={12} lg={6}>
                                <span>Lượt Xem: <span className='font-bold'> {course.luotXem}</span> </span>

                            </Col>

                            <Col xs={24} md={12} lg={10}>
                                <span className='mr-2'>Đánh Giá:</span>
                                <Rate disabled defaultValue={10} value={course.danhGia / 2} allowHalf />

                            </Col>

                            <Col className='lg:text-right py-3 lg:py-0' xs={24} md={12} lg={6}>
                                <button
                                    onClick={() => {
                                        const data = formData.dataUnsubscribeCourse(course.maKhoaHoc, profile.taiKhoan)
                                        handleUnsubscribeCourse(data)
                                    }}
                                    className={styles.btnRegistered}><span>Hủy Đăng Ký</span>
                                </button>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))}
            {dataSearch && dataSearch.map((course, index) => (
                <Row key={index} className='relative shadow-lg lg:shadow-none mt-5 lg:border-b border-solid border-gray-300 lg:py-5'>
                    <Col xs={24} lg={8} >
                        <img src={course.hinhAnh} alt={course.tenKhoaHoc} className='w-full block object-cover object-center' />
                    </Col>
                    <Col xs={24} lg={16} className='lg:pl-5 p-5 lg:p-0'>
                        <h1 className='my-2 lg:mt-0 text-[18px] lg:text-xl font-semibold'>{course.tenKhoaHoc}</h1>
                        <p className='text-justify text-[16px] font-medium text-gray-500'>{truncateText(course.moTa, 300)}</p>
                        <Row className='flex justify-between items-end text-[16px] mt-3 lg:absolute lg:bottom-0 lg:right-0 w-full lg:pl-5'>
                            <Col xs={24} md={12} lg={6}>
                                <span>Lượt Xem: <span className='font-bold'> {course.luotXem}</span> </span>

                            </Col>

                            <Col xs={24} md={12} lg={10}>
                                <span className='mr-2'>Đánh Giá:</span>
                                <Rate disabled defaultValue={10} value={course.danhGia / 2} allowHalf />

                            </Col>

                            <Col className='lg:text-right py-3 lg:py-0' xs={24} md={12} lg={6}>
                                <button
                                    onClick={() => {
                                        const data = formData.dataUnsubscribeCourse(course.maKhoaHoc, profile.taiKhoan)
                                        handleUnsubscribeCourse(data)
                                    }}
                                    className={styles.btnRegistered}><span>Hủy Đăng Ký</span>
                                </button>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))}
            <div className='text-center mt-10'>
                <Pagination onChange={(current) => handleChangePagination(current)} defaultCurrent={1} pageSize={4} total={chiTietKhoaHocGhiDanh.length + 1} />
            </div>
        </div>
    )
}

export default RegisteredCourses