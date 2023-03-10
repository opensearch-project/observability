package org.opensearch.observability.validation.schema.system

private const val ROOT = "../../../schema/system/"

enum class SystemComponent(val resourcePath: String) {
    // TODO figure out how to configure the paths robustly
    APPLICATION(ROOT + "application.schema"),
    DATASOURCE(ROOT + "datasource.schema"),
    INDEX_PATTERN(ROOT + "index-pattern.schema"),
    INTEGRATION(ROOT + "integration.schema"),
    NOTEBOOK(ROOT + "notebook.schema"),
    OPERATIONAL_PANEL(ROOT + "operational-panel.schema"),
    SAVED_QUERY(ROOT + "saved-query.schema"),
    VISUALIZATION(ROOT + "visualization.schema")
}
