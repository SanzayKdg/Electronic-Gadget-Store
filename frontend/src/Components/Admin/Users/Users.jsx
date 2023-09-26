import React, { Fragment, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Select,
} from "@chakra-ui/react";
import "./Users.css";
import AdminSidebar from "../../Layout/AdminSidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import Loader from "../../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import { deleteUserAsync, getAllUserAsync } from "../../../features/User/user";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "react-js-pagination";

const Users = () => {
  const { users, error, success, userCount, resultPerPage } = useSelector(
    (state) => state.user
  );
  const [deletedUser, setDeletedUser] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [role, setRole] = useState("");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const setPageNo = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (success === true && deletedUser === true) {
      alert.success("User Deleted");
      setDeletedUser(false);
    }
    dispatch(getAllUserAsync({ keyword, role, currentPage }));
  }, [
    alert,
    dispatch,
    error,
    success,
    deletedUser,
    keyword,
    currentPage,
    role,
  ]);

  return (
    <div className="userListContainer">
      <AdminSidebar />
      <div className="userListTable">
        <h1 className="userListHeader">All Users</h1>

        <div className="search__filterContainer">
          <div className="searchContainer">
            <div className="searchBox">
              <input
                type="text"
                id="searchBar"
                className="searchInput"
                placeholder="Search By User Name"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <SearchIcon className="searchIcon" />
            </div>
          </div>

          <div className="filter_container">
            <fieldset className="filterByCategory">
              <legend className="filter_legend">Filter By User Role</legend>
              <Select
                className="selectCats"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            </fieldset>
          </div>
        </div>
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
                          <Button
                            onClick={() => {
                              dispatch(deleteUserAsync(item._id));
                              setDeletedUser(true);
                            }}
                            className="userBtn"
                          >
                            <DeleteIcon className="userIcon" />
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Fragment>
                ))}
            </Table>
          </TableContainer>
          {resultPerPage && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={userCount}
                onChange={setPageNo}
                nextPageText="Next >"
                prevPageText="< Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
