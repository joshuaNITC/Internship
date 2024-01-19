import React from "react";
import "./table.css";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { BASE_URL } from "../../Services/helper";
import { NavLink } from "react-router-dom";

const Tables = ({ userdata, deleteUser }) => {
  //we did obj destructuring, we could have also done props.userdata
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-2">
            <Card className="shadow mt-3 p-3">
              <Table
                striped
                bordered
                hover
                className="align-items-center"
                responsive="sm"
              >
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? (
                    userdata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{element.fname + " " + element.lname}</td>
                            <td>{element.email}</td>
                            <td>{element.gender === "Male" ? "M" : "F"}</td>
                            <td className="d-flex align-items-center justify-content-center">
                              <Dropdown className="text-center ">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  id="dropdown-basic"
                                >
                                  <Badge
                                    bg={
                                      element.status == "Active"
                                        ? "primary"
                                        : "danger"
                                    }
                                  >
                                    {element.status} &nbsp;
                                    <i class="fa-solid fa-angle-down "></i>
                                  </Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>Active</Dropdown.Item>
                                  <Dropdown.Item>InActive</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td className="img_parent text-center">
                              <img
                                src={`${BASE_URL}/uploads/${element.profile}`}
                                alt="img"
                              />
                            </td>
                            <td className="text-center">
                              <Dropdown className="text-center ">
                                <Dropdown.Toggle
                                  className="action"
                                  id="dropdown-basic"
                                  variant="light"
                                >
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/userprofile/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        class="fa-solid fa-eye"
                                        style={{ color: "green" }}
                                      ></i>
                                      <span>&nbsp; View</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/edit/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        class="fa-regular fa-pen-to-square"
                                        style={{ color: "blue" }}
                                      ></i>
                                      &nbsp; Edit
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <div onClick={()=>deleteUser(element._id)}>
                                      <i class="fa-solid fa-trash"></i>
                                      &nbsp;Delete
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <div className="no_data text-center ">No data found</div>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
};

export default Tables;
