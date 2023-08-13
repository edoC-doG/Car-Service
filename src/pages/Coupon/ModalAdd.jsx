import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import {
  addServices,
  getServices,
  resetState,
} from "./../../features/service/serviceSlide";
import DateTime from "./../../components/filter/DateTime";
import dayjs from "dayjs";
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
  const handleSubmit = (e) => {
    e.preventDefault();
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
  const garage = useSelector((state) => state.garage.garages);
  const [imageAsFile, setImageAsFile] = useState();
  const handleImageAsFile = (e) => {
    const img = e.target.files[0];
    setImageAsFile(img);
  };
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
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                {/* <Form.Label>Loại giảm giá</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  value={couponType}
                  onChange=setCouponType(e.target.value)}
                /> */}
                <div className="mb-1">
                  <label>Loại giảm giá</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="title"
                    name="title"
                    onChange={(e) => setCouponType(e.target.value)}
                    value={couponType}
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6">
                {/* <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  value={numberOfTimesToTUse}
                  onChange={(e) => setTime(e.target.value)}
                /> */}
                <div className="mb-1">
                  <label>Số lượng</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="title"
                    name="title"
                    onChange={(e) => setTime(e.target.value)}
                    value={numberOfTimesToTUse}
                  />
                </div>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              {/* <Form.Label>Giá trị giảm giá đơn hàng</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={couponValue}
                onChange={(e) => setValue(e.target.value)}
              /> */}
              <div className="mb-3">
                <label>Giá trị giảm giá đơn hàng</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="title"
                  name="title"
                  onChange={(e) => setValue(e.target.value)}
                  value={couponValue}
                />
              </div>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Thời gian bắt đầu</Form.Label>
                {/* <Form.Control
                type="text"
                autoFocus
                value={couponStartDate}
                onChange={(e) => setStart(e.target.value)}
              /> */}
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
                {/* <Form.Control
                type="text"
                autoFocus
                value={couponEndDate}
                onChange={(e) => setEnd(e.target.value)}
              /> */}
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
              {/* <Form.Label>Áp dụng giá trị đơn hàng tối thiểu</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={couponMinSpend}
                onChange={(e) => setMin(e.target.value)}
              /> */}
              <div className="mb-1">
                <label>Áp dụng giá trị đơn hàng tối thiểu</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="title"
                  name="title"
                  onChange={(e) => setMin(e.target.value)}
                  value={couponMinSpend}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              {/* <Form.Label>Áp dụng giá trị đơn hàng caothiểu</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={couponMaxSpend}
                onChange={(e) => setMax(e.target.value)}
              /> */}
                 <div className="mb-1">
                <label>Áp dụng giá trị đơn hàng caothiểu</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="title"
                  name="title"
                  onChange={(e) => setMax(e.target.value)}
                  value={couponMaxSpend}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Garage áp dụng khuyến mãi</Form.Label>
              {/* <Form.Control
                type="text"
                autoFocus
                value={garageId}
                onChange={(e) => setGarageId(e.target.value)}
              /> */}
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
