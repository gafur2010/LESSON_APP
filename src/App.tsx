import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Cabinet from "./Cabinet/Cabinet";
import Posts from "./Cabinet/Posts";
import Register from "./Register";
import Login from "./Login";

const App = () => {
  return (
    <div>
      <div
        style={{ height: "80px" }}
        className="bg-dark p-2 d-flex justify-content-between align-items-center"
      >
        <Link style={{ fontSize: "35px" }} className="text-white m-2" to={"/"}>
          Logo
        </Link>

        <div className="d-flex ms-auto">
          <Link
            style={{
              width: "90px",
              height: "45px",
              marginLeft: "10px",
              padding: "10.5px",
            }}
            className="btn btn-primary m-3"
            to={"/about"}
          >
            About
          </Link>

          <Link
            style={{
              width: "90px",
              height: "45px",
              marginLeft: "10px",
              padding: "10.5px",
            }}
            className="btn btn-success m-3"
            to={"/cabinet"}
          >
            Cabinet
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cabinet/" element={<Cabinet />}>
          <Route path="/cabinet/posts/:id" element={<Posts userId={1} />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
