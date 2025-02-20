import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { apiCall } from "./apiCall";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const { name, password, confirmPassword } = user;

    if (!name || !password || !confirmPassword) {
      toast.error("Please fill all inputs!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords didn't match!");
      return;
    }

    toast.success("Your account was successfully created!");
    console.log(user);

    apiCall("/users", "POST", { name, password }).then(() => {
      window.location.href = "http://localhost:5173/login";
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4" style={{ width: "25rem" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type Name..."
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Type password ..."
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password ..."
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleRegister} className="btn btn-primary w-100">
          Register
        </button>
        <p className="text-center mt-3">
          Already have been accaunt?{" "}
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
