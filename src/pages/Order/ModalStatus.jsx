import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { updateStt } from "./../../features/book/bookingSlide";
function ModalStatus(props) {
  const dispatch = useDispatch();
  const { show, handleClose, orderSta } = props;
  const [stt, setStt] = useState("");
  const [statusData, setStatusData] = useState("");
  const confirmDelete = () => {
    const data = {
      orderSta,
      stt,
    };
    dispatch(updateStt(data));
  };
  const status = useSelector((state) => state.booking.booking.bookingStatus);
  useEffect(() => {
    setStatusData(status);
  }, [status]);
  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>
            Cập nhật trạng thái đơn hàng
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            {statusData === "Pending" ? (
              <Form.Select
                className="form-control"
                aria-label="Default select example"
                value={stt}
                onChange={(e) => setStt(e.target.value)}
              >
                <option value={2}>Check in</option>
                <option value={1}>Hủy đơn hàng</option>
                <option value={4}>Hoàn thành</option>
              </Form.Select>
            ) : statusData === "CheckIn" ? (
              <Form.Select
                className="form-control"
                aria-label="Default select example"
                value={stt}
                onChange={(e) => setStt(e.target.value)}
              >
                <option value={1}>Hủy đơn hàng</option>
                <option value={4}>Hoàn thành</option>
              </Form.Select>
            ) : statusData === "Warranty" ? (
              <Form.Select
                className="form-control"
                aria-label="Default select example"
                value={stt}
                onChange={(e) => setStt(e.target.value)}
              >
                 <option value={1}>Hủy đơn hàng</option>
                <option defaultValue={4} value={4}>Hoàn thành</option>
              </Form.Select>
            ) : (<></>)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="warning" onClick={() => confirmDelete()}>
              Cập nhật
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalStatus;
