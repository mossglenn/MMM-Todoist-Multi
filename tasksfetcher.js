/* MagicMirror²
 * Node Helper: MMM-Todoist-Multi - TasksFetcher
 *
 * By Amos Glenn https://github.com/FutureYamask
 * MIT Licensed.
 */
const NodeHelper = require("node_helper");
const Log = require("logger");
const fetch = require("node-fetch");
const { URLSearchParams } = require("url");
/**
 *
 * @param {string} url The url of the Todoist API to use when fetching
 * @param {number} reloadInterval Time in ms to wait until fetching tasks again
 * @param {string} accessToken  API token from the Todoist Web app, at Todoist Settings -> Integrations -> API token
 * @param {string[]} resourceTypes Array of strings indicating which Todoist resource types to fetch
 * @class
 *
 **/
const TasksFetcher = function (
  url,
  accessToken,
  resourceTypes,
  reloadInterval
) {
  let reloadTimer = null;
  let tasks = {};

  let fetchFailedCallback = function () {};
  let tasksReceivedCallback = function () {};

  /**
   * Initiates tasks fetch.
   **/
  const fetchTasks = () => {
    clearTimeout(reloadTimer);
    reloadTimer = null;
    fetcher = null;

    const fetchParams = new URLSearchParams({
      sync_token: "*",
      resource_types: resourceTypes
    });
    const fetchOptions = {
      method: "POST",
      body: fetchParams,
      cache: "no-cache",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + accessToken
      }
    };
    //console.log(url);
    //console.log(fetchOptions);

    fetch(url, fetchOptions)
      .then(NodeHelper.checkFetchStatus)
      .then((response) => response.json())
      .then((json) => {
        //Log.info("received tasks on following line...");
        //Log.info(json);
        tasks = json;
        this.broadcastTasks();
        scheduleTimer();
      })
      .catch((err) => {
        Log.info("error when fetching tasks...");
        Log.info(err);
        fetchFailedCallback(this, err);
        scheduleTimer();
      });
  };

  /**
   *  Set the timer for the next fetch
   **/
  const scheduleTimer = function () {
    clearTimeout(reloadTimer);
    reloadTimer = setTimeout(function () {
      fetchTasks();
    }, reloadInterval);
  };

  /**
   * Initiate fetchTasks()
   */
  this.startFetch = function () {
    fetchTasks();
  };

  /**
   *  Broadcast tasks from this fetchTasks
   **/
  this.broadcastTasks = function () {
    Log.info("TaskFetcher is broadcasting.");
    tasksReceivedCallback(this);
  };

  /**
   * Returns tasks collected by this fetcher
   *
   * @returns {object} The tasks collected by this fetcher
   */
  this.tasks = function () {
    return tasks;
  };

  /**
   * Returns the accessToken used for this task fetcher
   *
   * @returns {string} the accessToken from this task fetcher
   */
  this.accessToken = function () {
    return accessToken;
  };

  /**
   * Set the success callback
   **/
  this.onReceive = function (callback) {
    tasksReceivedCallback = callback;
  };

  /**
   * Set the error callback
   **/
  this.onError = function (callback) {
    fetchFailedCallback = callback;
  };
};

module.exports = TasksFetcher;
