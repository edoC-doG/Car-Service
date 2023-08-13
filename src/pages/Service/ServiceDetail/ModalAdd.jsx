import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { addDetail} from './../../../features/service/serviceSlide';


function ModalAddDetail(props) {
  const dispatch = useDispatch();
  const { show, handleClose, serAdd} = props;
  const [servicePrice, setPrice] = useState("");
  const [minNumberOfCarLot, setMin] = useState("");
  const [maxNumberOfCarLot, setMax] = useState("");
  const [serviceId, setId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const ser = {
      servicePrice,
      minNumberOfCarLot,
      maxNumberOfCarLot,
      serviceId,
    };
    dispatch(addDetail(ser));
    console.log(ser);
  };
  useEffect(() => {
    if (show) {
      setId(serAdd);
    }
    console.log(serAdd);
  }, [serAdd]);
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
          <Modal.Title>Thêm mới chi tiết dịch vụ </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" hidden={true} >
              <Form.Label>Mã  dịch vụ</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={serviceId}
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
            <Row   className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Sô ghế nhỏ nhất của xe </Form.Label>
              {/* <Form.Control
                type="text"
                autoFocus
                value={minNumberOfCarLot}
                onChange={(e) => setMin(e.target.value)}
              /> */}
               <Form.Select  
                className="form-control"
                aria-label="Default select example"
                onChange={(e) => setMin(e.target.value)}
              >
                <option defaultValue={2} value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Số ghế lớn nhất của xe</Form.Label>
              {/* <Form.Control
                type="text"
                autoFocus
                value={maxNumberOfCarLot}
                onChange={(e) => setMax(e.target.value)}
              /> */}
               <Form.Select  
                className="form-control"
                aria-label="Default select example"
                onChange={(e) => setMax(e.target.value)}
              >
                <option defaultValue={5} value="5">5</option>
                <option value="7">7</option>
                <option value="12">12</option>
              </Form.Select>
            </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="success" type="submit">
              Thêm mới
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalAddDetail;
