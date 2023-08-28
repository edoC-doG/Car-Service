import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Time from "./Time";
import dayjs from "dayjs";
import { addGarage, getManager } from "../../features/garage/garageSlice";
const phoneRegExp = /^[0-9\- ]{8,14}$/;
const schema = yup
  .object({
    garageName: yup
      .string()
      .required("Không để trống tên của garage !!!")
      .min(1, "Tên của garage quá ngắn !")
      .max(50, "Tên của garage quá dài!"),
    garageContactInformation: yup
      .string()
      .matches(phoneRegExp, "Số điện thoại không hợp lệ !!!")
      .required("Không để trống số điện thoại !!!")
      .min(9,"Số điện thoại quá ngắn !")
      .max(12, "Số điện thoại quá dài !"),
    garageAddress: yup
      .string()
      .required("Không để trống tên của garage !!!")
      .min(1, "Địa chỉ của garage quá ngắn !")
      .max(50, "Địa chỉ của garage quá dài!"),
    garageWard: yup
      .string()
      .required("Không để trống tên của garage !!!")
      .min(1, "Phường của garage quá ngắn !")
      .max(30, "Phường của garage quá dài!"),
    garageDistrict: yup
      .string()
      .required("Không để trống tên của garage !!!")
      .min(1, "Quận của garage quá ngắn !")
      .max(30, "Quận chỉ của garage quá dài!"),
    garageCity: yup
      .string()
      .required("Không để trống tên của garage !!!")
      .min(1, "Thành phố của garage quá ngắn !")
      .max(30, "Thành phố của garage quá dài!"),
    garageAbout: yup
      .string()
      .required("Không để trống tên của garage !!!")
      .min(1, "Mô tả của garage quá ngắn !")
      .max(50, "Mô tả của garage quá dài!"),
  })
  .required();
function ModalAdd(props) {
  const dispatch = useDispatch();
  const { show, handleClose } = props;
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const [garageId, setGarageId] = useState("");
  const onHandleSubmit = (data) => {
    const openTime = dayjs(open.$d).format("h:mm A");
    const closeTime = dayjs(close.$d).format("h:mm A");
    const garage = {
      garageName: data.garageName,
      garageContactInformation: data.garageContactInformation,
      garageAbout: data.garageAbout,
      garageAddress: data.garageAddress,
      garageWard: data.garageWard,
      garageDistrict: data.garageDistrict,
      garageCity: data.garageCity,
      openAt: openTime,
      closeAt: closeTime,
      userId: garageId,
    };
    console.log(garage);
    dispatch(addGarage(garage));
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      garageName: "",
      garageContactInformation: "",
      garageAbout: "",
      garageAddress: "",
      garageWard: "",
      garageDistrict: "",
      garageCity: "",
      openAt: "",
      closeAt: "",
      userId: 0,
    },
    resolver: yupResolver(schema),
  });
  const gara = useSelector((state) => state.garage.isSuccessAdd);
  const { isSuccessAdd } = gara;
  useEffect(() => {
    dispatch(getManager());
    if (isSuccessAdd) {
      reset();
    }
  }, [isSuccessAdd, reset]);
  const detail = useSelector((state) => state.garage.managerAdd);
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
          <Modal.Title>Thêm mới garage trong hệ thống</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onHandleSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>
                Tên Garage <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                className="form-control-lg"
                type="text"
                autoFocus
                name="garageName"
                {...register("garageName")}
              />
              <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                {errors.garageName?.message}
              </p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                SĐT garage <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                className="form-control-lg"
                type="text"
                autoFocus
                name="garageContactInformation"
                {...register("garageContactInformation")}
              />
              <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                {errors.garageContactInformation?.message}
              </p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Địa chỉ của garage <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                className="form-control-lg"
                type="text"
                autoFocus
                name="garageAddress"
                {...register("garageAddress")}
              />
              <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                {errors.garageAddress?.message}
              </p>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>
                  Phường <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  className="form-control-lg"
                  type="text"
                  autoFocus
                  name="garageWard"
                  {...register("garageWard")}
                />
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  {errors.garageWard?.message}
                </p>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>
                  Quận <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  className="form-control-lg"
                  type="text"
                  autoFocus
                  name="garageDistrict"
                  {...register("garageDistrict")}
                />
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  {errors.garageDistrict?.message}
                </p>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>
                  Thành phố <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  className="form-control-lg"
                  type="text"
                  autoFocus
                  name="garageCity"
                  {...register("garageCity")}
                />
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  {errors.garageCity?.message}
                </p>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Quản lý của Garage</Form.Label>
                <Form.Select
                  className="form-control form-control-lg mb-3"
                  aria-label="Default select example"
                  onChange={(e) => setGarageId(e.target.value)}
                >
                  {detail
                    ? detail.map((ser) => {
                        return (
                          <option key={ser.id} value={ser.id}>
                            {ser.name}
                          </option>
                        );
                      })
                    : null}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>
                  Thời gian mở cửa <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Time
                  value={open}
                  onChange={(day) => {
                    setOpen(day);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>
                  Thời gian đóng cửa <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Time
                  value={close}
                  onChange={(day) => {
                    setClose(day);
                  }}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>
                Mô tả garage <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                className="form-control-lg"
                as="textarea"
                rows={3}
                type="text"
                autoFocus
                name="garageAbout"
                {...register("garageAbout")}
              />
              <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                {errors.garageAbout?.message}
              </p>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="success" type="submit" style={{ color: "black" }}>
              Thêm mới
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalAdd;
