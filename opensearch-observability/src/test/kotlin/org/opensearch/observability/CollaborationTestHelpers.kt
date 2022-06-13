/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability

fun constructCollaborationRequest(): String {
    return """
        {
          "type": "TEXT",
          "text": {
            "pageId": "5656irbnf4164",
            "paragraphId": "cdcd545jnjkn",
            "lineId": "tbsx4564"
          },
          "tags": ["dev", "latency"],
          "resolved": false
        }
    """.trimIndent()
}
