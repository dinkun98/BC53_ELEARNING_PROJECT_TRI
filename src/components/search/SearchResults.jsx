import { Col, Row } from "antd";
import React from "react";
import { CalendarOutlined, FieldTimeOutlined } from "@ant-design/icons";
import { FaSignal } from "react-icons/fa";
import styles from "./SearchResults.module.scss";
import { truncateText } from "../../utils";
import { NavLink } from "react-router-dom";

const SearchResults = (props) => {
  const { resultSearch } = props;

  return (
    <div>
      <h1 className={styles.resultTitle}>
        Hiện Thị {resultSearch?.length} Kết Quả
      </h1>
      <Row>
        {resultSearch &&
          resultSearch?.map((ele, index) => (
            <Col
              key={index}
              className={styles.resultItem}
              xs={24}
              md={12}
              lg={24}
            >
              <Row>
                <Col className={styles.image} xs={24} lg={8}>
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      className="w-full object-cover object-contain"
                      src={ele.hinhAnh}
                      alt="...."
                    />
                  </div>
                </Col>
                <Col className="lg:px-5 relative" xs={24} lg={16}>
                  <div className={styles.title}>
                    <h1 className="mt-3 lg:mt-0 text-lg lg:text-xl font-semibold mb-5">
                      {ele.tenKhoaHoc}
                    </h1>
                    <p className="text-lg font-medium text-gray-500">
                      {truncateText(ele.moTa, 200)}
                    </p>
                  </div>
                  <div className={styles.content}>
                    <div className="flex text-lg font-medium text-gray-500 mt-3">
                      <div className="flex items-center mr-2">
                        <div className={styles.contentItem}>
                          <FieldTimeOutlined className="mr-1 text-green-600" />
                          <span>8 Giờ</span>
                        </div>
                      </div>
                      <div className="flex items-center mr-2">
                        <div className={styles.contentItem}>
                          <CalendarOutlined className="mr-1 text-red-600" />
                          <span>8 Tuần</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className={styles.contentItem}>
                          <FaSignal className="mr-1 text-teal-600" />
                          <span>Tất Cả</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.searchSeeMore}>
                    <NavLink to={`/detail/${ele.maKhoaHoc}`}>
                      <button className={styles.btnSearchSeeMore}>
                        <span>Xem Thêm</span>
                      </button>
                    </NavLink>
                  </div>
                </Col>
              </Row>
            </Col>
          ))}
      </Row>
      {!resultSearch && (
        <div className="text-center">
          <h1 className="py-10 text-xl font-semibold">
            Không Tìm Thấy Kết Quả Phù Hợp
          </h1>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
