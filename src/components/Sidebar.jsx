import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaListAlt, FaShoppingBag, FaSignOutAlt, FaBars } from "react-icons/fa";
import logo from "../assets/logo2.png";

const Sidebar = ({ setToken }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <button
        className="btn btn-outline-secondary d-md-none m-2"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <FaBars />
      </button>

      <div
        className={`d-flex flex-column text-white p-3 position-fixed h-100 ${
          isCollapsed ? "d-none d-md-flex" : ""
        }`}
        style={{ width: "250px",backgroundColor:"lightslategrey" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to={'/'} className="d-flex align-items-center text-white text-decoration-none">
            <img src={logo} alt="Grill & Chill Logo" className="w-25 me-2" />
            <h1 className="fs-4 fw-bold m-0">
              Chill <span className="text-warning">Grill</span>
            </h1>
          </Link>
        </div>

        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-2">
            <Link to="/add" className="nav-link text-white d-flex align-items-center">
              <FaPlusCircle className="me-2" /> Add Product
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/list" className="nav-link text-white d-flex align-items-center">
              <FaListAlt className="me-2" /> List Products
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/orders" className="nav-link text-white d-flex align-items-center">
              <FaShoppingBag className="me-2" /> Orders
            </Link>
          </li>
          <li className="nav-item mt-auto">
            <Link to="/login" onClick={() => setToken("")} className="nav-link text-white d-flex align-items-center">
              <FaSignOutAlt className="me-2" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar; 