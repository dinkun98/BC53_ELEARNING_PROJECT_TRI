
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Form, Radio, Input, DatePicker, Select, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Swal from 'sweetalert2';
import styles from '../accountManager/Admin.module.scss';
import { fetApiCourseAction, fetchApiEditDetailCourseAction } from '../../../redux/action/adminAction/courseManagerAction';
import adminService from '../../../services/adminSevice';


const EditCourse = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [imgSrc, setImgSrc] = useState('');

    const course = useSelector(state => state.courseManagerSlice.detailCourse);

    // lấy danh mục khóa học
    const { categoryList } = useSelector(state => state.courseList);

    useEffect(() => {

        dispatch(fetchApiEditDetailCourseAction(params.key));

    }, [params.key]);





    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maKhoaHoc: course?.maKhoaHoc,
            tenKhoaHoc: course?.tenKhoaHoc,
            moTa: course?.moTa,
            luotXem: course?.luotXem,
            danhGia: course?.danhGia,
            hinhAnh: null,
            maNhom: course?.maNhom,
            ngayTao: course?.ngayTao,
            maDanhMucKhoaHoc: course?.danhMucKhoaHoc.maDanhMucKhoahoc,
            taiKhoanNguoiTao: course?.nguoiTao.taiKhoan,
        },
        onSubmit: async (values) => {
            let formData = new FormData();
            for (let key in values) {

                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }
            try {

                await adminService.fetchApiEditCourse(formData);

                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cập nhật thành công',
                    showConfirmButton: false,
                    timer: 1500
                });

                await dispatch(fetApiCourseAction());

                navigate('/admin');

            } catch (err) {

                // vì đã thử nhiều lần bị lỗi sever CORS nên bắt buộc phải cập nhật lại hình ảnh,
                await Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: err.response?.data === 'Upload file không thành công!' ? `${err.response.data} , kiểm tra lại tên khóa học hoặc hình ảnh`
                        : 'Vui lòng cập nhật lại hình ảnh',
                    showConfirmButton: false,
                    timer: 2500
                });
            }

        }
    })

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChangeDatePicker = (value) => {
        let ngayTao = moment(value?.$d).format('DD/MM/YYYY');
        formik.setFieldValue('ngayTao', ngayTao);
    };

    // hàm thêm hình ảnh
    const handleChangeFile = async (e) => {
        let file = e.target.files[0];
        // luu vao formik
        await formik.setFieldValue('hinhAnh', file);
        if (file.type === 'image/png' || 'image/jpg' || 'image/jpeg' || 'image/gif') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result);
            };
        };

    }

    //hàm lấy giá trị input number
    const handleChangeInputNumber = (name) => {
        return (value) => { formik.setFieldValue(name, value) };
    };

    // chọn ma danh muc
    const handleChangeSelect = (value) => {
        formik.setFieldValue('maDanhMucKhoaHoc', value)
    };


    return (
        <div>
            <Form onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <h3 className='text-orange-600 mb-10'>Chỉnh Sửa Thông Tin Khoá Học</h3>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Mã khoá Học">
                    <Input name='maKhoaHoc' onChange={formik.handleChange} disabled={true} value={formik.values.maKhoaHoc} />
                </Form.Item>
                <Form.Item label="Tên Khoá">
                    <Input name='tenKhoaHoc' onChange={formik.handleChange} value={formik.values.tenKhoaHoc} />
                </Form.Item>
                <Form.Item label="Mô Tả">
                    <TextArea name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
                </Form.Item>
                <Form.Item label="Hình Ảnh">
                    <input type='file' onChange={handleChangeFile} accept="image/png, image/jpg, image/jpeg, image/gif" />

                    <img className='mt-5' src={imgSrc === '' ? course?.hinhAnh : imgSrc} alt="..." style={{ width: '200px' }} />

                </Form.Item>
                <Form.Item label="Ngày Tạo Khoá Học">
                    <DatePicker format="DD/MM/YYYY" onChange={handleChangeDatePicker} defaultValue={moment(formik.values.ngayTao, 'DD/MM/YYYY')} />
                </Form.Item>

                <Form.Item label="Lượt Xem">
                    <InputNumber name='luotXem' onChange={handleChangeInputNumber('luotXem')} value={formik.values.luotXem} placeholder='nhập danh lượt xem' min={0} />
                    {formik.errors.luotXem && formik.touched.luotXem && (<p className='text-red-700 mt-1'>{formik.errors.luotXem}</p>)}

                </Form.Item>

                <Form.Item label="Đánh Giá">
                    <InputNumber name='danhGia' onChange={handleChangeInputNumber('danhGia')} value={formik.values.danhGia} placeholder='nhập danh mục đánh giá' min={0} max={10} />
                    {formik.errors.danhGia && formik.touched.danhGia && (<p className='text-red-700 mt-1'>{formik.errors.danhGia}</p>)}

                </Form.Item>

                <Form.Item label="Danh Mục Khóa Học">
                    <Select options={categoryList.map(ele => ({ value: ele.maDanhMuc, label: ele.tenDanhMuc }))}
                        onChange={handleChangeSelect}
                        placeholder='Chọn danh mục khóa học'
                        defaultValue={formik.values.maDanhMucKhoaHoc}
                    />
                    {formik.errors.maLoaiNguoiDung && formik.touched.maLoaiNguoiDung && (<p className='text-red-700 mt-1'>{formik.errors.maLoaiNguoiDung}</p>)}
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <button className={styles.btnGradient} type='submit'>Cập Nhật</button>
                    <button
                        onClick={() => {navigate('/admin')}}
                        className={styles.btnGradient} type='button'>Hủy Cập Nhật</button>
                </Form.Item>

            </Form>

        </div>
    )
}


export default EditCourse