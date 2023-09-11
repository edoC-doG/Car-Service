import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import {
  updatePaid,
} from "./../../features/book/bookingSlide";
function ModalMoney(props) {
  const dispatch = useDispatch();
  const { show, handleClose, money } = props;
  const confirmDelete = async () => {
    dispatch(updatePaid(money));
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
            Thanh toán đơn hàng
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3"></Form.Group>
            <label> Bạn có muốn cập nhật trạng thái đã thanh toán cho đơn hàng  # {money} ?</label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="warning" onClick={() => confirmDelete()}>
              Thanh toán
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalMoney;
