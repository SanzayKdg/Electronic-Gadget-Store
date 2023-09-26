import React, { Fragment, useEffect, useState } from "react";
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
import "./AllProducts.css";
import AdminSidebar from "../../Layout/AdminSidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { Select } from "@chakra-ui/react";
import {
  deleteProductAsync,
  getAllProductsAsync,
} from "../../../features/Products/products";
import Pagination from "react-js-pagination";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
// Categories Lists
const smartPhonesCategories = [
  "Samsung",
  "Apple",
  "Xiaomi",
  "One Plus",
  "Oppo",
  "Vivo",
];
const laptopCategories = [
  "Asus Laptops",
  "Acer Laptops",
  "Dell Laptops",
  "HP Laptops",
  "Samsung Laptops",
  "Apple Laptops",
  "Xiaomi Laptops",
];

const AllProducts = () => {
  const [deletedProduct, setDeletedProduct] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [price, setPrice] = useState([0, 300000]);

  const setPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e) => {
    setPrice(e);
  };

  const {
    products,
    error,
    success: deleteSuccess,
    productCount,
    resultPerPage,
  } = useSelector((state) => state.product);

  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (deleteSuccess === true && deletedProduct === true) {
      alert.success("Product Deleted successfully");
      setDeletedProduct(false);
    }

    dispatch(getAllProductsAsync({ keyword, currentPage, price, category }));
  }, [
    alert,
    error,
    dispatch,
    deleteSuccess,
    deletedProduct,
    keyword,
    currentPage,
    price,
    category,
  ]);

  return (
    <div className="productListContainer">
      <AdminSidebar />
      <div className="productListTable">
        <h1 className="productListHeader">All Products</h1>

        <div className="search__filterContainer">
          <div className="searchContainer">
            <div className="searchBox">
              <input
                type="text"
                id="searchBar"
                className="searchInput"
                placeholder="Search By Product Name"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <SearchIcon className="searchIcon" />
            </div>
          </div>

          <div className="filter_container">
            <fieldset className="filterByPrice">
              <legend>Filter By Price</legend>
              <RangeSlider
                min={0}
                max={300000}
                step={1000}
                defaultValue={price}
                onChange={priceHandler}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <p className="slider__value">
                {price[0]} - {price[1]}
              </p>
            </fieldset>

            <fieldset className="filterByCategory">
              <legend className="filter_legend">Filter By Category</legend>
              <Select
                className="selectCats"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={""}>Select Category</option>
                <option disabled={true} value="option2">
                  SmartPhones
                </option>
                {smartPhonesCategories &&
                  smartPhonesCategories.map((categories, index) => (
                    <option key={index} value={categories}>
                      {categories}
                    </option>
                  ))}

                <option disabled={true} value="option2">
                  Laptops
                </option>
                {laptopCategories &&
                  laptopCategories.map((categories, index) => (
                    <option key={index} value={categories}>
                      {categories}
                    </option>
                  ))}
              </Select>
            </fieldset>
          </div>
        </div>
        <div className="productTable">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th className="productAction">S.No.</Th>
                  <Th className="productAction">Product Id</Th>
                  <Th className="productAction">Product Name</Th>
                  <Th className="productAction">Price</Th>
                  <Th className="productAction">Stock</Th>
                  <Th className="productAction">Actions</Th>
                </Tr>
              </Thead>
              {products &&
                products?.map((item, index) => (
                  <Fragment key={index}>
                    <Tbody>
                      <Tr>
                        <Td className="tableAction">{index + 1}</Td>
                        <Td className="tableAction">{item._id}</Td>
                        <Td className="tableAction">{item.name}</Td>
                        <Td className="tableAction">{item.price}</Td>
                        <Td
                          className={
                            item.stock > 0
                              ? "tableAction productGreen"
                              : "tableAction productRed"
                          }
                        >
                          {item.stock}
                        </Td>
                        <Td className="tableAction">
                          <Link
                            to={`/admin/product/${item._id}`}
                            className="productBtn"
                          >
                            <EditIcon className="productIcon" />
                          </Link>
                          <Button
                            onClick={async () => {
                              dispatch(deleteProductAsync(item._id));
                              await dispatch(getAllProductsAsync());
                              setDeletedProduct(true);
                            }}
                            className="productBtn"
                          >
                            <DeleteIcon className="productIcon" />
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Fragment>
                ))}
            </Table>
            {resultPerPage && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productCount}
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
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
