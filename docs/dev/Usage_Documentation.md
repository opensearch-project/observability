# Using Kibana Notebooks

## Usage & Interface

![Kibana Notebooks](./images/kibana-notebooks.gif)

### 1. Notebook Functionalities

![Kibana Notebooks](./images/notebook-buttons.png)

- **Create Notebook** - creates a new notebook document
- **Rename Notebook** - renames the current notebook with new name
- **Clone Notebook** - clones the current notebook and gives the name <currentNotebook_copy>
- **Delete Notebook** - deletes the current notebook
- **Import Notebook** - imports a notebook json file
- **Export Notebook** - exports the current notebook as a json file

### 2. Paragraph Functionalities

![Kibana Notebooks](./images/paragraph-buttons.png)
NOTE: Please select a paragraph before using these buttons

- **Run Paragraph** - Runs the selected paragraph and saves it
- **Save Paragraph** - Saves the input of selected paragraph/visualization
- **Clone Paragraph** - Clones the selected paragraph
- **Delete Paragraph** - Deletes the selected paragraph
- **Clear All Paragraph** - Clears the output of the paragraphs
- **Hide Inputs** - Hides the input cells of all the paragraphs
- **Hide Outputs** - Hides the output cells of all the paragraphs

### 3. Miscellaneous

- **Adding a paragraph** - Hover between paragraphs to add a new para/visualization
- **Editing Visualization Timeline** - Edit timeframes in datepicker to add "from" and "to" time range, then refresh the visualization
- **Resize Visualizations** - To resize a visualization, unpin the visualization to enter the edit mode, once resized pin the visualization and save it with save button on top

## Import Example Notebooks

- Import sample notebooks from [example_notebooks folder](https://github.com/opendistro-for-elasticsearch/kibana-notebooks/tree/dev) based on your backend
- A notebook from one backend is incompatible to the other
