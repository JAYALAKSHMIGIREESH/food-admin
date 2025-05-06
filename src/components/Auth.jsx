import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Use hardcoded backend URL for now (replace with your actual backend API URL)
const backendUrl = "http://localhost:3000"; // <-- Replace with your real backend URL if needed

const Auth = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message || "Invalid Login Details!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center position-relative"
      style={{ width: "100vw", overflow: "hidden" }}
    >
      {/* Background Image */}
      <div
        className="position-absolute top-0 start-0"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage:
            "url('https://img.freepik.com/free-vector/background-with-happy-chef-with-steak-his-hand_1308-42794.jpg?t=st=1739960302~exp=1739963902~hmac=bf8fdc63991112167c215048b8a72ad5107c9475f640a5c3b6154c7c7609ebf2&w=826')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      ></div>

      {/* Login Card */}
      <div
        className="card shadow p-4 w-100"
        style={{ maxWidth: "500px", zIndex: 10 }}
      >
        <h5
          className="text-center mb-4 fw-semibold"
          style={{ color: "#fb923c" }}
        >
          Admin Panel
        </h5>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="form-control"
              required
            />
          </div>

          <div className="d-grid mt-3">
            <button
              className="btn text-white"
              style={{
                backgroundColor: "#fb923c",
                border: "none",
              }}
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Auth;
