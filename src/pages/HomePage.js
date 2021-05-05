import UserContext from "context/UserContext";
import React, { useContext } from "react";
import { Redirect } from "react-router";

const HomePage = () => {
  const { user } = useContext(UserContext);

  if (!user?.userType) {
    return <Redirect to="/login" />;
  }

  return (
    <ul>
      <li>Both View</li>
      {user?.userType === "admin" && <li>Admin View</li>}
      <li>User View</li>
    </ul>
  );
};

export default HomePage;
