import React, { useEffect } from "react";
import "./Dashboard.css";
import AdminSidebar from "../../Layout/AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader";
import { useAlert } from "react-alert";
import { getAllProductsAsync } from "../../../Redux/Slices/Products/productSlice";
import { getAllUserAsync } from "../../../Redux/Slices/Users/userSlice";
import { getAllOrdersAsync } from "../../../Redux/Slices/Orders/orderSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
const Dashboard = () => {
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );
  const { users } = useSelector((state) => state.user);
  let { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    dispatch(getAllUserAsync());
    dispatch(getAllProductsAsync());
    dispatch(getAllOrdersAsync());
  }, [dispatch, error, alert]);
  let outOfStock = 0;
  products.products &&
    products.products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });
  let totalAmt = 0;
  orders.orders &&
    orders.orders.forEach((item) => {
      totalAmt += item.totalPrice;
    });
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmt.toFixed(2)],
      },
    ],
  };

  let productLength = 0;

  productLength = setTimeout(() => {
    return products.length;
  }, 2000);

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],

        data: [outOfStock, productLength - outOfStock],
      },
    ],
  };

  return (
    <div className="adminDashboard">
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAuthenticated && (
            <>
              <AdminSidebar />
              <div className="dashboard">
                <div className="dashboard__top">
                  <h1 className="dashboard__header">Dashboard</h1>
                </div>

                <div className="dashboard__mid">
                  <div className="dashboard__totalAmt">
                    <p>Total Amount</p>
                    <p>Nrs. {totalAmt}</p>
                  </div>

                  <div className="dashboardSummaryBox2">
                    <Link to="/admin/products">
                      <p className="summaryCircle">Product</p>
                      <p className="summaryCircle">
                        {products.products && products.products.length}
                      </p>
                    </Link>
                    <Link to="/admin/orders">
                      <p className="summaryCircle">Orders</p>
                      <p className="summaryCircle">
                        {orders.orders && orders.orders.length}
                      </p>
                    </Link>
                    <Link to="/admin/users">
                      <p className="summaryCircle">Users</p>
                      <p className="summaryCircle">
                        {users.users && users.users.length}
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="dashboard__bottom">
                  <div className="lineChart">
                    <Line data={lineState} />
                  </div>

                  <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
