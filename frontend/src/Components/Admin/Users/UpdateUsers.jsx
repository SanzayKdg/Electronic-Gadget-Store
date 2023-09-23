import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Layout/Loader/Loader";
import { getUserAsync, updateUserRoleAsync } from "../../../features/User/user";

const UpdateUsers = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, success, error, user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [updatedUser, setUpdatedUser] = useState(false);
  useEffect(() => {
    dispatch(getUserAsync(id));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name !== undefined ? user.name : "");
      setEmail(user.email !== undefined ? user.email : "");
      setRole(user.role !== undefined ? user.role : "");
    }
  }, [user]);

  const updateUserHandler = (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.set("name", name);
    userData.set("email", email);
    userData.set("role", role);

    dispatch(updateUserRoleAsync({ userId: id, userData }));
    setUpdatedUser(true);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (success === true && updatedUser === true) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      setUpdatedUser(false);
    }
  }, [error, success, dispatch, alert, navigate, updatedUser]);

  return (
    <div className="addProductsContainer">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productForm">
            <form className="updateOrderForm" onSubmit={updateUserHandler}>
              <h1 className="addProductHeader">Update User Role</h1>
              <FormControl>
                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="name">User Name:</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="User Name"
                    className="name__input"
                    id="name"
                    name="name"
                  />
                </InputGroup>
                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="email">User Email:</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="User Email"
                    className="name__input"
                    id="email"
                    name="email"
                  />
                </InputGroup>

                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="role">Select Role:</FormLabel>
                  <Select
                    placeholder="Select option"
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </Select>
                </InputGroup>

                <InputGroup className="form__item">
                  <Button type="submit" className="addProduct__btn">
                    Update Role
                  </Button>
                </InputGroup>
              </FormControl>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateUsers;
