import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./../../firebase";
import { addServices, getServices, resetState } from './../../features/service/serviceSlide';

function ModalAdd(props) {
  const dispatch = useDispatch();
  const { show, handleClose } = props;
  const [serviceName, setName] = useState("");
  const [serviceGroup, setGroup] = useState("");
  const [serviceUnit, setUnit] = useState("");
  const [serviceDetailDescription, setDes] = useState("");
  const [serviceDuration, setDuration] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = imageAsFile; 
    if (!file) return null
    const storageRef = ref(storage, `files/${file.name}`);
    console.log(storageRef)
    uploadBytes(storageRef, file).then((snapshot) => {
      e.target[0].value = "";
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const ser = { serviceName, serviceImage:downloadURL, serviceGroup, serviceUnit, serviceDetailDescription, serviceDuration }
        dispatch(addServices(ser))                     
      });
    });
  };
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
          <Modal.Title>Thêm mới dịch vụ sửa chữa </Modal.Title>
        </Modal.Header>
          <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tên của dịch vụ</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={serviceName}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loại dịch vụ</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={serviceGroup}
                onChange={(e) => setGroup(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số lần</Form.Label>
              <Form.Control
                type="text" 
                autoFocus
                value={serviceUnit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả dịch vụ</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={serviceDetailDescription}
                onChange={(e) => setDes(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thời gian tối đa để hoàn thành</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={serviceDuration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh dịch vụ</Form.Label>
              <Form.Control
                type="file"
                autoFocus
                name="serviceImage"
                onChange={handleImageAsFile}
              />
            </Form.Group>
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

export default ModalAdd;
