const config = require("config");

const getToken = {
  method: "GET",
  path: "/user/github-signin/callback",
  handler: async (request, h) => {
    const { query } = request;
    const { code } = query;
    let returnVal = { name: "runbo" };

    if (!code) {
      return { success: false, message: "Error: no code" };
    }

    const axios = require("axios");
    // POST
    await axios
      .post("https://github.com/login/oauth/access_token", {
        client_id: config.get("client_id"),
        client_secret: config.get("client_secret"),
        code: code
      })
      .then(function(response) {
        const { data } = response;
        returnVal = data;
      })
      .catch(function(error) {
        console.log(error);
      });

    return returnVal;
  }
};

module.exports = [getToken];
