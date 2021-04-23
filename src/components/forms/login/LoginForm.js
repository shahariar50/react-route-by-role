import UserContext from "context/UserContext";
import React, { useContext } from "react";

const LoginForm = () => {
  const user = useContext(UserContext);
  const [errors, setErrors] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    const userType = e.target["userType"].value;

    if (userType === "admin" || userType === "user") {
      user.setUser({ type: userType });
    } else {
      setErrors("The user you are looking for has not found");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="userType" type="text" />
      <button type="submit" style={{ marginLeft: ".5rem" }}>
        Login
      </button>
      {errors && <p>{errors}</p>}
    </form>
  );
};

export default LoginForm;
