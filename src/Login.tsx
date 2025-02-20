import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { apiCall } from "./apiCall";

interface User {
  id: string;
  name: string;
  password: string;
}

const Register = () => {
  const [user, setUser] = useState({ name: "", password: "" });
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiCall("/users", "GET", "").then((res) => {
      setUsers(res.data);
    });
  }, []);

  function Login() {
    const oneUser = users.find((itm) => {
      return itm.name === user.name && itm.password === user.password;
    });

    if (oneUser) {
      localStorage.setItem("token", oneUser.id);
      toast.success("You successfully logged in!", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Invalid username or password", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4" style={{ width: "25rem" }}>
        <h2 className="text-center mb-4">Login</h2>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type Name..."
            name="name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Type password ..."
            name="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button onClick={Login} className="btn btn-primary w-100">
          Login
        </button>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
