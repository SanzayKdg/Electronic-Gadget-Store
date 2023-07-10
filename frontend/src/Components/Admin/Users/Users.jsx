import React, { Fragment } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import "./Users.css";
import AdminSidebar from "../../Layout/AdminSidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { loadAllUser } from "../../../Redux/Actions/admin";
import Loader from "../../Layout/Loader/Loader";
import { clearErrors } from "../../../Redux/Slices/admin";
import { Link } from "react-router-dom";

const Users = () => {
  const { loading, users, error } = useSelector((state) => state.allUsers);
  const { token } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(loadAllUser());
  }, [alert, dispatch]);

  return (
    <div className="userListContainer">
      {loading ? (
        <Loader />
      ) : (
        <>
          {token && (
            <>
              <AdminSidebar />
              <div className="userListTable">
                <h1 className="userListHeader">All Users</h1>
                <div className="userTable">
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th className="userAction">User ID</Th>
                          <Th className="userAction">Name</Th>
                          <Th className="userAction">Email</Th>
                          <Th className="userAction">Role</Th>
                          <Th className="userAction">Actions</Th>
                        </Tr>
                      </Thead>
                      {users &&
                        users.map((item, index) => (
                          <Fragment key={index}>
                            <Tbody>
                              <Tr>
                                <Td className="tableAction">{item._id}</Td>
                                <Td className="tableAction">{item.name}</Td>
                                <Td className="tableAction">{item.email}</Td>
                                <Td
                                  className={
                                    item.role === "admin"
                                      ? "tableAction reviewGreen"
                                      : "tableAction reviewRed"
                                  }
                                >
                                  {item.role}
                                </Td>
                                <Td className="tableAction tableActionBtn">
                                  <Link
                                    to={`/admin/user/${item._id}`}
                                    className="userBtn linkIcon"
                                  >
                                    <EditIcon className="userIcon" />
                                  </Link>
                                  <Button className="userBtn">
                                    <DeleteIcon className="userIcon" />
                                  </Button>
                                </Td>
                              </Tr>
                            </Tbody>
                          </Fragment>
                        ))}
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Users;
