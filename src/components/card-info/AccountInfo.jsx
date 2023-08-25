import React from "react";

const AccountInfo = ({ title, items, name }) => {
  return (
    <div className={name === "mechanic" ? "" : "col-md-6"}>
      <div className="card">
        <div className="card-header text-capitalize">
          <h5 className="mb-0 font-semibold"> {title}</h5>
        </div>
        <div className="card-body" style={{ textAlign: "left" }}>
          {items.map((item) => (
            <div className="flex-start" key={item.name}> 
              <div>
                <h4 className="font-semibold">{item.name} :</h4>
              </div>
              <div className="mx-1">
                {item.name === "Status" ? (
                  <h4>
                    <label htmlFor="" className="badge badge-success">
                      {item.content}
                    </label>
                  </h4>
                ) : item.name === "Hoạt động" ? (
                  <h4>
                    {item.content === "Closed" ? (
                      <div>
                        <label
                          htmlFor=""
                          className="badge badge-soft-danger fz-12"
                        >
                          {item.content}
                        </label>
                        <span className="font-semibold"> &sdot; {item.more}</span>
                      </div>
                    ) : (
                      <label htmlFor="" className="badge badge-success">
                        {item.content}
                      </label>
                    )}
                  </h4>
                ) : (
                  <h5 className="font-semibold mb-2">{item.content}</h5>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
