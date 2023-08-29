import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { addDetail } from "./../../../features/service/serviceSlide";
import { useForm } from "react-hook-form";

function ModalAddDetail(props) {
  const dispatch = useDispatch();
  const { show, handleClose, serAdd } = props;
  const [minNumberOfCarLot, setMin] = useState("");
  const [maxNumberOfCarLot, setMax] = useState("");
  const [serviceId, setId] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      servicePrice: "",
      serviceId:`${serAdd}`
    },
  });
  const onHandleSubmit = (data) => {
    const ser = {
      servicePrice: data.servicePrice,
      minNumberOfCarLot,
      maxNumberOfCarLot,
      serviceId,
    };
    dispatch(addDetail(ser));
    console.log(ser);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      setId(serAdd)
      reset();
    }
  }, [reset, isSubmitSuccessful, serAdd]);
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
        <Form onSubmit={handleSubmit(onHandleSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3" hidden={true}>
              <Form.Label>Mã dịch vụ</Form.Label>
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
                // value={servicePrice}
                // onChange={(e) => setPrice(e.target.value)}
                {...register("servicePrice", {
                  required: true,
                  maxLength: 30,
                  minLength: 4,
                })}
              />
              {errors.servicePrice?.type === "required" && (
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  Không để trống giá sản phẩm !!!
                </p>
              )}
            </Form.Group>
            <Row className="mb-3">
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
                  <option defaultValue={4} value="4">
                    4
                  </option>
                  <option value="5">5</option>
                  <option value="6">6</option>
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
                  <option defaultValue={5} value="5">
                    5
                  </option>
                  <option value="6">6</option>
                  <option value="7">7</option>
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
