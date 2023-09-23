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
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../../Layout/Loader/Loader";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  deleteProductAsync,
  getAllProductsAsync,
} from "../../../features/Products/products";

const AllProducts = () => {
  const [deletedProduct, setDeletedProduct] = useState(false);

  const {
    loading,
    products,
    error,
    success: deleteSuccess,
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
    dispatch(getAllProductsAsync());
  }, [alert, error, dispatch, deleteSuccess, deletedProduct]);

  return (
    <div className="productListContainer">
      {loading ? (
        <Loader />
      ) : (
        <>
          <AdminSidebar />
          <div className="productListTable">
            <h1 className="productListHeader">All Products</h1>
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
              </TableContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
