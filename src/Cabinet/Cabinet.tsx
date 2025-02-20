import React, { useEffect, useState } from "react";
import { apiCall } from "../apiCall";
import Posts from "./Posts";

interface User {
  id: number;
  name: string;
}

const Cabinet = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    apiCall("/users", "GET", null).then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-light p-3" style={{ height: "100vh" }}>
          <h4>Users</h4>
          <ul className="list-group">
            {users.map((user) => (
              <li
                key={user.id}
                className={`list-group-item ${
                  selectedUserId === user.id ? "active" : ""
                }`}
                onClick={() => setSelectedUserId(user.id)}
                style={{ cursor: "pointer" }}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-9 p-3">
          {selectedUserId ? (
            <Posts userId={selectedUserId} />
          ) : (
            <h5>Choose users</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cabinet;
