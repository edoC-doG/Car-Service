import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch} from "react-redux";
import { Form } from "react-bootstrap";
import {
  updateDetail
} from "./../../features/book/bookingSlide";
function ModalDetail(props) {
  const dispatch = useDispatch();
  const { show, handleClose, detailService } = props;
  const [stt, setStt] = useState("")
  const confirmDelete =  () => {
    const data = {
      detailService, stt
    }
    dispatch(updateDetail(data))
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
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>
            Cập nhật trạng thái chi tiết đơn hàng
          </Modal.Title>
        </Modal.Header>
        <Form >
          <Modal.Body>
            <Form.Group className="mb-3"></Form.Group>
            <Form.Select
                className="form-control"
                aria-label="Default select example"
                value={stt}
                onChange={(e) => setStt(e.target.value)}
              >
                <option value={0}>Chưa bắt đầu</option>
                <option value={1}>Hoàn thành</option>
                <option value={2}>Không hoàn thành</option>
              </Form.Select>
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

export default ModalDetail;
