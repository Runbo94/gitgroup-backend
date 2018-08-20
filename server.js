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

db(server);

// Add the route
server.route(routes);

// Start the server
const init = async () => {
  await server.register({
    plugin: require("good"),
    options
  });

  await server.start();
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
