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
const schema = yup
  .object({
    couponValue: yup.number().typeError("Vui lòng nhập số !!!"),
    couponMinSpend: yup.number().typeError("Vui lòng nhập số !!!"),
    couponMaxSpend: yup.number().typeError("Vui lòng nhập số !!!"),
    numberOfTimesToTUse: yup.number().typeError("Vui lòng nhập số !!!"),
  })
  .required();
function ModalAdd(props) {
  const dispatch = useDispatch();
  const { show, handleClose } = props;
  const [couponValue, setValue] = useState("");
  // const [couponStartDate, setStart] = useState("");
  const [date, setDay] = useState("");
  const [dateEnd, setDayEnd] = useState("");
  // const [couponEndDate, setEnd] = useState("");
  const [couponMinSpend, setMin] = useState("");
  const [couponMaxSpend, setMax] = useState("");
  const [couponType, setCouponType] = useState("");
  const [garageId, setGarageId] = useState("");
  const [numberOfTimesToTUse, setTime] = useState("");
  const onHandleSubmit = (data) => {
    const dateStart = dayjs(date.$d).format("MM/DD/YYYY");
    const dayEnd = dayjs(dateEnd.$d).format("MM/DD/YYYY");
    const coupon = {
      couponValue,
      couponStartDate: dateStart,
      couponEndDate: dayEnd,
      couponMinSpend,
      couponMaxSpend,
      couponType,
      garageId,
      numberOfTimesToTUse,
    };
    // dispatch(addServices(ser));
    console.log(coupon);
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      couponValue,
      couponMinSpend,
      couponMaxSpend,
      numberOfTimesToTUse,
    },
    resolver: yupResolver(schema),
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
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Loại giảm giá</Form.Label>
                <Form.Select
                  className=" form-control form-control-lg"
                  aria-label="Default select example"
                  onChange={(e) => setCouponType(e.target.value)}
                >
                  <option value={0}>Giảm theo phần trăm </option>
                  <option value={1}>Giảm trực tiếp giá tiền</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <div className="mb-1">
                  <label>Số lượng</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="numberOfTimesToTUse"
                    name="numberOfTimesToTUse"
                    {...register("numberOfTimesToTUse")}
                  />
                  <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                    {errors.numberOfTimesToTUse?.message}
                  </p>
                </div>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <div className="mb-3">
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
              <div className="mb-1">
                <label>Áp dụng giá trị đơn hàng tối thiểu</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="couponMinSpend"
                  name="couponMinSpend"
                  value={couponMinSpend}
                  {...register("couponMinSpend")}
                />
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  {errors.couponMinSpend?.message}
                </p>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="mb-1">
                <label>Áp dụng giá trị đơn hàng caothiểu</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="couponMaxSpend"
                  name="couponMaxSpend"
                  {...register("couponMaxSpend")}
                />
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  {errors.couponMaxSpend?.message}
                </p>
              </div>
            </Form.Group>
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
