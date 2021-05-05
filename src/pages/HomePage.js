import UserContext from "context/UserContext";
import React, { useContext } from "react";
import { Redirect } from "react-router";

const HomePage = () => {
  const { user } = useContext(UserContext);

  if (!user.type) {
    return <Redirect to="/login" />;
  }

  return (
    <ul>
      <li>Both View</li>
      {user.type === "admin" && <li>Admin View</li>}
      {user.type === "user" && <li>User View</li>}
    </ul>
  );
};

export default HomePage;
