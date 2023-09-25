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
import "./Reviews.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminSidebar from "../../Layout/AdminSidebar";
import { FormControl, FormLabel, InputGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../../Layout/Loader/Loader";
import { getAllReviewsAsync } from "../../../features/Products/products";

const Reviews = () => {
  const { loading, reviews, product, error } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [error, dispatch, alert]);

  const reviewHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviewsAsync(productId));
  };
  return (
    <div className="reviewListContainer">
      {loading ? (
        <Loader />
      ) : (
        <>
          <AdminSidebar />

          <div className="reviewListTable">
            <h1 className="reviewListHeader">All reviews</h1>
            {!reviews && reviews === undefined ? (
              <div className="adminReviewSearchBar">
                <form className="adminReview__form" onSubmit={reviewHandler}>
                  <FormControl className="adminReview__form1">
                    <InputGroup className="form__item" size="md">
                      <FormLabel htmlFor="reviewId">Product ID: </FormLabel>
                      <Input
                        type="text"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        placeholder="Enter Product Id"
                        className="reviewId__input"
                        id="reviewId"
                        name="reviewId"
                      />
                    </InputGroup>

                    <InputGroup className="form__item">
                      <Button type="submit" className="review__btn">
                        Search
                      </Button>
                    </InputGroup>
                  </FormControl>
                </form>
              </div>
            ) : (
              <>
                <div className="adminReviewSearchBar">
                  <form className="adminReview__form" onSubmit={reviewHandler}>
                    <FormControl className="adminReview__form1">
                      <InputGroup className="form__item" size="md">
                        <FormLabel htmlFor="reviewId">Product ID: </FormLabel>
                        <Input
                          type="text"
                          value={productId}
                          onChange={(e) => setProductId(e.target.value)}
                          placeholder="Enter Product Id"
                          className="reviewId__input"
                          id="reviewId"
                          name="reviewId"
                        />
                        {productId === "" && (
                          <p className="span_text">Product Id is required</p>
                        )}
                      </InputGroup>

                      <InputGroup className="form__item">
                        <Button type="submit" className="review__btn">
                          Search
                        </Button>
                      </InputGroup>
                    </FormControl>
                  </form>
                </div>

                <div className="reviewTable">
                  <TableContainer>
                    <Table variant="simple">
                      {reviews.length > 0 ? (
                        <Fragment>
                          <Thead>
                            <Tr>
                              <Th className="reviewAction">Review Id</Th>
                              <Th className="reviewAction">User Name</Th>
                              <Th className="reviewAction">Rating</Th>
                              <Th className="reviewAction">Comment</Th>
                              {/* <Th className="reviewAction">Actions</Th> */}
                            </Tr>
                          </Thead>

                          <Tbody>
                            {reviews.map((item, index) => (
                              <Fragment key={index}>
                                <Tr>
                                  <Td className="tableAction">{item._id}</Td>
                                  <Td className="tableAction">{item.name}</Td>
                                  <Td
                                    className={
                                      item.rating > 3
                                        ? "tableAction reviewGreen"
                                        : "tableAction reviewRed"
                                    }
                                  >
                                    {item.rating}
                                  </Td>
                                  <Td className="tableAction">
                                    {item.comment}
                                  </Td>
                                  {/* <Td className="tableAction">
                                    <Button className="reviewBtn">
                                      <DeleteIcon className="reviewIcon" />
                                    </Button>
                                  </Td> */}
                                </Tr>
                              </Fragment>
                            ))}
                          </Tbody>
                        </Fragment>
                      ) : (
                        <h1 className="noReviews">No reviews yet!</h1>
                      )}
                    </Table>
                  </TableContainer>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Reviews;

// 648d9a151f1405b8a7446e02
// 648d99bc1f1405b8a7446dea
// 648d9a151f1405b8a7446e02
