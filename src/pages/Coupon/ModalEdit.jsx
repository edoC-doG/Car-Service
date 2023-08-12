import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap"; 
import { editProducts } from "./../../features/product/productSlice";

function ModalEdit(props) {
  const dispatch = useDispatch();
  const { show, handleClose, employEdit } = props;
  const [couponValue, setValue] = useState("");
  const [couponStartDate, setStart] = useState("");
  const [couponEndDate, setEnd] = useState("");
  const [couponMinSpend, setMin] = useState("");
  const [couponMaxSpend, setMax] = useState("");
  const [couponType, setCouponType] = useState("");
  const [garageId, setGarageId] = useState("");
  const [numberOfTimesToTUse, setTime] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const coupon = {
        couponValue,
        couponStartDate,
        couponEndDate,    
        couponMinSpend,
        couponMaxSpend,
        couponType,
        garageId,
        numberOfTimesToTUse,
      };
      // dispatch(addServices(ser));
      console.log(coupon)
  };
//   useEffect(() => {
//     if (show) {
//       setUserId(employEdit.userId);
//       setEmail(employEdit.userEmail);
//       setFullName(employEdit.fullName);
//       setPhone(employEdit.userPhone);
//       setRole(employEdit.roleDto.roleName);
//     }
//     console.log(employEdit);
//   }, [employEdit]);
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
            <Form.Group className="mb-3">
              <Form.Label>garageId</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={couponValue}
                onChange={(e) => setValue(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-  3">
              <Form.Label>Loại dịch vụ</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={couponStartDate}
                onChange={(e) => setStart(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số lần</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={couponEndDate}
                onChange={(e) => setEnd(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả dịch vụ</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={couponMinSpend}
                onChange={(e) => setMin(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thời gian tối đa để hoàn thành</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={couponMaxSpend}
                onChange={(e) => setMax(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thời gian tối đa để hoàn thành</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={couponType}
                onChange={(e) => setCouponType(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thời gian tối đa để hoàn thành</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={garageId}
                onChange={(e) => setGarageId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thời gian tối đa để hoàn thành</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={numberOfTimesToTUse}
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="success" type="submit" style={{ color: "black" }}>
              Cập nhật
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalEdit;
