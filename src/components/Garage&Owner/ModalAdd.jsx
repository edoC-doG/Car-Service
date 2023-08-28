import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { getServicesToAdd } from "./../../features/service/serviceSlide";
import { addGarageService } from "./../../features/garage/garageSlice";
function ModalAdd(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[4];
  const { show, handleClose } = props;
  const [serviceId, setServiceId] = useState("");
  const [garageId, setGarageId] = useState("");
  const onHandleSubmit = () => {
    const ser = {
      serviceId,
      garageId,
    };
    dispatch(addGarageService(ser));
    console.log(ser);
  };
  const { handleSubmit } = useForm();
  useEffect(() => {
    setGarageId(id)
    dispatch(getServicesToAdd(id));
  }, []);
  const detail = useSelector((state) => state.service.servicesToAdd);
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
          <Modal.Title>Thêm mới dịch vụ sửa chữa cho garage </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onHandleSubmit)}>
          <Modal.Body>
          <Form.Group className="mb-3" hidden={true}>
              <Form.Label>Mã dịch vụ</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={garageId}
                onChange={(e) => setGarageId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên của dịch vụ</Form.Label>
              <Form.Select
                className="form-control"
                aria-label="Default select example"
                onChange={(e) => setServiceId(e.target.value)}
              >
                {detail
                  ? detail.map((ser) => {
                      return (
                        <option key={ser.id} value={ser.id}>
                          {ser.name}
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
