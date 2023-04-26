"use strict";

const { async } = require("node-ical");
/* Magic Mirror
 * Module: MMM-Todoist
 *
 * By Chris Brooker
 *
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const request = require("request");
const showdown = require("showdown");

const markdown = new showdown.Converter();



module.exports = NodeHelper.create({
  start: function () {
    console.log("Starting node helper for: " + this.name);
  },

  socketNotificationReceived: function (notification, payload) {
    //TODO: set up additional notification for creating a function to fetch different Todoist accounts
    if (notification === "ADD_TODOIST_ACCOUNT") {
      
    }

    elseif (notification === "FETCH_TODOIST") {
      this.config = payload;
      this.fetchTodos();
    }
  },

  fetchTodoistData: function (apiBase, apiVersion, apiEndpoint, accessCode, resourceTypes) {
    let todoistUrl = apiBase + "/" + apiVersion + "/" + apiEndpoint + "/";

    let fetchOptions = {
      method: "POST",
      body: JSON.stringify({
        sync_token: "*",
        resource_types: resourceTypes
      }),
      cache: "no-cache",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + accessCode
      }
    }


    let response = await fetch(todoistUrl, fetchOptions);

    if (!response.ok) {
      console.log("fetch error: " + response.status);
    }
    return 

  },

  fetchTodos: function () {
    var self = this;
    //request.debug = true;
    var acessCode = self.config.accessToken;
    request(
      {
        url:
          self.config.apiBase +
          "/" +
          self.config.apiVersion +
          "/" +
          self.config.todoistEndpoint +
          "/",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "cache-control": "no-cache",
          Authorization: "Bearer " + acessCode
        },
        form: {
          sync_token: "*",
          resource_types: self.config.todoistResourceType
        }
      },
      function (error, response, body) {
        if (error) {
          self.sendSocketNotification("FETCH_ERROR", {
            error: error
          });
          return console.error(" ERROR - MMM-Todoist: " + error);
        }
        if (self.config.debug) {
          console.log(body);
        }
        if (response.statusCode === 200) {
          var taskJson = JSON.parse(body);
          taskJson.items.forEach((item) => {
            item.contentHtml = markdown.makeHtml(item.content);
          });

          taskJson.accessToken = acessCode;
          self.sendSocketNotification("TASKS", taskJson);
        } else {
          console.log("Todoist api request status=" + response.statusCode);
        }
      }
    );
  }
});
