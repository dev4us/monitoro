"use strict";

const path = require("path");
const fs = require("fs");
const axios = require("axios");

const monitoroConfig = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "monitoroConfig.json"), "utf-8")
);

const sendMessage = (reqLevel, reqContents) => {
  axios
    .post("http://localhost:4000/graphql", {
      query: `
    mutation SendMessage($contents:String!, $apiKey:String!) {
      SendMessage(level:WARNING, contents:$contents, apiKey:$apiKey) { 
        ok
        error
      }
    }
  `,
      variables: {
        contents: reqContents,
        apiKey: monitoroConfig.apiKey
      }
    })
    .then(res => console.log(res))
    .catch(err => {
      console.log(err);
      console.log(err.response.data.errors);
    });
};

module.exports = { sendMessage: sendMessage };
