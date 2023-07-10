import React, { Fragment, useEffect } from "react";
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
import { allProducts, deleteProduct } from "../../../Redux/Actions/product";
import { clearErrors } from "../../../Redux/Slices/getAllProducts";
import { clearMessage } from "../../../Redux/Slices/deleteProductSlices";
import Loader from "../../Layout/Loader/Loader";
import { Link, Navigate, useParams } from "react-router-dom";
const AllProducts = () => {
  const { loading, products, error } = useSelector(
    (state) => state.allProducts
  );
  const { success, error: deleteError } = useSelector(
    (state) => state.deleteProduct
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  const deleteHandler = (productId) => {
    console.log("My product id is", productId);
    dispatch(deleteProduct(productId));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product Deleted Successfully");
      dispatch(clearMessage());
    }
    dispatch(allProducts());
  }, [alert, error, dispatch, success]);

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
                      <Th className="productAction">Product Id</Th>
                      <Th className="productAction">Product Name</Th>
                      <Th className="productAction">Price</Th>
                      <Th className="productAction">Stock</Th>
                      <Th className="productAction">Actions</Th>
                    </Tr>
                  </Thead>
                  {products &&
                    products.map((item, index) => (
                      <Fragment key={index}>
                        <Tbody>
                          <Tr>
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
                              <Link to= {`/admin/product/${item._id}`} className="productBtn">
                                <EditIcon className="productIcon" />
                              </Link>
                              <Button
                                onClick={() => deleteHandler(item._id)}
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
