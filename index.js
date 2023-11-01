const express = require("express");
const session = require("express-session");
const passport = require("passport");
const routes = require("./routes/userRoutes");
const initializePassport = require("./passport-config");

const app = express();

initializePassport(); // Call the function to initialize Passport

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "b753086728de3a924ba37a4f3ab1535c0219ab4df976b88c2fd39db2e0f3477e",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
