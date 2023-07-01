import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import axios from "axios";

const TableDemo = () => {
  const [dataSource, setDataSource] = useState([]);
  const [search, setSearchText] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    fetchRecords();
  }, [page, pageSize]);

  const fetchRecords = () => {
    setLoading(true);
    axios
      .get(
        `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${pageSize}`
      )
      .then((res) => {
        setDataSource(res.data.data);
        setTotalPages(res.data.totalPages);
        setLoading(false);
        // console.log(response);
      });
  };



  const columns = [
    { title: "ID", dataIndex: "_id" },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (record1, record2) => {
        return record1.name > record2.name;
      },
     
    },
    { title: "Trips", dataIndex: "trips" },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        marginTop: "60px",
        width: '100%'
      }}
    >

      <Input.Search  
      placeholder="Search here..."
      style={{margin: '8px'}}
      onSearch={(value) => setSearchText(value)}
      onChange={(e) => {
        setSearchText(e.target.value)
      }}
      /> 
      <Table
        loading={loading}
        columns={columns}
        
        dataSource={dataSource}
        rowKey={(row) => row._id}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: totalPages,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      ></Table>
    </div>
  );
};

export default TableDemo;
