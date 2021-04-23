import LoginForm from "components/forms/login/LoginForm";
import UserContext from "context/UserContext";
import { useContext } from "react";
import { Redirect } from "react-router";

const LoginPage = () => {
  const { user } = useContext(UserContext);

  if (user.type) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h3>Login</h3>
      <LoginForm />
      <h4>Login Credential</h4>
      <ul>
        <li>
          <strong>Admin: </strong>admin
        </li>
        <li>
          <strong>User: </strong>user
        </li>
      </ul>
    </div>
  );
};

export default LoginPage;
