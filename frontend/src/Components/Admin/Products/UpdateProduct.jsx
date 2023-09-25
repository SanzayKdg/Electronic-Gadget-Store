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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  getSingleProductAsync,
  updateProductAsync,
} from "../../../features/Products/products";
import { validateProductdata } from "../../../Errors/error";
const UpdateProduct = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, success, error, product } = useSelector(
    (state) => state.product
  );
  const [updatedProduct, setUpdatedProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getSingleProductAsync(id));
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      const previewImage = product.images?.map((item) => item.url);
      setProductName(product.name !== undefined ? product.name : "");
      setDescription(
        product.description !== undefined ? product.description : ""
      );
      setPrice(product.price !== undefined ? product.price : "");
      setStock(product.stock !== undefined ? product.stock : "");
      setCategory(product.category !== undefined ? product.category : "");
      setImagesPreview(previewImage !== undefined ? previewImage : []);
    }
  }, [product]);
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
  const updateProductHandler = (e) => {
    e.preventDefault();

    // Form Validation handler
    const validationErrors = validateProductdata(
      productName,
      description,
      Number(price),
      Number(stock),
      category,
      imagesPreview
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const productData = new FormData();

    productData.set("name", productName);
    productData.set("price", price);
    productData.set("description", description);
    productData.set("category", category);
    productData.set("stock", stock);

    images.forEach((image) => {
      productData.append("images", image);
    });

    setUpdatedProduct(true);
    dispatch(updateProductAsync({ productId: id, productData }));
  };

  // useEffect
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (success && updatedProduct === true) {
      navigate("/admin/products");
      alert.success("Product Updated Successfully");
      setUpdatedProduct(false);
    }
  }, [error, alert, success, updatedProduct]);

  return (
    <div className="addProductsContainer">
      {loading ? (
        <Loader />
      ) : (
        <>
          <AdminSidebar />

          <div className="productForm">
            <form className="addProductForm" onSubmit={updateProductHandler}>
              <h1 className="addProductHeader">Update Product</h1>
              <FormControl>
                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="productName">
                    Product Name: <span className="required">*</span>
                  </FormLabel>
                  <Input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Product Name"
                    className="name__input"
                    id="productName"
                    name="productName"
                  />
                  {errors.productName && (
                    <p className="span_text">{errors.productName}</p>
                  )}
                </InputGroup>
                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="productPrice">
                    Product Price: <span className="required">*</span>
                  </FormLabel>
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
                  {errors.price && <p className="span_text">{errors.price}</p>}
                </InputGroup>

                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="productDesc">
                    Product Description: <span className="required">*</span>
                  </FormLabel>
                  <Textarea
                    placeholder="Product Description"
                    id="productDesc"
                    name="productDesc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <p className="span_text">{errors.description}</p>
                  )}
                </InputGroup>
                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="productCategory">
                    Select Category: <span className="required">*</span>
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
                  {errors.category && (
                    <p className="span_text">{errors.category}</p>
                  )}
                </InputGroup>

                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="productStock">
                    Product Stock: <span className="required">*</span>
                  </FormLabel>
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
                  {errors.stock && <p className="span_text">{errors.stock}</p>}
                </InputGroup>

                <InputGroup className="form__item" size={"md"}>
                  <FormLabel htmlFor="file">
                    Product Image: <span className="required">*</span>
                  </FormLabel>
                  <Input
                    type="file"
                    className="file__input"
                    id="file"
                    name="file"
                    multiple
                    onChange={productImageChange}
                  />
                  {errors.imagesPreview && (
                    <p className="span_text">{errors.imagesPreview}</p>
                  )}
                </InputGroup>

                <div id="productImagePreview">
                  {imagesPreview?.map((image, index) => (
                    <img src={image} key={index} alt="Product Image" />
                  ))}
                </div>

                <InputGroup className="form__item">
                  <Button type="submit" className="addProduct__btn">
                    Update Product
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

export default UpdateProduct;
