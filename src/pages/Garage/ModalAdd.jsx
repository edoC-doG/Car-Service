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
const phoneRegExp = /^[0-9\- ]{8,14}$/;
const schema = yup
  .object({
    garageName: yup
      .string()
      .required("Không để trống tên của garage !!!")
      .min(1, "Tên của garage quá ngắn !")
      .max(25, "Tên của garage quá dài!"),
    garageContactInformation: yup
      .string()
      .matches(phoneRegExp, "Số điện thoại không hợp lệ !!!")
      .required("Không để trống số điện thoại !!!")
      .max(10, "Số điện thoại quá dài !"),
    garageAddress: yup
      .string()
      .required("Không để trống tên của garage !!!")
      .min(1, "Địa chỉ của garage quá ngắn !")
      .max(50, "Địa chỉ của garage quá dài!"),
    garageAddress: yup
      .string()
      .required("Không để trống tên của garage !!!")
      .min(1, "Địa chỉ của garage quá ngắn !")
      .max(50, "Địa chỉ của garage quá dài!"),
    garageAddress: yup
      .string()
      .required("Không để trống tên của garage !!!")
      .min(1, "Địa chỉ của garage quá ngắn !")
      .max(50, "Địa chỉ của garage quá dài!"),
    // userPassword: yup
    //   .string()
    //   .required("Không để trống mật khẩu !!!")
    //   .min(1, "Mật khẩu quá ngắn !")
    //   .max(25, "Mật khẩu quá dài !"),
    // passwordConfirm: yup
    //   .string()
    //   .required("Không để trống xác nhận mật khẩu !!!")
    //   .oneOf(
    //     [yup.ref("userPassword")],
    //     "Mật khẩu xác nhận không khớp với mặt khẩu đã nhập ! "
    // ),
  })
  .required();
function ModalAdd(props) {
  const dispatch = useDispatch();
  const { show, handleClose } = props;
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const onHandleSubmit = (data) => {
    console.log(data);
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
      userId: 0,
    };
    console.log(garage);
    // dispatch(addEmployees(garage))
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
  // const empState = useSelector((state) => state.employee);
  // const { isSuccessAdd } = empState;
  // useEffect(() => {
  //   if (isSuccessAdd) {
  //     reset();
  //   }
  // }, [isSuccessAdd, reset, roleUser]);
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
            <Form.Group className="mb-3">
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
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>
                  Thời gian bắt đầu <span style={{ color: "red" }}>*</span>
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
                  Thời gian kết thúc <span style={{ color: "red" }}>*</span>
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
