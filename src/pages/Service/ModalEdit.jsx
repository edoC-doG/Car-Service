import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./../../firebase";
import { editServices } from './../../features/service/serviceSlide';

function ModalEdit(props) {
  const dispatch = useDispatch();
  const { show, handleClose, serEdit } = props;
  console.log(serEdit)
  const [serviceId, setId] = useState("")
  const [serviceName, setName] = useState("");
  const [serviceGroup, setGroup] = useState("");
  const [serviceUnit, setUnit] = useState("");
  const [serviceDetailDescription, setDes] = useState("");
  const [serviceDuration, setDuration] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = imageAsFile;
    console.log("long file", file)  
    if (!file) return null
    const storageRef = ref(storage, `files/${file.name}`);
    console.log(storageRef)
    uploadBytes(storageRef, file).then((snapshot) => {
      e.target[0].value = "";
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log(downloadURL)
        const ser = { serviceId, serviceName, serviceImage:downloadURL, serviceGroup, serviceUnit, serviceDetailDescription, serviceDuration }
        dispatch(editServices(ser))                     
        console.log(ser)
      });
    });
  };
  const [imageAsFile, setImageAsFile] = useState();
  const handleImageAsFile = (e) => {
    const img = e.target.files[0];
    setImageAsFile(img);
  };
  
  useEffect(() => {
    if(show){
        setName(serEdit.serviceName) 
        setGroup(serEdit.serviceGroup)
        setUnit(serEdit.serviceUnit)
        setId(serEdit.serviceId)
        setDes(serEdit.serviceDetailDescription)
        setDuration(serEdit.serviceDuration)
    }
    console.log(serEdit)
  }, [serEdit])
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
          <Modal.Title>Cập nhật dịch vụ sửa chữa </Modal.Title>
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
            <Form.Group className="mb-3">
              <Form.Label>Mô tả dịch vụ</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                autoFocus
                value={serviceDetailDescription}
                onChange={(e) => setDes(e.target.value)}
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
