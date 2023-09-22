import React, { Fragment, useEffect, useState } from "react";
import "./AddProducts.css";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  Select,
} from "@chakra-ui/react";
import AdminSidebar from "../../Layout/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { laptop, smartPhones } from "../../../Data/ProductCategories";
import { useAlert } from "react-alert";
import Loader from "../../Layout/Loader/Loader";
import { createProductAsync } from "../../../features/Products/products";

const AddProducts = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [authenticated, setAuthenticated] = useState(isAuthenticated);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (isAuth) {
      setAuthenticated(JSON.parse(isAuth));
    }
  }, []);

  const { loading, error, success } = useSelector((state) => state.product);
  const alert = useAlert();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  // clear form function
  const clearForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setStock("");
    setCategory("");
    setImagesPreview([]);
    setImages([]);
  };
  // image preview and converting to url function
  const productImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((item) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(item);
    });
  };

  // adding product function
  const addProductHandler = (e) => {
    e.preventDefault();
    const productData = new FormData();

    productData.set("name", name);
    productData.set("price", price);
    productData.set("description", description);
    productData.set("category", category);
    productData.set("stock", stock);

    images.forEach((image) => {
      productData.append("images", image);
    });

    dispatch(createProductAsync(productData));
    clearForm();
  };

  // useEffect
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (success) {
      alert.success("Product Added Successfully");
    }
  }, [error, alert, success]);

  return (
    <div className="addProductsContainer">
      {loading ? (
        <Loader />
      ) : (
        <>
          <AdminSidebar />

          <div className="productForm">
            <form className="addProductForm" onSubmit={addProductHandler}>
              <h1 className="addProductHeader">Add Product</h1>
              <FormControl>
                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="productName">Product Name:</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    className="name__input"
                    id="productName"
                    name="productName"
                  />
                </InputGroup>
                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="productPrice">Product Price:</FormLabel>
                  <Input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Product Price"
                    className="price__input"
                    id="productPrice"
                    name="productPrice"
                    maxLength={6}
                  />
                </InputGroup>

                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="productDesc">
                    Product Description:
                  </FormLabel>
                  <Textarea
                    placeholder="Product Description"
                    id="productDesc"
                    name="productDesc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </InputGroup>
                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="productCategory">
                    Select Category:
                  </FormLabel>
                  <Select
                    placeholder="Select option"
                    id="productCategory"
                    name="productCategory"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <optgroup label="SmartPhones">
                      {smartPhones.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Laptops">
                      {laptop.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </optgroup>
                  </Select>
                </InputGroup>

                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="productStock">Product Stock:</FormLabel>
                  <Input
                    type="text"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Product Stock"
                    className="price__input"
                    id="productStock"
                    name="productStock"
                    maxLength={6}
                  />
                </InputGroup>

                <InputGroup className="form__item" size={"md"}>
                  <FormLabel htmlFor="file">Product Image:</FormLabel>
                  <Input
                    type="file"
                    className="file__input"
                    id="file"
                    name="file"
                    multiple
                    onChange={productImageChange}
                  />
                </InputGroup>

                <div id="productImagePreview">
                  {imagesPreview.map((image, index) => (
                    <img src={image} key={index} alt="Product Image" />
                  ))}
                </div>

                <InputGroup className="form__item">
                  <Button type="submit" className="addProduct__btn">
                    Add Product
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

export default AddProducts;
