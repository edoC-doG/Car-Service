import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./../../firebase";
import { editServices } from "./../../features/service/serviceSlide";
import { useForm } from "react-hook-form";
function ModalEdit(props) {
  const dispatch = useDispatch();
  const { show, handleClose, serEdit } = props;
  const [serviceUnit, setUnit] = useState("");
  const [serviceId, setId] = useState("");
  const [serviceWarrantyPeriod, setPeriod] = useState("");
  const onHandleSubmit = (data) => {
    const imgSet = data.serviceImage;
    const img = imgSet[0];
    const file = img;
    if (!file) return null;
    const storageRef = ref(storage, `files/${file.name}`);
    console.log(storageRef);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log(downloadURL);
        const ser = {
          serviceName: data.serviceName,
          serviceImage: downloadURL,
          serviceWarrantyPeriod,
          serviceUnit,
          serviceDetailDescription: data.serviceDetailDescription,
          serviceDuration: data.serviceDuration,
          serviceId
        };
        dispatch(editServices(ser));
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
  useEffect(() => {
    if (show) {
      setValue(
        "serviceDetailDescription",
        `${serEdit.serviceDetailDescription}`
      );
      setValue(
        "serviceName",
        `${serEdit.serviceName}`
      );
      setValue(
        "serviceDuration",
        `${serEdit.serviceDuration}`
      );
      setId(serEdit.serviceId);
    }
    console.log(serEdit);
  }, [serEdit]);
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
        <Form onSubmit={handleSubmit(onHandleSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tên của dịch vụ</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="serviceName"
                {...register("serviceName", {
                  required: true,
                  maxLength: 30,
                  minLength: 6,
                })}
              />
              {errors.serviceName?.type === "required" && (
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  Không để trống tên dịch vụ !!!
                </p>
              )}
              {errors.serviceName?.type === "maxLength" && (
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  Tên dịch vụ tối đa 30 ký tự !!!
                </p>
              )}
              {errors.serviceName?.type === "minLength" && (
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  Tên dịch vụ tối thiểu 6 ký tự !!!
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thời gian bảo hành</Form.Label>
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
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Số lần</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Default select example"
                  onChange={(e) => setUnit(e.target.value)}
                >
                  <option>Chọn số lần</option>
                  <option value={0}>Lần</option>
                  <option value={1}>Gói</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Thời gian tối đa để hoàn thành</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  {...register("serviceDuration", {
                    required: true,
                  })}
                />
                {errors.serviceDuration?.type === "required" && (
                  <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                    Không được để trống !!!
                  </p>
                )}
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả dịch vụ</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                as="textarea"
                {...register("serviceDetailDescription", {
                  required: true,
                })}
              />
              {errors.serviceDetailDescription?.type === "required" && (
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  Không được để trống mô tả !!!
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh dịch vụ</Form.Label>
              <Form.Control
                type="file"
                autoFocus
                name="serviceImage"
                {...register("serviceImage", {
                  required: true,
                })}
              />
              {errors.serviceImage?.type === "required" && (
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
              Cập Nhật
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalEdit;
