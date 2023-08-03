import React, { useState } from "react";
import Header from "../../components/Header";


const AddService = (props) => {
  const [files, setFiles] = useState([]);
  return (
    <div className="md:pt-24 md:px-8">
      <Header
        icon="https://i.imgur.com/1EPVEZN.png"
        size={25}
        alt="service"
        title="Add New Service"
      />
      <div className="row mb-4 card card-body px-3 py-4">
        <div className="row align-items-center">
        </div>
      </div>
    </div>
  );
};

export default AddService;
