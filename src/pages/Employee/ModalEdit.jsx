import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./../../firebase";
import { editProducts } from "./../../features/product/productSlice";

function ModalEdit(props) {
  const dispatch = useDispatch();
  const { show, handleClose, employEdit } = props;
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPhone, setPhone] = useState("");
  const [roleName, setRole] = useState("");
  const handleSubmit = (e) => {
   
  };
  useEffect(() => {
    if (show) {
      setUserId(employEdit.userId);
      setEmail(employEdit.userEmail);
      setFullName(employEdit.fullName);
      setPhone(employEdit.userPhone);
      setRole(employEdit.roleDto.roleName);
    }
    console.log(employEdit);
  }, [employEdit]);
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
          <Modal.Title>Cập nhật nhân viên</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>ID Nhân viên</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên nhân viên</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Nhân viên</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={userEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số Điện Thoại</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={userPhone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Chức vụ nhân viên</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={roleName}
                onChange={(e) => setRole(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Hình ảnh sản phẩm</Form.Label>
              <Form.Control
                type="file"
                autoFocus
                name="productImage"
                onChange={handleImageAsFile}
              />
            </Form.Group> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="warning" type="submit">
              Thêm mới
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalEdit;
