# Observability Cypress Test Cases
The observability plugin currently has 4 modules in it. Each of the modules have their own cypress tests [here](./integration). 

## 1. Event Analytics

### Home

* Query Search
    * Type query in search bar then click ‘refresh’ button on date range picker to search would redirect user to explorer page, and display searching results in that page
    * Click ‘refresh’ button directly without having a query in search bar would redirect user to explorer page with a new empty tab
* Actions - Event Explorer
    * Click ‘Event explorer’ in the dropdown list of actions would redirect user to explorer page
* Actions - Delete
    * Check saved queries and(or) saved visualizations then click delete in dropdown list of actions is expected to delete selected saved objects’
* Actions - Add Samples
    * Click ‘add samples’ in the dropdown list of actions is expected to add 9 sample saved queries and visualizations, the newly added samples is expected to shop up in Queries and Visualizations table

### Explorer

* Add new tabs

    * Click ’add new‘ button is expected to add top level tabs
    * Redirections from clicking history links is expected to 
        * create new tab if there’s already tab with searched data
        * populate the the first empty tab
    * Redirections from clicking ‘new query’ in home page would always create new tab

* Close tabs

    * Close unselected tab should close that tab only, and not change the current selected tab
    * Click ‘add new’ to add new tabs and click on any tab before the last created tab, then close that tab. It is expected to close the current tab properly, and newly selected tab is expected to be one tab before it if there’s any existing tabs or the immediate tab comes after the deleted one
    * It is expected to be not able to close a tab when there’s only one tab left, and user will be prompt with a toast message

* Query Saving

    * Saves a query on event tab of explorer page is expected to create a new saved query. The user should see this new saved query in Queries and Visualizations table.
    * Saves a visualization on visualization tab of explorer page is expected to create a new saved visualization.  The user should see this new saved Visualization Queries and Visualizations table on event home should display this new saved visualization
    * Saves a visualization to existing panels
* Sidebar
    * Search fields
    * Toggle fields between selected and available fields categories
    * Override timestamp
        * Click on a timestamp field to override timestamp is expected to create a new saved, default timestamp for this index
* Count distribution
    * Change time interval
    * Display event counts
* Visualization tab
    * Switch visualizations from dropdown list
* Data Grid
    * Expand/collapse a data entry

## 2. Custom panels

### Home Table

* Check panel name validity
* Create and open a new panel
* Duplicate and rename a panel
* Search an existing panel
* Delete panels

### Create Visualization

* Create two visualizations in events explorer

### Panel View

* Move to test panel
* Duplicate using panel action
* Rename using panel action
* Change date filter 
* Add existing visualizations
* Add ppl filter to the panel
* Drag and Drop Visualization in edit mode 
* Resize a Visualization in edit mode 
* Delete a Visualization in edit mode 
* Duplicate a Visualization
* Replace a Visualization
* Create a new Visualization and directly add to an existing panel
* Edit a Visualization and check the change in panels

### Clean Up

* Add Samples 
* Verify sample visualization names in sample panel
* Delete All Visualization from event analytics
* Delete all Panels 

## 3. Notebooks

* Displays error toast for invalid notebook name
* Creates a notebook and redirects to the notebook
* Duplicates and renames a notebook
* Searches existing notebooks
* Deletes notebooks
* Create in-context PDF report from notebook
* Create in-context PNG report from notebook
* Create on-demand report definition from context menu
* Goes into a notebook and creates paragraphs
* Renders markdown
* Shows output message
* Renders input only mode
* Renders output only mode
* Duplicates paragraphs
* Adds a dashboards visualization paragraph
* Adds an observability visualization paragraph
* Adds a SQL query paragraph
* Adds a PPL query paragraph
* Clears outputs
* Runs all paragraphs
* Adds paragraph to top and bottom
* Moves paragraphs
* Duplicates and renames the notebook
* Deletes paragraphs
* Deletes notebook

## 4. Trace analytics

### Dashboard

* Indexes test data
* Renders empty state
* Renders the dashboard table
* Adds the percentile filters
* Opens latency trend popover
* Redirects to traces table with filter
* Renders service map
* Renders plots

### Service

* Renders empty state
* Renders the services table
* Searches correctly
* Renders service view empty state
* Renders service view
* Renders spans data grid, flyout, filters

### Trace

* Renders empty state
* Renders the traces table
* Searches correctly
* Renders the trace view
* Renders data grid, flyout and filters

