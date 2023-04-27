"use strict";

/* Magic Mirror
 * Module: MMM-Todoist
 *
 * By Chris Brooker
 *
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const fetch = require("node-fetch");
const { URLSearchParams } = require("url");

module.exports = NodeHelper.create({
  start: function () {
    console.log("Starting node helper for: " + this.name);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "ADD_TODOIST_ACCOUNT") {
      //add a function to create a function that collects tasks from a given account
    }

    if (notification === "FETCH_TODOIST") {
      this.fetchTodoistData(
        payload.apiBase,
        payload.apiVersion,
        payload.todoistEndpoint,
        payload.accessToken,
        payload.todoistResourceType
      );
    }
  },

  /* fetch the requested data from Todoist API and send to module frontend for processing */
  fetchTodoistData: async function (
    apiBase,
    apiVersion,
    apiEndpoint,
    accessCode,
    resourceTypes
  ) {
    let todoistUrl = apiBase + "/" + apiVersion + "/" + apiEndpoint + "/";
    const fetchParams = new URLSearchParams({
      sync_token: "*",
      resource_types: resourceTypes
    });

    let fetchOptions = {
      method: "POST",
      body: fetchParams,
      cache: "no-cache",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + accessCode
      }
    };
    //TODO: add error handling (with FETCH_ERROR)
    //TODO: check to see if adding html to each task is important (since the synch function did, not sure why)
    // items.forEach((item) => {item.contentHtml = markdown.makeHtml(item.content);
    // previous sync function also added the access token to config, not sure why checking that is important
    fetch(todoistUrl, fetchOptions)
      .then((response) => response.json())
      .then((json) => {
        this.sendSocketNotification("TASKS", json);
      });
  }
});
