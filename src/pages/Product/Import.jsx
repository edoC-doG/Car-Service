import React from "react";
import Header from "../../components/Header";
import Instruction from "../../components/import/Instruction";

const Import = () => {
  return (
    <div className="md:pt-24 md:px-8">
      <Header
        icon="https://6valley.6amtech.com/public/assets/back-end/img/bulk-import.png"
        alt="import"
        title="Import"
      />


      <div className="row">
        {/* Instruction */}
        <div className="col-md-12">
          <Instruction />
        </div>
        {/* Form upload  */}
        <div className="col-md-12 mt-2"></div>
      </div>

    </div>
  );
};

export default Import;
