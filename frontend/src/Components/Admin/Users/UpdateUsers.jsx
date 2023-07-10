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
import { clearErrors, clearMessage } from "../../../Redux/Slices/updateUser";
import { updateUser } from "../../../Redux/Actions/admin";
import Loader from "../../Layout/Loader/Loader";

const UpdateUsers = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, success, error } = useSelector((state) => state.updateUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const updateUserHandler = (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.set("name", name);
    userData.set("email", email);
    userData.set("role", role);
    dispatch(updateUser(id, userData));
    console.log(id, userData);
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      alert.error(error);
    }
    if (success) {
      dispatch(clearMessage());
      alert.success("User Role Updated Successfully");
      navigate("/admin/users");
    }
  }, [error, success, dispatch, alert, navigate]);

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
