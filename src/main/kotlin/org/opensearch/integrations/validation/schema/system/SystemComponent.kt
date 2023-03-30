package org.opensearch.integrations.validation.schema.system

private const val ROOT = "/schema/system/"

enum class SystemComponent(val resourcePath: String) {
    APPLICATION(ROOT + "application.schema"),
    DATASOURCE(ROOT + "datasource.schema"),
    INDEX_PATTERN(ROOT + "index-pattern.schema"),
    INTEGRATION(ROOT + "integration.schema"),
    NOTEBOOK(ROOT + "notebook.schema"),
    OPERATIONAL_PANEL(ROOT + "operational-panel.schema"),
    SAVED_QUERY(ROOT + "saved-query.schema"),
    VISUALIZATION(ROOT + "visualization.schema")
}
