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
        client_id: "e823af2ff3250e3b966f",
        client_secret: "b5c31b06902b7b02c5fb9fd10c76adc21bb7e22f",
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
