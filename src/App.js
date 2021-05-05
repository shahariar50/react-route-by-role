import axios from "axios";
import UserContext, { UserProvider } from "context/UserContext";
import NotFound from "pages/NotFound";
import React, { lazy, Suspense, useContext } from "react";
import { Switch, Route, Redirect } from "react-router";
import { Link } from "react-router-dom";

function PrivateRoute({ children, access, ...rest }) {
  const { user } = useContext(UserContext);

  return (
    <Route {...rest}>
      {access.includes(user.userType) ? children : <Redirect to="/404" />}
    </Route>
  );
}

function App() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        token: localStorage.getItem("token"),
      })
      .then((res) => setUser(res.data));
  }, []);

  const routes = [
    {
      path: "/",
      Component: lazy(() => import("pages/HomePage.js")),
      exact: true,
      access: null,
    },
    {
      path: "/login",
      Component: lazy(() => import("pages/LoginPage.js")),
      exact: true,
      access: null,
    },
    {
      path: "/admin-panel",
      Component: lazy(() => import("pages/AdminPage.js")),
      exact: true,
      access: ["admin"],
    },
    {
      path: "/user-panel",
      Component: lazy(() => import("pages/UserPage.js")),
      exact: true,
      access: ["user"],
    },
  ];

  const publicRoutes = routes.filter((route) => !route.access);
  const privateRoutes = routes.filter((route) => route.access);

  return (
    <UserProvider value={{ user, setUser }}>
      <div className="App">
        {user?.userName && <h2>Hello {user.userName}</h2>}
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin-panel">Admin Page</Link>
          </li>
          <li>
            <Link to="/user-panel">User Page</Link>
          </li>
          {!user?.userType ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <li
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
                return <Redirect to="/" />;
              }}
            >
              <Link to="#">Logout</Link>
            </li>
          )}
        </ul>
        {/* <ul>
          {user.type && (
            <li>
              <Link to="/">Home</Link>
            </li>
          )}
          {user.type === "admin" && (
            <li>
              <Link to="/admin-panel">Admin Page</Link>
            </li>
          )}
          {user.type === "user" && (
            <li>
              <Link to="/user-panel">User Page</Link>
            </li>
          )}
        </ul> */}
        <Switch>
          {publicRoutes.map(({ path, Component, exact }) => (
            <Route exact={exact} path={path} key={path}>
              <Suspense fallback={null}>
                <Component />
              </Suspense>
            </Route>
          ))}
          {user?.userType &&
            privateRoutes.map(({ path, Component, exact, access }) => (
              <PrivateRoute
                exact={exact}
                path={path}
                key={path}
                access={access}
              >
                <Suspense fallback={null}>
                  <Component />
                </Suspense>
              </PrivateRoute>
            ))}
          <Route path="/404">
            <NotFound />
          </Route>
          <Redirect to="/404" />
        </Switch>
      </div>
    </UserProvider>
  );
}

export default App;
