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
const Log = require("logger");
const TasksFetcher = require("./tasksfetcher.js");

module.exports = NodeHelper.create({
  start: function () {
    console.log("Starting node helper for: " + this.name);
    this.fetchers = [];
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "ADD_TODOIST_FETCHER") {
      //create a fetcher too collect Todoist tasks for a module and accessToken
      this.createTodoistFetcher(
        payload.url,
        payload.reloadInterval,
        payload.accessToken,
        payload.resourceTypes,
        payload.identifier
      );
    } /* else if (notification === "FETCH_TODOIST") {
      this.fetchTodoistData(
        payload.apiBase,
        payload.apiVersion,
        payload.todoistEndpoint,
        payload.accessToken,
        payload.todoistResourceType
      );
    } */
    if (notification === "FETCH_TASKS") {
      if (
        typeof this.fetchers[payload.identifier + payload.accessToken] ===
        "undefined"
      ) {
        Log.error(
          "Task fetching error. No fetcher exists for module: " +
            payload.identifier +
            " / accessToken: " +
            payload.accessToken
        );
        this.sendSocketNotification("TASK_ERROR", {
          error_type: "TASK_FETCHER_MISSING"
        });
        return;
      }
      this.fetchers[payload.identifier + payload.accessToken].startFetch();
    }
  },

  /**
   * Create a fetcher for a new combination of module is and Todoist Access Token
   * Otherwise use the existing fetcher
   *
   * @param {string} url The url of the Todoist API to use when fetching
   * @param {number} reloadInterval Time in ms to wait until fetching tasks again
   * @param {string} accessToken  API token from the Todoist Web app, at Todoist Settings -> Integrations -> API token
   * @param {string[]} resourceTypes Array of strings indicating which Todoist resource types to fetch
   * @param {string} identifier ID of the module
   *
   **/
  createTodoistFetcher: function (
    url,
    reloadInterval,
    accessToken,
    resourceTypes,
    identifier
  ) {
    let fetcher;
    if (typeof this.fetchers[identifier + accessToken] === "undefined") {
      Log.log(
        "Creating new taskFetcher for module: " +
          identifier +
          " and accessToken: " +
          accessToken
      );
      fetcher = new TasksFetcher(
        url,
        accessToken,
        resourceTypes,
        reloadInterval
      );

      fetcher.onReceive((fetcher) => {
        this.broadcastTasks(fetcher, identifier);
      });

      fetcher.onError((fetcher, error) => {
        Log.error(
          "Task fetcher error. Could not collect tasks: ",
          fetcher.accessCode,
          error
        );
        let error_type = NodeHelper.checkFetchError(error);
        this.sendSocketNotification("FETCH_ERROR", {
          id: identifier,
          error_type
        });
      });
      this.fetchers[identifier + accessToken] = fetcher;
    } else {
      Log.log(
        "Using existing task fetcher for module: " +
          identifier +
          " with accessToken: " +
          accessToken
      );

      fetcher = this.fetchers[identifier + accessToken];
      fetcher.broadcastTasks();
    }
    fetcher.startFetch();
  },

  broadcastTasks: function (fetcher, identifier) {
    this.sendSocketNotification("TODOIST_TASKS", {
      id: identifier,
      accessToken: fetcher.accessToken(),
      tasks: fetcher.tasks()
    });
  }
  /* 
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

    //TODO: check to see if adding html to each task is important (since the synch function did, not sure why)
    // items.forEach((item) => {item.contentHtml = markdown.makeHtml(item.content);
    // previous sync function also added the access token to config, not sure why checking that is important
    fetch(todoistUrl, fetchOptions)
      .then(this.checkStatus)
      .then((response) => response.json())
      .then((json) => {
        this.sendSocketNotification("TASKS", json);
      })
      .catch((err) =>
        this.sendSocketNotification("FETCH_ERROR", {
          error: "Error fetching Todoist data: " + err
        })
      );
  },
  checkStatus: function (response) {
    if (response.ok) {
      return response;
    } else {
      this.sendSocketNotification("FETCH_ERROR", {
        error: "ERROR! response status is '" + response.statusText + "'"
      });
    }
  } */
});
