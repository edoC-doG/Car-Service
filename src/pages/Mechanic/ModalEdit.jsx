import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./../../firebase";
import { editProducts } from './../../features/product/productSlice';

function ModalEdit(props) {
    const dispatch = useDispatch();
    const { show, handleClose,mechaEdit } = props;
    const [productName, setName] = useState("");
    const [productId, setServiceId] = useState("");
    const [productQuantity, setQuantity] = useState("");
    const [productDetailDescription, setDes] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [productPrice, setPrice] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      const file = imageAsFile; 
      if (!file) return null
      const storageRef = ref(storage, `files/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        e.target[0].value = "";
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          const ser = { productName, productImage:downloadURL, productQuantity, productDetailDescription, categoryId, productId,productPrice}
          dispatch(editProducts(ser))        
          console.log(ser)   
        });
      });
    };
    const [imageAsFile, setImageAsFile] = useState();
    const handleImageAsFile = (e) => {
      const img = e.target.files[0];
      setImageAsFile(img);
    };
//   useEffect(() => {
//     if(show){
//         setName(proEdit.productName) 
//         setServiceId(proEdit.productId)
//         setCategoryId(proEdit.categoryProductDto.categoryId)
//         setDes(proEdit.productDetailDescription)
//         setPrice(proEdit.productPrice)
//         setQuantity(proEdit.productQuantity)
//     }
//     console.log(proEdit)
//   }, [proEdit])
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
          <Modal.Title>Thêm mới sản phẩm</Modal.Title>
        </Modal.Header>
          <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={productName}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giá sản phẩm</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={productPrice}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số lượng sản phẩm</Form.Label>
              <Form.Control
                type="text" 
                autoFocus
                value={productQuantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loại sản phẩm</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" hidden={true}>
              <Form.Label>Dịch vụ sản phẩm cung ứng</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={productId}
                onChange={(e) => setServiceId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả sản phẩm</Form.Label>
              <Form.Control
                type="text"                
                autoFocus
                value={productDetailDescription}
                onChange={(e) => setDes(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh sản phẩm</Form.Label>
              <Form.Control
                type="file"
                autoFocus
                name="productImage"
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

export default ModalEdit;
