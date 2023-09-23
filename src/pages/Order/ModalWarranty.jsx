import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { updatePaid } from "./../../features/book/bookingSlide";
function ModalWarranty(props) {
  const dispatch = useDispatch();
  const { show, handleClose, warranty } = props;
  const listService = [
    {
      id: 1,
      name: "Long",
    },
    {
      id: 2,
      name: "Long2",
    },
  ];
  const [serviceArray, setArray] = useState([]);
  const handleChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setArray([...serviceArray, value]);
    }
    else{
        setArray(serviceArray.filter((e) => (e !== value)))
    }
  };
  const confirm = (e) => {
    e.preventDefault();
    // dispatch(updatePaid(money));
    console.log(serviceArray);
    handleClose()
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
            Tạo đơn bảo hành
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={confirm}>
          <Modal.Body>
            <label className="mb-3">
              {" "}
              Bạn có muốn bảo hành dịch vụ cho đơn hàng # {warranty} ?
            </label>
            <Form.Group className="mb-3">
              {listService
                ? listService.map((item, i) => {
                    return (
                      <div key={i} className="form-control form-control-lg mb-3" >
                        <input
                          style={{marginRight:"30px"}}
                          type="checkbox"
                          id={item.id}
                          value={item.id}
                          onChange={(e) => handleChange(e, i)}
                        />
                        <span>{item.name}</span>
                      </div>
                    );
                  })
                : null}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="warning" type="submit">
              Tạo đơn
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalWarranty;
