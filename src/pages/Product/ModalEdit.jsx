import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./../../firebase";
import { editProducts } from "./../../features/product/productSlice";
import { useForm } from "react-hook-form";
function ModalEdit(props) {
  const dispatch = useDispatch();
  const { show, handleClose, proEdit } = props;
  const [productName, setName] = useState("");
  const [productId, setServiceId] = useState("");
  const [productQuantity, setQuantity] = useState("");
  const [productDes, setDes] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPrice, setPrice] = useState("");
  const onHandleSubmit = (data) => {
    const imgSet = data.productImage;
    const img = imgSet[0];
    const file = img;
    if (!file) return null;
    const storageRef = ref(storage, `files/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const ser = {
          productName: data.productName,
          productImage: downloadURL,
          productQuantity: data.productQuantity,
          productDetailDescription: data.productDetailDescription,
          categoryId,
          productId ,
          productPrice: data.productPrice,
        };
        dispatch(editProducts(ser));
        console.log(ser);
      });
    });
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const category = useSelector((state) => state.category.categories);
  useEffect(() => {
    if (show) {
      setValue(
        "productDetailDescription",
        `${proEdit.productDetailDescription}`
      );
      setValue(
        "productName",
        `${proEdit.productName}`
      );
      setValue(
        "productPrice",
        `${proEdit.productPrice}`
      );
      setValue(
        "productQuantity",
        `${proEdit.productQuantity}`
      );
      setServiceId(proEdit.productId);
      // setName(proEdit.productName);
      // setServiceId(proEdit.productId);
      // setCategoryId(proEdit.categoryProductDto.categoryId);
      // setDes(proEdit.productDetailDescription);
      // setPrice(proEdit.productPrice);
      // setQuantity(proEdit.productQuantity);
    }
  }, [proEdit]);
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
          <Modal.Title>Cập nhật sản phẩm</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onHandleSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tên sản phẩm <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                type="text"
                autoFocus
                // value={productName}
                // onChange={(e) => setName(e.target.value)}
                name="productName"
                {...register("productName", { required: true })}
              />
              {errors.productName?.type === "required" && (
              <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                Không được để tên sản phẩm !!!
              </p>
            )}
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Giá sản phẩm <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  // value={productPrice}
                  // onChange={(e) => setPrice(e.target.value)}
                  name="productPrice"
                  {...register("productPrice", { required: true })}
                />
                {errors.productPrice?.type === "required" && (
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  Không được để trống giá sản phẩm !!!
                </p>
              )}
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Số lượng sản phẩm <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  // value={productQuantity}
                  // onChange={(e) => setQuantity(e.target.value)}
                  name="productQuantity"
                  {...register("productQuantity", { required: true })}
                />
                {errors.productQuantity?.type === "required" && (
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  Không được để số lượng sản phẩm !!!
                </p>
              )}
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Loại sản phẩm <span style={{ color: "red" }}>*</span></Form.Label>
              {/* <Form.Control
                type="text"
                autoFocus
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              /> */}
              <Form.Select
                className="form-control"
                aria-label="Default select example"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {category
                  ? category.map((cate) => {
                      return (
                        <option key={cate.categoryId} value={cate.categoryId}>
                          {cate.categoryName}
                        </option>
                      );
                    })
                  : null}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Mô tả sản phẩm <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="productDetailDescription"
                {...register("productDetailDescription", { required: true })}
              />
              {errors.productDetailDescription?.type === "required" && (
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  Không được để trống mô tả sản phẩm !!!
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Hình ảnh sản phẩm <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="file"
                autoFocus
                name="productImage"
                {...register("productImage", { required: true })}
              />
              {errors.productImage?.type === "required" && (
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  Không được để trống hình ảnh !!!
                </p>
              )}
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
