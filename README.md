# MMM-Todoist-Multi

This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). It can display Todoist tasks from multiple accounts in a single list and filter them several ways.

## Installation

1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/FutureYamask/MMM-Todoist-Multi.git`. A new folder will appear navigate into it.
2. Execute `npm install` to install the node dependencies.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

```javascript
modules: [
  {
    module: "MMM-Todoist-Multi",
    position: "top_right", // This can be any of the regions. Best results in left or right regions.
    header: "Todoist", // This is optional
    config: {
      // See 'Configuration options' for more information.
      hideWhenEmpty: false,
      accessToken: "accessToken from Todoist",
      maximumEntries: 60,
      updateInterval: 10 * 60 * 1000, // Update every 10 minutes
      fade: false,
      // projects and/or labels is mandatory:
      projects: [166564794],
      labels: ["MagicMirror", "Important"] // Tasks for any projects with these labels will be shown.
    }
  }
];
```

## Configuration options

The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>accessToken</code></td>
			<td>Your Todoist access token, you can get it <a href="https://developer.todoist.com/appconsole.html">here</a>.<br>
				<br><b>Possible values:</b> <code>string</code>
				<br><b>Default value:</b> <code>none</code>
				<br><b>Note:</b> It is possible to use the "Test token" and so not to follow the steps of oAuth token. For the web site value requested, you can use "http://example.com" if you don't have a website. 
			</td>
		</tr>
		<tr>
			<td><code>debug</code></td>
			<td>Add helpful logging and information to the consol.<br>
				<br><b>Possible values:</b> <code>boolean</code>
				<br><b>Default value:</b> <code>false</code>
				<br><b>Example:</b> <code>true</code> will display your project names and IDs in the browser's console as well as useful logging to help with debugging problems.
				<br>This setting does not change the display of tasks.
			</td>
		</tr>
		<!-- <tr>
			<td><code>blacklistProjects</code></td>
			<td>
				When this option is enabled, <code>projects</code> becomes a <i>blacklist.</i>
				Any project that is <b>not</b> in <code>projects</code> will be used.<br>
				<br><b>Possible values:</b> <code>boolean</code>
				<br><b>Default value:</b> <code>false</code>
				<br><b>Example:</b> <code>true</code>
				<br>
				<br>
				NB: If used in combination with <code>labels</code>, tasks that are in a blacklisted
				project but match a label will still be shown!
			</td>
		</tr> -->
		<tr>
			<td><code>projects</code></td>
			<td>
				Array of Projects you want to include in the display. Projects can be included by name or ID. Including a project will include all items in that project regardless of label or filter. <br>
				<br><b>Possible values:</b> <code>array</code>
				<br><b>Default value:</b> <code>[ ]</code>
				<br><b>Example:</b> <code>[166564794, "Project"]</code>
				<br>
				<br>
				<b>Getting the Todoist ProjectID:</b><br>
				1) Go to Todoist (Log in if you aren't)<br>
				2) Click on a Project in the left menu<br>
				3) Your browser URL will change to something like<br> <code>"https://todoist.com/app?lang=en&v=818#project%2F166564897"</code><br><br>
				Everything after %2F is the Project ID. In this case "166564897"<br><br>
				<br>Using debug<br>
				Alternatively, if you add <b>debug=true</b> in your config.js the Projects and ProjectsIDs will be displayed on MagicMirror as well as in the Browser console.<br><br>
				<b>The values for projects, labels, and filters are inclusive--a task needs to match one or more of these values to be displayed.  
			</td>
		</tr>
			<tr>
			<td><code>labels</code></td>
			<td>
				Array of label names you want to include in the display. Including a label will include all items with that label regardless of project or filter.<br>
				<br><b>Possible values:</b> <code>array</code>
				<br><b>Default value:</b> <code>[ ]</code>
				<br><b>Example:</b> <code>["MagicMirror", "Important", "DoInTheMorning"]</code>
				<br>
				<br>
				<b>The values for projects, labels, and filters are inclusive--a task needs to match one or more of these values to be displayed.  
			</td>
		</tr>
		<tr>
			<td><code>filters</code></td>
			<td>
				Array of filer names you want to include in the display. Including a filter will include all items in that filter.<br>
				<br><b>Possible values:</b> <code>array</code>
				<br><b>Default value:</b> <code>[ ]</code>
				<br><b>Example:</b> <code>["Assigned to me"]</code>
				<br>
				<br>
				<b>The values for projects, labels, and filters are inclusive--a task needs to match one or more of these values to be displayed.  
			</td>
		</tr>
		<tr>
			<td><code>displayOrder</code></td>
			<td>Array of columns in the order to display task information.<br>
				<br><b>Possible values:</b> <br>
				<code>content</code> - The text of the task. 
				<code>duedate</code> - The due date of the task. 
				<code>countdown</code> - The number of days until the task is due. 
				<code>priority</code> - The priority of the task. 
				<code>labels</code> - The text of the task. 
				<code>assignee</code> - The user who is responsible for accomplishing the current task (shared projects only). 
				<code>avatar</code> - The 35x35 pixels image of the user's avatar. 
				<code>project</code> - The name of the project holding the task. 
				<br><b>Default value:</b> <code>[
			"content",
			"duedate",
			"countdown",
			"priority",
			"labels",
			"assignee",
			"avatar",
			"project"
		]</code>
		<br><b>Example:</b> <code>["duedate", "content"]</code> will display tasks using two columns. The "duedate" column will be on the left and the "content" column on the right. 
				<br>
				<br>
			</td>
		</tr>
		  <tr>
    		<td><code>priorityColors</code></td>
    		<td>Set custom colors to associate with each priority from lowest to highest.<br>
    			<br><b>Possible values:</b> <code>priority: hexcode</code>
    			<br><b>Default value:</b> <code>{1: "#333333", 2: "#246fe0", 3: "#eb8909", 4: "#d1453b"}</code>
					<br><br>
					<b>All four priorities must be included within the brackets</b>
					<br><br>
					<b>1 is the LOWEST priority and 4 is the HIGHEST or most urgent priority</b>
    		</td>
    	</tr>
			<tr>
    		<td><code>displayProjectAs</code></td>
    		<td>Method to indicate project for each task.<br>
    			<br><b>Possible values:</b><br>
					<code>name</code> - displays the name of the project only
					<code>color</code> - displays the color of the project only
					<code>both</code> - displays the name of the project surrounded by a border in the project color
    			<br><b>Default value:</b> <code>"both"</code>
					<br><br>
					This setting has no effect if the <code>project</code> column is not included in the <code>displayOrder</code> setting.
    		</td>
    	</tr>
			<tr>
    		<td><code>displayColumnHeadings</code></td>
    		<td>Method to indicate the header of each column displayed<br>
    			<br><b>Possible values:</b><br>
					<code>text</code> - displays the name column
					<code>icons</code> - displays an icon representing the information in the column
					<code>none</code> - excludes any headers from displaying
    			<br><b>Default value:</b> <code>"icons"</code>
    		</td>
    	</tr>
    	<tr>
    		<td><code>maximumEntries</code></td>
    		<td>Maximum number of todos to be shown.<br>
    			<br><b>Possible values:</b> <code>int</code>
    			<br><b>Default value:</b> <code>10</code>
    		</td>
    	</tr>
    	<tr>
    		<td><code>interval</code></td>
    		<td>How often the module should load new todos. Be careful, this is in ms, NOT seconds! So, too low a number will lock you out for repeated server attempts!<br>
    			<br><b>Possible values:</b> <code>int</code> in <code>milliseconds</code>
    			<br><b>Default value:</b> <code>10*60*1000</code>
    		</td>
    	</tr>
    	<tr>
    		<td><code>fade</code></td>
    		<td>Fade todos to black. (Gradient)<br>
    			<br><b>Possible values:</b> <code>true</code> or <code>false</code>
    			<br><b>Default value:</b> <code>true</code>
    		</td>
    	</tr>
    	<tr>
    		<td><code>fadePoint</code></td>
    		<td>Where to start fade?<br>
    			<br><b>Possible values:</b> <code>0</code> (top of the list) - <code>1</code> (bottom of list)
    			<br><b>Default value:</b> <code>0.25</code>
    		</td>
    	</tr>
    	<tr>
    		<td><code>fadeMinimumOpacity</code></td>
    		<td>Opacity of the last item if fade is enabled.<br>
    			<br><b>Possible values:</b> <code>0</code> (last item is completely transparent) - <code>1</code> (no fade)
    			<br><b>Default value:</b> <code>0.25</code>
    		</td>
    	</tr>
    	<tr>
    		<td><code>showProject</code></td>
    		<td>If true this will display the Project to the right of the DueDates as it does on Todost.<br>
    			<br><b>Possible values:</b> <code>boolean</code>
    			<br><b>Default value:</b> <code>true</code>
    		</td>
    	</tr>
    	<tr>
    		<td><code>sortType</code></td>
    		<td>This will determine the sorting method used when displaying your Todos.<br>
    			<br><b>Possible values:</b> <br />
    			<code>"todoist"</code> <span>- Sort based on the order in Todoist.</span> </br >
    			<code>"priority"</code> <span>- Sort based on the priority, in Descending order. (Highest priority first)</span> </br >
    			<code>"dueDateAsc"</code> <span>- Sort based on the Due Date of the Todo Ascending. (Oldest date first)</span> </br>
    			<code>"dueDateDesc"</code> <span>- Sort based on the Due Date of the Todo Descending. (Newest date first)</span></br>
    			<code>"dueDateDescPriority"</code> <span>- Sort based on the Due Date of the Todo Descending and by priority high to low.</span></br>
    			<br><b>Default value:</b> <code>"todoist"</code>
    		</td>
    	</tr>
    	<tr>
    		<td><code>displayLastUpdate</code></td>
    		<td>If true this will display the last update time at the end of the task list. See screenshot below<br>
    			<br><b>Possible values:</b> <code>boolean</code>
    			<br><b>Default value:</b> <code>false</code>
    		</td>
    	</tr>
    	<tr>
    		<td><code>displayLastUpdateFormat</code></td>
    		<td>Format to use for the time display if displayLastUpdate:true <br>
    			<br><b>Possible values:</b> See [Moment.js formats](http://momentjs.com/docs/#/parsing/string-format/)
    			<br><b>Default value:</b> <code>'dd - HH:mm:ss'</code>
    		</td>
    	</tr>
    	<tr>
    		<td><code>wrapEvents</code></td>
    		<td>If true this will display the long tasks on several lines, according on the value <code>maxTitleLength</code>. See screenshot below. <br>
    			<br><b>Possible values:</b> <code>boolean</code>
    			<br><b>Default value:</b> <code>false</code>
    		</td>
    	</tr>
    	<tr>
    		<td><code>maxTitleLength</code></td>
    		<td>Value cut the display of long tasks on several lines. See screenshot below<br>
    			<br><b>Possible values:</b> <code>10</code> - <code>50</code>
    			<br><b>Default value:</b> <code>25</code>
    		</td>
    	</tr>
    	<tr>
    		<td><code>displayTasksWithinDays</code></td>
    		<td>If non-negative, only display tasks with a due date within <code>displayTasksWithinDays</code> days. For instance, setting this to 0 will only show tasks due today or overdue. This will not affect tasks without a due date, <code>displayTasksWithoutDue</code> controls those.<br>
    			<br><b>Possible values:</b> <code>-1</code> - <code>∞</code>
    			<br><b>Default value:</b> <code>-1</code> (display all tasks)
    		</td>
    	</tr>
    	<tr>
    		<td><code>displayTasksWithoutDue</code></td>
    		<td>Controls if tasks without a due date are displayed.<br>
    			<br><b>Possible values:</b> <code>boolean</code>
    			<br><b>Default value:</b> <code>true</code>
    		</td>
    	</tr>
    	<tr>
    		<td><code>displaySubtasks</code></td>
    		<td>Controls if subtasks are displayed or not.<br>
    			<br><b>Possible values:</b> <code>boolean</code>
    			<br><b>Default value:</b> <code>true</code>
    		</td>
    	</tr>
    	<!-- <tr>
    		<td><code>displayAvatar</code></td>
    		<td>Display avatar images of collaborators assigned to tasks in shared projects.<br>
    			<br><b>Possible values:</b> <code>boolean</code>
    			<br><b>Default value:</b> <code>false</code>
    		</td>
    	</tr>		 -->
    	<tr>
    		<td><code>hideWhenEmpty</code></td>
    		<td>Hide widget when all lists are empty (including header).<br>
    			<br><b>Possible values:</b> <code>boolean</code>
    			<br><b>Default value:</b> <code>false</code>
    		</td>
    	</tr>
    </tbody>

</table>

## Dependencies

- [request](https://www.npmjs.com/package/request) (installed via `npm install`)

<!-- # Screen shots

A few sample Screen Shots to show you what this module looks like. It's fairly configurable and changes considerably depending on how you use Todoist, how many projects you include, and how you sort.

Option enabled: displayAvatar: true
![My image](https://raw.githubusercontent.com/thyed/MMM-Todoist/master/todoist-avatars.png)

Option enabled: displayLastUpdate: true, wrapEvents: true, maxTitleLenght: 25
![My image](https://github.com/AgP42/MMM-Todoist/blob/master/todoist.png)

Options enabled: orderBy:todoist, showProjects: true
![My image](http://cbrooker.github.io/MMM-Todoist/Screenshots/1.png)

Options enabled: orderBy:dueDateAsc, showProjects: true
![My image](http://cbrooker.github.io/MMM-Todoist/Screenshots/2.png)

Options enabled: orderBy:dueDateAsc, showProjects: false
![My image](http://cbrooker.github.io/MMM-Todoist/Screenshots/3.png)

Options enabled: orderBy:todoist, showProjects: false
![My image](http://cbrooker.github.io/MMM-Todoist/Screenshots/4.png)

Options enabled: orderBy:todoist, showProjects: true
![My image](http://cbrooker.github.io/MMM-Todoist/Screenshots/5.png)

Options enabled: orderBy:dueDateAsc, showProjects: true
![My image](http://cbrooker.github.io/MMM-Todoist/Screenshots/6.png)

Options enabled: orderBy:dueDateAsc, showProjects: false
![My image](http://cbrooker.github.io/MMM-Todoist/Screenshots/7.png) -->

## Attribution

This project is based on work done by Chris Booker in the MMM-Todoist module (https://github.com/cbrooker/MMM-Todoist) Paul-Vincent Roll in the MMM-Wunderlist module. (https://github.com/paviro/MMM-Wunderlist)
