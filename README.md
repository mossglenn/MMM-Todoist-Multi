# MMM-Todoist-Multi

This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). It can display Todoist tasks from multiple accounts in a single list and filter them several ways.

> [!CAUTION]
> This module should still be considered beta. Not everything has been fully tested and more advanced features may not work for you. Pull requests are welcome!

## Installation

1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/FutureYamask/MMM-Todoist-Multi.git`. A new folder will appear navigate into it.
2. Execute `npm install` to install the node dependencies.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file. The following is a short example of a basic configuration.

```javascript
modules: [
    {
        module: 'MMM-Todoist-Multi',
        position: 'top_right', // This can be any of the regions
        header: 'Task List', // This is optional
        config: {
            accessToken: 'accessToken-from-Todoist', //required
            projects: [166564794],
            labels: ['MagicMirror', 'Important'],
            filters: ['Assigned to me'], //at least one project, label, or filter is required
            displayOrder: ['countdown', 'content', 'project'], //at least one display column is required
            debug: true, //set debug to true for helpful information in the console
        },
    },
]
```

## Configuration options

**The following options can be included in your configuration file.**

---

### :jigsaw: `accessTokens`

An array of API Tokens for all accounts to look for tasks.

-   **Possible values:** `string`
-   **Default value:** none
-   **Example:** `accessToken: ['accessToken-from-Todoist'],`

> [!TIP]
> You can use the "API Token" found at [todoist Developer](https://app.todoist.com/app/settings/integrations/developer) in this setting.

---

### :jigsaw: `debug`

Add helpful logging and project information to the console.

-   **Possible values:** `boolean`
-   **Default value:** `false`
-   **Example:** `debug: true,` will display your project names and IDs in the browser's console as well as useful logging to [help with debugging](https://docs.magicmirror.builders/getting-started/installation.html#usage) problems.

_Note:_ This setting does not change the display of tasks.

---

### :jigsaw: `projects`

Array of projects to include in the display. Projects can be included by name or ID. Including a project will include all items in that project regardless of label or filter.

-   **Possible values:** `[integer or string]`
-   **Default value:** `[ ]`
-   **Example:** `projects: [166564794, 'Project'],`

_Note:_ The values for `projects`, `labels`, and `filters` are inclusive--any task matching one or more of these values will be displayed.

_See also:_ `debug` for finding project IDs in the console.

> [!TIP]
> You can also get project IDs using the Todoist website:
>
> 1. Go to Todoist (Log in if you aren't)
> 2. Click on a Project in the left menu
> 3. Your browser URL will change to something like `https://app.todoist.com/app/project/166564897`. Look in the url for `project/` followed by a number. In this example, the ID is 166564897.

---

### :jigsaw: `labels`

Array of label names you want to include in the display.

-   **Possible values:** ` [string]`
-   **Default value:** `[ ]`
-   **Example:** `labels: ['MagicMirror', 'Important', 'DoInTheMorning'],` will display all tasks from all projects that have one or more of these labels

_Note:_ The values for `projects`, `labels`, and `filters` are inclusive--any task matching one or more of these values will be displayed.

---

### :jigsaw: `filters`

> [!CAUTION]
> This setting does not work as expected in all cases.

Array of filers to include in the display. Including a filter will include all items in that filter.

-   **Possible values:** `[string]`
-   **Default value:** `[ ]`
-   **Example:** `filers: ['Assigned to me'],` will display all tasks assigned to the account `token` set.

_Note:_ The values for `projects`, `labels`, and `filters` are inclusive--any task matching one or more of these values will be displayed.

> [!TIP]  
> Be careful using filters when including more than one Todoist account. Todoist provides several [default filters](https://todoist.com/help/articles/introduction-to-filters-V98wIH) including "Assigned to me", "Priority 1", Priority 2", "Priority 3", Priority 4"

---

### :jigsaw: `displayOrder`

Array of columns to display for each task. Columns appear in whatever order set here.

-   **Possible values:**
    -   `content` - The text of the task.
    -   `duedate` - The due date of the task.
    -   `countdown` - The number of days until the task is due.
    -   `priority` - The priority of the task.
    -   `labels` - The text of the task.
    -   `assignee` - The user who is responsible for accomplishing the current task (shared projects only).
    -   `avatar` - The 35x35 pixels image of the user's avatar.
    -   `project` - The name of the project holding the task.
-   **Default value:** `['content', 'duedate', 'countdown', 'priority', 'labels', 'assignee', 'avatar', 'project']`
-   **Example:** `displayOrder: ['duedate', 'content']` will display tasks using two columns. The "duedate" column will be on the left and the "content" column on the right.

---

### :jigsaw: `priorityColors`

Set custom colors to associate with each priority from lowest to highest.

-   **Possible values:** `priority: hexcode`
-   **Default value:** `priorityColors: {1: '#333333', 2: '#246fe0', 3: '#eb8909', 4: '#d1453b'}`

_Note:_ 1 is the LOWEST priority; 4 is the HIGHEST or most urgent priority

> [!WARNING]
> If you include this setting, you **must include all four priorities** within the brackets!

---

### :jigsaw: `displayProjectAs`

Method to indicate project for each task.

-   **Possible values:**
    -   `name` - displays the name of the project only
    -   `color` - displays the color of the project only
    -   `both` - displays the name of the project surrounded by a border in the project color
-   **Default value:** `displayProjectAs: 'both',`

_Note:_ This setting has no effect if the `project` column is not included in the `displayOrder` setting.

---

### :jigsaw: `displayColumnHeadings`

Method to indicate the header of each column displayed

-   **Possible values:**
    - `text` - displays the name column
    - `icons` - displays an icon representing the information in the column
    - `none` - excludes any headers from displaying
-   **Default value:** `displayColumnHeadings: 'icons'`

---

### :jigsaw: `maximumEntries`

Maximum number of tasks to be shown.

-   **Possible values:** `int`
-   **Default value:** `10`
-   **Example:** `maximumEntries: 30,`

---

### :jigsaw: `interval`

How often the module should load new todos.

-   **Possible values:** `int` in `milliseconds`
-   **Default value:** `10*60*1000`
-   **Example:** `interval: 30*60*1000,` will check for task updates every 30 minutes

> [!IMPORTANT]
> Be careful, this is in ms, NOT seconds! So, too low a number will lock you out for repeated server attempts!

---

### :jigsaw: `fade`

Fade todos to black. (Gradient)

-   **Possible values:** `true` or `false`
-   **Default value:** `true`
-   **Default value:** `fade: false,`

---

### :jigsaw: `fadePoint`

How far down the list does fading start

-   **Possible values:** `0`-`1` (top - bottom)
-   **Default value:** `0.25`
-   **Example:** `fadePoint: 0.50,` will begin fading tasks halfway through the list

---

### :jigsaw: `fadeMinimumOpacity`

Opacity of the last item if fade is enabled.

-   **Possible values:** `0` - `1` (completely transparent - no fade)
-   **Default value:** `0.25` will cause the bottom task to be mostly transparent
-   **Example:** `fadeMinimumOpacity: 0.10,` will cause the bottom task to be almost completely transparent

---

### :jigsaw: `sortType`

This will determine the sorting method used when displaying your tasks.

-   **Possible values:**
    -   `'todoist'` - Sort based on the order in Todoist.
    -   `'priority'` - Sort based on the priority, in Descending order. (Highest priority first)
    -   `'dueDateAsc'` - Sort based on the Due Date of the Todo Ascending. (Oldest date first)
    -   `'dueDateDesc'` - Sort based on the Due Date of the Todo Descending. (Newest date first)
    -   `'dueDateDescPriority'` - Sort based on the Due Date of the Todo Descending and by priority high to low.
-   **Default value:** `'todoist'`
-   **Example:** `sortType: 'dueDateDesc',`

---

### :jigsaw: `maxTitleLength`

Maximum number of characters to display on the same line in one column

-   **Possible values:** `10` - `50`
-   **Default value:** `25`
-   **Example:** `maxTitleLength: 40,` will show only the first 40 characters of the task content

---

### :jigsaw: `displayTasksWithinDays`

Only display tasks with a due date within set number of days or are past due.

-   **Possible values:** `-1` - `∞`
-   **Default value:** `-1` (display all tasks)
-   **Example:** `0` will only display tasks that are due today or are past due

_Note:_ This will not affect the display of tasks without a due date.

---

### :jigsaw: `displayTasksWithoutDue`

Controls if tasks without a due date are displayed.

-   **Possible values:** `boolean`
-   **Default value:** `true`
-   **Example:** `displayTasksWithoutDue: false,` will display only tasks with due dates

---

### :jigsaw: `displaySubtasks`

Controls if subtasks are displayed or not.

-   **Possible values:** `boolean`
-   **Default value:** `true`
-   **Example:** `displaySubtasks: false,` will not display any subtasks under included tasks

---

### :jigsaw: `hideWhenEmpty`

Hide widget (including header) when no tasks meet criteria for display

-   **Possible values:** `boolean`
-   **Default value:** `false`
-   **Example:** `hideWhenEmpty: true,` will cause the entire module to disappear if no tasks would be displayed

## Example Module Config

The following is an example of a default configuation object that includes all settings.

    config: {
    	accessTokens: [],
    	projects: [],
    	labels: [],
    	filters: ["Priority 4],
    	maximumEntries: 10,
    	sortType: "todoist",
    	displayOrder: ["content", "duedate", "countdown", "priority", "labels", "assignee", "avatar", "project"],
    	displayProjectAs: "both",
    	displayColumnHeadings: "icons",
    	maxTitleLength: 50,
    	displayTasksWithoutDue: true,
    	displayTasksWithinDays: -1,
    	displaySubtasks: true,
    	reloadInterval: 10 * 60 * 1000,
    	fade: true,
    	fadePoint: 0.25,
    	fadeMinimumOpacity: 0.25,
    	priorityColors: {
    		1: "#333333",
    		2: "#246fe0",
    		3: "#eb8909",
    		4: "#d1453b"
    	},
    	debug: true,
    },

## Dependencies

Install all with `npm install` command in module directory.

-   [request](https://www.npmjs.com/package/request)
-   [node-fetch](https://www.npmjs.com/package/node-fetch)

## Attribution

This project is based on work done by Chris Booker in the MMM-Todoist module (https://github.com/cbrooker/MMM-Todoist) Paul-Vincent Roll in the MMM-Wunderlist module. (https://github.com/paviro/MMM-Wunderlist)
