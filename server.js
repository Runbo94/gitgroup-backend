const config = require("config");
const Hapi = require("hapi");
const routes = require("./routes");
const db = require("./startup/db");
const { options } = require("./startup/good");

// Create a server with a host and port
const server = Hapi.server({
  host: "localhost",
  port: 8000,
  routes: {
    cors: {
      origin: ["*"],
      additionalExposedHeaders: ["x-auth-token"]
    }
  }
});

// Start the server
const init = async () => {
  await server.register({
    plugin: require("good"),
    options
  });
  // bring your own validation function
  const validate = async function(decoded, request) {
    // do your checks to see if the person is valid
    if (!decoded._id) {
      return { isValid: false };
    } else {
      return { isValid: true };
    }
  };

  await server.register(require("hapi-auth-jwt2"));
  server.auth.strategy("jwt", "jwt", {
    key: config.get("jwt.private_key"),
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] }
  });

  // Add the route
  server.route(routes);

  await server.start();
  db(server);
  server.log("info", config.get("name"));
  server.log("info", "github client id: " + config.get("github.client_id"));
  server.log(
    "info",
    "github client secret: " + config.get("github.client_secret")
  );
  server.log("info", `Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  server.log("error", err);
  process.exit(1);
});

init();
