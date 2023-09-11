import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./../../firebase";
import { addProducts } from "./../../features/product/productSlice";
import { useForm } from "react-hook-form";
import { getServicesAdd } from "./../../features/service/serviceSlide";
function ModalAdd(props) {
  const dispatch = useDispatch();
  const { show, handleClose } = props;
  const [serviceId, setServiceId] = useState("");
  const [servicePeriod, setPeriod] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: "",
      productImage: "",
      productQuantity: "",
      productDetailDescription: "",
      productPrice: "",
    },
  });
  const onhandleSubmit = (data) => {
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
          productDetailDescription: data.productDetailDescription,
          categoryId,
          serviceId,
          productWarrantyPeriod: servicePeriod,
          productPrice: data.productPrice,
        };
        dispatch(addProducts(ser));
        console.log(ser);
      });
    });
  };
  const isSuccessAdd = useSelector((state) => state.product.isSuccessAdd);
  useEffect(() => {
    dispatch(getServicesAdd());
    if (isSuccessAdd) {
      reset();
    }
  }, [dispatch, isSuccessAdd, reset]);
  const category = [
    {
      categoryId: 1,
      categoryName: "Sản phẩm vệ sinh",
    },
    {
      categoryId: 2,
      categoryName: "Sản phẩm nâng cấp",
    },
  ];
  const service = useSelector((state) => state.service.servicesAdd);
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
        <Form onSubmit={handleSubmit(onhandleSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>
                Tên sản phẩm <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="productName"
                {...register("productName", {
                  required: true,
                  maxLength: 50,
                  minLength: 4,
                })}
              />
              {errors.productName?.type === "required" && (
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  Không để trống tên sản phẩm !!!
                </p>
              )}
              {errors.productName?.type === "maxLength" && (
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  Tên sản phẩm tối đa 50 ký tự !!!
                </p>
              )}
              {errors.productName?.type === "minLength" && (
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  Tên sản phẩm tối thiểu 4 ký tự !!!
                </p>
              )}
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>
                  Loại sản phẩm <span style={{ color: "red" }}>*</span>
                </Form.Label>
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
              <Form.Group as={Col} md="6">
                <Form.Label>Thời gian bảo hành <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Default select example"
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value={0}>Không bảo hành</option>
                  <option value={1}>1 Tháng</option>
                  <option value={3}>3 Tháng</option>
                  <option value={6}>6 Tháng</option>
                  <option value={12}>1 Năm</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>
                  Giá sản phẩm 
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  placeholder="(VD: 100 = 100.000 VND)"
                  name="productPrice"
                  {...register("productPrice", {
                    required: true,
                  })}
                />
                {errors.productPrice?.type === "required" && (
                  <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                    Không được để trống giá tiền !!!
                  </p>
                )}
              </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Dịch vụ sản phẩm cung ứng{" "}
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                className="form-control"
                aria-label="Default select example"
                onChange={(e) => setServiceId(e.target.value)}
              >
                {service
                  ? service.map((ser) => {
                      return (
                        <option key={ser.id} value={ser.id}>
                          {ser.name}
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
                as="textarea"
                type="text"
                autoFocus
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
