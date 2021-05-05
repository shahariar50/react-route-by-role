import { rest } from "msw";

export const handlers = [
  rest.post("https://jsonplaceholder.typicode.com/posts", (req, res, ctx) => {
    // Persist user's authentication in the session

    if (req.body.user === "admin") {
      return res(
        ctx.json({
          token: "asdasdasdadmin",
        })
      );
    }
    if (req.body.user === "user") {
      return res(
        ctx.json({
          token: "asdasdasduser",
        })
      );
    }
    // sessionStorage.setItem("is-authenticated", "true");
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: "User does not exist.",
      })
    );
  }),
  rest.post("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    const token = req.body.token;
    if (!token) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "User does not exist.",
        })
      );
    }
    if (token === "asdasdasdadmin") {
      return res(
        ctx.json({
          userName: "Jhon",
          userType: "admin",
        })
      );
    }
    if (token === "asdasdasduser") {
      return res(
        ctx.json({
          userName: "Doe",
          userType: "user",
        })
      );
    }
  }),
];
