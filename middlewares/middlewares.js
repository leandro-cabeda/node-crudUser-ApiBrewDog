const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

module.exports = (app) => {
  app.use(bodyParser.json());

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(
    session({
      secret: "leo23#$%mhdn%",
      cookie: {
        maxAge: 7200000,
      },
      resave: false,
      saveUninitialized: true,
    })
  );
  
};
