import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
// import { addServices, getServices, resetState } from './../../features/service/serviceSlide';

function ModalEdit(props) {
  const dispatch = useDispatch();
  const { show, handleClose, serEdit } = props;
  console.log(serEdit);
  const [servicePrice, setPrice] = useState("");
  const [minNumberOfCarLot, setMin] = useState("");
  const [maxNumberOfCarLot, setMax] = useState("");
  const [serviceDetailId, setId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const ser = {
      servicePrice,
      minNumberOfCarLot,
      maxNumberOfCarLot,
      serviceDetailId,
    };
    // dispatch(addDetail(ser));
    console.log(ser);
  };
  useEffect(() => {
    if (show) {
      setId(serEdit.serviceDetailId);
      setPrice(serEdit.servicePrice);
      setMax(serEdit.maxNumberOfCarLot);
      setMin(serEdit.minNumberOfCarLot);
    }
    console.log(serEdit);
  }, [serEdit]);
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
          <Modal.Title>Thêm mới chi tiết dịch vụ # {serviceDetailId} </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" hidden = {true}>
              <Form.Label>Mã dịch vụ</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={serviceDetailId}
                onChange={(e) => setId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gía chi tiết dịch vụ</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={servicePrice}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sô ghế nhỏ nhất của xe </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={minNumberOfCarLot}
                onChange={(e) => setMin(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số ghế lớn nhất của xe</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={maxNumberOfCarLot}
                onChange={(e) => setMax(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="warning" type="submit">
              Cập nhật
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalEdit;
