import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import DateTime from "./../../components/filter/DateTime";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addCoupon, getCoupons } from "./../../features/coupon/couponSlice";
const schema = yup
  .object({
    couponValue: yup.number().typeError("Vui lòng nhập số !!!").max(99999, 'Giá trị giảm giá quá lớn !!!'),
    numberOfTimesToUse: yup
      .number()
      .typeError("Vui lòng nhập số !!!")
      .required("Vui lòng nhập số !!!")
      .max(99999, 'Số lượng mã giảm giá quá nhiều')
  })
  .required();
function ModalAdd(props) {
  const dispatch = useDispatch();
  const { show, handleClose } = props;
  const [date, setDay] = useState("");
  const [dateEnd, setDayEnd] = useState("");
  const [garageId, setGarageId] = useState("");
  const onHandleSubmit = (data) => {
    const dateStart = dayjs(date.$d).format("MM/DD/YYYY");
    const dayEnd = dayjs(dateEnd.$d).format("MM/DD/YYYY");
    const type = 1;
    const coupon = {
      couponValue: data.couponValue,
      couponStartDate: dateStart,
      couponEndDate: dayEnd,
      couponType: type,
      garageId,
      numberOfTimesToUse: data.numberOfTimesToUse,
    };
    dispatch(addCoupon(coupon));
    console.log(coupon);
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      couponValue: "",
      numberOfTimesToUse: "",
    },
    resolver: yupResolver(schema),
  });
  const isSuccessAdd = useSelector((state) => state.coupon.isSuccessAdd);
  useEffect(() => {
    if (isSuccessAdd) {
      reset();
    }
  });
  const garage = useSelector((state) => state.garage.garages);
  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới khuyến mãi </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onHandleSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <div className="mb-1">
                <label>Số lượng</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="numberOfTimesToUse"
                  name="numberOfTimesToUse"
                  {...register("numberOfTimesToUse")}
                />
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  {errors.numberOfTimesToUse?.message}
                </p>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="mb-1">
                <label>Giá trị giảm giá đơn hàng</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="couponValue"
                  name="couponValue"
                  {...register("couponValue")}
                />
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  {errors.couponValue?.message}
                </p>
              </div>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Thời gian bắt đầu</Form.Label>
                <DateTime
                  value={date}
                  onChange={(day) => {
                    setDay(day);
                  }}
                  format="MM/DD/YYYY"
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Thời gian kết thúc</Form.Label>
                <DateTime
                  value={dateEnd}
                  onChange={(day) => {
                    setDayEnd(day);
                  }}
                  format="MM/DD/YYYY"
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Garage áp dụng khuyến mãi</Form.Label>
              <Form.Select
                className="form-control form-control-lg"
                aria-label="Default select example"
                onChange={(e) => setGarageId(e.target.value)}
              >
                {garage
                  ? garage.map((ga) => {
                      return (
                        <option key={ga.garageId} value={ga.garageId}>
                          {ga.garageName}
                        </option>
                      );
                    })
                  : null}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="success" type="submit" style={{ color: "black" }}>
              Thêm mới
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalAdd;
